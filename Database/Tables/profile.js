import crypto from 'crypto';

export default class Profile{
    constructor(connection){
        this.connection = connection;
    }


    addProfile(profileData) {
        const { pseudo, password } = profileData;
        const uuid = crypto.randomUUID();
        return new Promise((resolve, reject) => {
            this.connection.query(
                'INSERT IGNORE INTO profile (uuid, pseudo, password) VALUES (?, ?, ?)',
                [uuid, pseudo, password],
                (err, result) => {
                    if (err) return reject(err);
                    resolve({ id: result.insertId, ...profileData });
                }
            );
        });
    }

    editProfile(profileData) {
        const connection = this.connection;
        const { uuid, pseudo, password } = profileData;
        return new Promise((resolve, reject) => {
            connection.query(
                'UPDATE profile SET pseudo = ?, password = ? WHERE uuid = ?',
                [pseudo, password, uuid],
                (err, result) => {
                    if (err) return reject(err);
                    resolve(result.affectedRows > 0 ? { uuid, ...profileData } : null);
                }
            );
        });
            
        
    }

    removeProfile(uuid) {
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'DELETE FROM profile WHERE uuid = ?',
                [uuid],
                (err, result) => {
                    if (err) return reject(err);
                        resolve(result.affectedRows > 0);
                }
            );
        });
    }
    
    getProfileByUUID(uuid) {
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM profile WHERE uuid = ?',
                [uuid],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0] || null);
                }
            );
        });
    }

    getProfile(pseudo, password) {
        const connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM profile WHERE pseudo = ? AND password = ?',
                [pseudo, password],
                (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0] || null);
                }
            );
        });
    }
}