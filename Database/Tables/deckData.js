export default class DeckData {
    constructor(connection) {
        this.connection = connection;
    }

    addDeckDataWithCards(deck, cardList) {
        cardList.forEach(card => {
            const data = { deck_id: deck.id, card_id: card.id, quantity: card.quantity, zone: card.zone };
            this.addCardsToDeck(data);
        });
    }

    addCardsToDeck(data, qtt = 1) {
        const { deck_id, card_id, quantity, zone } = data;
        qtt = quantity || qtt;
        return new Promise((resolve, reject) => {
            this.connection.query('CALL addCardToDeck(?, ?, ?, ?)', [deck_id, card_id, qtt, zone], 
                (err, result) => {
                    if (err) return reject(err);
                    resolve({ id: result.insertId, ...data });
                }
            );
        });
    }

    editCardInDeck(id, data) {
        const { quantity, zone } = data;
        return new Promise((resolve, reject) => {
            this.connection.query(
                `UPDATE deck_data 
                SET quantity = ?, zone = ?
                WHERE id = ?`,
                [quantity, zone, id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0 ? { id, ...data } : null);
                }
            );
        });
    }

    removeCardFromDeck(id) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                'DELETE FROM deck_data WHERE id = ?',
                [id],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0);
                }
            );
        });
    }

    getDeckData(deck_id) {
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM deck_data WHERE deck_id = ?',
                [deck_id],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                }
            );
        });
    }
    
}
