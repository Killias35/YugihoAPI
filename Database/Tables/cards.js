export default class Cards {
    constructor(connection) {
        this.connection = connection;
    }

    addCard(data) {
        const {id, atk, def, archetype, image_url } = data;
        return new Promise((resolve, reject) => {
            this.connection.query(
                'INSERT INTO cards (id, atk, def, archetype, image_url) VALUES (?, ?, ?, ?, ?)',
                [id, atk, def, archetype, image_url],
                (err, result) => {
                    if (err) return reject(err);
                    resolve({ id: result.insertId, ...data });
                }
            );
        });
    }

    editCard(id, data) {
        const { atk, def, archetype, image_url } = data;
        return new Promise((resolve, reject) => {
            this.connection.query(
                'UPDATE cards SET atk = ?, def = ?, archetype = ?, image_url = ? WHERE id = ?',
                [atk, def, archetype, image_url, id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0 ? { id, ...data } : null);
                }
            );
        });
    }

    removeCard(id) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                'DELETE FROM cards WHERE id = ?',
                [id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0);
                }
            );
        });
    }

    searchCards(criteria) {
        // citeria : JSON { name, type, description, level, attribute, race, atkMin, atkMax, defMin, defMax, archetype }
        const connection = this.connection;
        const conditions = [];
        const values = [];
    
        if (criteria.name) {
            conditions.push("t.name LIKE ?");
            values.push(`%${criteria.name}%`);
        }
    
        if (criteria.type) {
            conditions.push("t.type = ?");
            values.push(criteria.type);
        }
    
        if (criteria.description) {
            conditions.push("t.description LIKE ?");
            values.push(`%${criteria.description}%`);
        }
    
        if (criteria.level) {
            conditions.push("t.level = ?");
            values.push(criteria.level);
        }
    
        if (criteria.attribute) {
            conditions.push("t.attribute = ?");
            values.push(criteria.attribute);
        }
    
        if (criteria.race) {
            conditions.push("t.race = ?");
            values.push(criteria.race);
        }
    
        if (criteria.atkMin !== undefined) {
            conditions.push("c.atk >= ?");
            values.push(criteria.atkMin);
        }
    
        if (criteria.atkMax !== undefined) {
            conditions.push("c.atk <= ?");
            values.push(criteria.atkMax);
        }
    
        if (criteria.defMin !== undefined) {
            conditions.push("c.def >= ?");
            values.push(criteria.defMin);
        }
    
        if (criteria.defMax !== undefined) {
            conditions.push("c.def <= ?");
            values.push(criteria.defMax);
        }
    
        if (criteria.archetype) {
            conditions.push("c.archetype = ?");
            values.push(criteria.archetype);
        }
    
        const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    
        const sql = `
            SELECT c.*, t.language_code, t.name, t.type, t.description, t.level, t.attribute, t.race, e.effect
            FROM cards c
            LEFT JOIN card_translations t ON c.id = t.card_id
            LEFT JOIN card_effect e ON c.id = e.card_id
            ${whereClause}
        `;
    
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
    
}
