import mysql from 'mysql2';
import fs from 'fs';

export default class Database {
    constructor() {
        // Charger la configuration depuis le fichier .json
        const config = JSON.parse(fs.readFileSync('.conf.json', 'utf8'));
        this.connection = mysql.createConnection(config);
    }

    // Fonction pour ajouter un profil
    addProfile(profileData) {
        const { uuid, pseudo, password } = profileData;

        try{
            return new Promise((resolve, reject) => {
                this.connection.query(
                    'INSERT INTO profile (uuid, pseudo, password) VALUES (?, ?, ?)',
                    [uuid, pseudo, password],
                    (err, result) => {
                        if (err) return reject(err);
                        
                        resolve('Profil ajouté avec succès !');
                    }
                );
            });
        }
        catch(err){
            return "Une erreur s'est produite lors de l'ajout du profil";
        }
    }


    async resetDB() {
        const connection = this.connection;
        const sqlFilePath = './db.sql';

        try {
            const sql = await fs.readFile(sqlFilePath, 'utf8');
            await connection.query(sql);
            return '✅ Base de données réinitialisée depuis le fichier SQL.';
        } catch (err) {
            return '❌ Erreur lors de la réinitialisation : ' + err.message;
        } finally {
            await connection.end();
        }
    }

    // Fermer la connexion
    close() {
        this.connection.end();
    }
}
