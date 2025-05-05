import mysql from 'mysql2';
import fs from 'fs';
import Profil from './Tables/profile.js';

export default class Database {
    constructor() {
        // Charger la configuration depuis le fichier .json
        const config = JSON.parse(fs.readFileSync('.conf.json', 'utf8'));
        this.connection = mysql.createConnection(config);

        this.profile = new Profil(this.connection);
    }

    


    async resetDB() {
        const connection = this.connection;
        const sqlFilePath = 'db.sql';
    
        try {
            const data = fs.readFileSync(sqlFilePath, 'utf8');
            connection.query('DROP DATABASE IF EXISTS ' + connection.config.database + ';');
            connection.query('CREATE DATABASE ' + connection.config.database + ';');
            connection.query('USE ' + connection.config.database + ';');
            connection.query(data);
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
