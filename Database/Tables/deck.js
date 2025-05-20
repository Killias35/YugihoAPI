export default class Deck {
    constructor(connection) {
        this.connection = connection;
    }

    async addDeck(data) {
        const {nom_deck, private: isPrivate, main_size, extra_size, side_size, created_by } = data;
        return new Promise((resolve, reject) => {
            this.connection.query(
                `INSERT IGNORE INTO deck 
                (nom_deck, private, main_size, extra_size, side_size, created_by)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [nom_deck, isPrivate, main_size, extra_size, side_size, created_by],
                (err, result) => {
                    if (err) return reject(err);
                    resolve({ id: result.insertId, ...data });
                }
            );
        });
    }

    editDeck(id, data) {
        const { nom_deck, private: isPrivate, main_size, extra_size, side_size } = data;
        return new Promise((resolve, reject) => {
            this.connection.query(
                `UPDATE deck 
                SET nom_deck = ?, private = ?, main_size = ?, extra_size = ?, side_size = ?
                WHERE id = ?`,
                [nom_deck, isPrivate, main_size, extra_size, side_size, id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0 ? { id, ...data } : null);
                }
            );
        });
    }

    removeDeck(id) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                'DELETE FROM deck WHERE id = ?',
                [id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0);
                }
            );
        });
    }

    getDeck(id) {
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM deck WHERE id = ?',
                [id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0] || null);
                }
            );
        });
    }
    
    getDeckOfPlayer(playerId) {
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM deck WHERE created_by = ?',
                [playerId],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }
}
