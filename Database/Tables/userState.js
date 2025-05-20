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
                    resolve(results[0] || []);
                }
            );
        });
    }

    setExpectedInputs(playerId, expectedInputs){
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE user_state SET expected_inputs = ? WHERE player_id = ?',
                [expectedInputs, playerId],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0 ? { playerId, expectedInputs } : null);
                }
            );
        });
    }
}