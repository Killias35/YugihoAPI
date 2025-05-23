export default class UserState {
    constructor(connection){
        this.connection = connection;
    }

    addUserState(playerId, state){
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT IGNORE INTO user_state (player_id, current_menu) VALUES (?, ?)',
                [playerId, state],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.insertId);
                }
            );
        });
    }

    getUserState(playerId){
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM user_state WHERE player_id = ?',
                [playerId],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0] || null);
                }
            );
        });
    }

    removeUserState(playerId){
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'DELETE FROM user_state WHERE player_id = ?',
                [playerId],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0);
                }
            );
        });
    }

    editUserState(playerId, state){
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE user_state SET current_menu = ? WHERE player_id = ?',
                [state, playerId],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0 ? { playerId, state } : null);
                }
            );
        });
    }

    getExpectedInputs(playerId){
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT expected_inputs FROM user_state WHERE player_id = ?',
                [playerId],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(safeJsonParse(results[0].expected_inputs) || []);
                }
            );
        });
    }

    setExpectedInputs(playerId, expectedInputs){
        if (!expectedInputs || expectedInputs === null) expectedInputs = [];
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE user_state SET expected_inputs = ? WHERE player_id = ?',
                [JSON.stringify({expectedInputs:expectedInputs}), playerId],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0 ? { playerId, expectedInputs } : null);
                }
            );
        });
    }
}

function safeJsonParse(str) {
    try {
        if (str === undefined) return [];
        const parsed = JSON.parse(str);
        if(parsed === null) return [];
        console.log('Parsed JSON string: ', parsed);
        return parsed.expectedInputs; // Retourne toujours une liste
    } catch (e) {
        console.log('Error parsing JSON string: ', str, e);
        return {message: "erreur de parsing depuis la db"}; // Si parsing échoue, retourne une liste vide
    }
}
