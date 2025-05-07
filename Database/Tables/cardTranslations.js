export default class CardTranslations {
    constructor(connection) {
        this.connection = connection;
    }

    addTranslation(data) {
        const { card_id, language_code, name, type, description, level, attribute, race, typeLine} = data;
        return new Promise((resolve, reject) => {
            this.connection.query(
                `INSERT IGNORE INTO card_translations 
                (card_id, language_code, name, type, description, level, attribute, race, typeLine)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [card_id, language_code, name, type, description, level, attribute, race, typeLine],
                (err, result) => {
                    if (err) return reject(err);
                    resolve({ id: result.insertId, ...data });
                }
            );
        });
    }

    editTranslation(id, data) {
        const { language_code, name, type, description, level, attribute, race, typeLine} = data;
        return new Promise((resolve, reject) => {
            this.connection.query(
                `UPDATE card_translations 
                 SET language_code = ?, name = ?, type = ?, description = ?, level = ?, attribute = ?, race = ?, typeLine = ?
                 WHERE id LIKE ?`,
                [language_code, name, type, description, level, attribute, race, typeLine, id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0 ? { id, ...data } : null);
                }
            );
        });
    }

    removeTranslation(id) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                'DELETE FROM card_translations WHERE id = ?',
                [id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0);
                }
            );
        });
    }
}
