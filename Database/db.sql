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
    typeLine VARCHAR(100),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (card_id) REFERENCES cards(id)
);
ALTER TABLE card_translations
ADD CONSTRAINT unique_card_language UNIQUE (card_id, language_code);

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
    deck_id INT NOT NULL,
    card_id VARCHAR(100) NOT NULL,
    quantity INT DEFAULT 1,
    zone ENUM('MAIN', 'EXTRA', 'SIDE') DEFAULT 'MAIN',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (deck_id) REFERENCES deck(id) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);

-- Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(100) NOT NULL UNIQUE,
    pseudo VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des statuts des utilisateurs
CREATE TABLE user_state (
    player_id VARCHAR(100) PRIMARY KEY,
    current_menu VARCHAR(50), -- ex: 'main', 'deck', 'duel_room'
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- Ajout d'index pour fludifier la recherche --
CREATE INDEX idx_card_name ON card_translations(name);
CREATE INDEX idx_card_level ON card_translations(level);
CREATE INDEX idx_card_attribute ON card_translations(attribute);
CREATE INDEX idx_card_race ON card_translations(race);
CREATE INDEX idx_card_atk ON cards(atk);
CREATE INDEX idx_card_def ON cards(def);

-- 2) (Re)créez la procédure
DROP PROCEDURE IF EXISTS addCardToDeck;
CREATE PROCEDURE addCardToDeck(
  IN p_deck_id   VARCHAR(100),
  IN p_card_id   VARCHAR(100),
  IN p_quantity  INT,
  IN p_zone      VARCHAR(100)
)
BEGIN
  DECLARE existing_quantity INT DEFAULT 0;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET existing_quantity = 0;

  SELECT quantity
    INTO existing_quantity
  FROM deck_data
  WHERE deck_id = p_deck_id
    AND card_id = p_card_id
    AND zone    = p_zone;

  IF existing_quantity = 0 THEN
    INSERT INTO deck_data (deck_id, card_id, quantity, zone)
    VALUES (p_deck_id, p_card_id, LEAST(GREATEST(p_quantity,1),3), p_zone);
  ELSEIF existing_quantity + p_quantity > 0 THEN
    UPDATE deck_data
      SET quantity = LEAST(existing_quantity + p_quantity, 3)
    WHERE deck_id = p_deck_id
      AND card_id = p_card_id
      AND zone    = p_zone;
  ELSE
    DELETE FROM deck_data
    WHERE deck_id = p_deck_id
      AND card_id = p_card_id
      AND zone    = p_zone;
  END IF;
END;

