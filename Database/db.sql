-- Création de la base de données
CREATE DATABASE IF NOT EXISTS YuGiHoAPI;
USE YuGiHoAPI;

-- Table des cartes
CREATE TABLE IF NOT EXISTS cards (
    id VARCHAR(100) PRIMARY KEY,
    atk INT,
    def INT,
    type VARCHAR(100),
    frameType VARCHAR(100),
    archetype VARCHAR(100),
    image_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des traductions
CREATE TABLE card_translations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_id VARCHAR(100) NOT NULL,
    language_code VARCHAR(10),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    description TEXT,
    level INT,
    attribute VARCHAR(50),
    race VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (card_id) REFERENCES cards(id)
);

-- Table des effets des cartes
CREATE TABLE IF NOT EXISTS card_effect (
    id INT AUTO_INCREMENT PRIMARY KEY,
    card_id VARCHAR(100) NOT NULL,
    effect TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (card_id) REFERENCES cards(id)
);

-- Table des decks
CREATE TABLE IF NOT EXISTS deck (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deck_id VARCHAR(100) NOT NULL UNIQUE,
    nom_deck VARCHAR(255),
    private BOOLEAN DEFAULT FALSE,
    main_size INT DEFAULT 0,
    extra_size INT DEFAULT 0,
    side_size INT DEFAULT 0,

    created_by VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table de liaison entre deck et cartes (renommée en deck_data)
CREATE TABLE IF NOT EXISTS deck_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deck_id VARCHAR(100) NOT NULL,
    card_id VARCHAR(100) NOT NULL,
    quantity INT DEFAULT 1,
    zone ENUM('MAIN', 'EXTRA', 'SIDE') DEFAULT 'MAIN',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (deck_id) REFERENCES deck(deck_id) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);

-- Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(100) NOT NULL UNIQUE,
    pseudo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Ajout d'index pour fludifier la recherche --
CREATE INDEX idx_card_name ON card_translations(name);
CREATE INDEX idx_card_level ON card_translations(level);
CREATE INDEX idx_card_attribute ON card_translations(attribute);
CREATE INDEX idx_card_race ON card_translations(race);
CREATE INDEX idx_card_atk ON cards(atk);
CREATE INDEX idx_card_def ON cards(def);
