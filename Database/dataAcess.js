import mysql from 'mysql2';
import fs from 'fs';
import Profile from './Tables/profile.js';
import CardTranslations from './Tables/cardTranslations.js';
import CardEffect from './Tables/cardEffect.js';
import Deck from './Tables/deck.js';
import DeckData from './Tables/deckData.js';
import Cards from './Tables/cards.js';
import { fileURLToPath } from 'url';
import path from 'path';


export default class Database {
    constructor() {
        // Charger la configuration depuis le fichier .json

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        const filePath = path.join(__dirname, '.conf.json');
        const config = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        this.connection = mysql.createConnection(config);

        this.profile = new Profile(this.connection);
        this.cardTranslations = new CardTranslations(this.connection);
        this.cardEffect = new CardEffect(this.connection);
        this.deck = new Deck(this.connection);
        this.deckData = new DeckData(this.connection);
        this.cards = new Cards(this.connection);
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
        }
    }

    // Fermer la connexion
    close() {
        this.connection.end();
    }
}
