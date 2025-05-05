export default class CardEffect {
    constructor(connection) {
        this.connection = connection;
    }

    addEffect(data) {
        const { card_id, effect } = data;
        return new Promise((resolve, reject) => {
            this.connection.query(
                'INSERT IGNORE INTO card_effect (card_id, effect) VALUES (?, ?)',
                [card_id, effect],
                (err, result) => {
                    if (err) return reject(err);
                    resolve({ id: result.insertId, ...data });
                }
            );
        });
    }

    editEffect(id, effect) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                'UPDATE card_effect SET effect = ? WHERE id = ?',
                [effect, id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0 ? { id, effect } : null);
                }
            );
        });
    }

    removeEffect(id) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                'DELETE FROM card_effect WHERE id = ?',
                [id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0);
                }
            );
        });
    }
}
