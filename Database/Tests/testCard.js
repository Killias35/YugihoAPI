import { randomInt } from 'crypto';

export default class TestCards {
    constructor(db) {
        this.db = db;
    }

    // ==== CARTES ====

    async TestAddCard() {
        const cardData = {
            id: "1234567890",
            atk: randomInt(1000, 3000),
            def: randomInt(1000, 3000),
            type: 'Monster', 
            frameType: 'xyz',
            archetype: 'Dragon',
            image_url: 'https://example.com/card.png'
        };

        const result = await this.db.cards.addCard(cardData);
        return result;
    }

    async TestEditCard(id) {
        const updatedData = {
            atk: 2500,
            def: 2000,
            type: 'Monster', 
            frameType: 'effect monster',
            archetype: 'Magicien',
            image_url: 'https://example.com/card-edited.png'
        };

        const result = await this.db.cards.editCard(id, updatedData);
        return result;
    }

    async TestRemoveCard(id) {
        const result = await this.db.cards.removeCard(id);
        return result;
    }

    async TestSearchCards() {
        const criteria = {
            atkMin: 2500,
            defMin: 2000,
            archetype: 'Magicien'
        };

        const result = await this.db.cards.searchCards(criteria);
        return result;
    }

    // ==== EFFETS ====

    async TestAddEffect(card_id) {
        const effectData = {
            card_id,
            effect: "Destroy all opponent's monsters"
        };

        const result = await this.db.cardEffect.addEffect(effectData);
        return result;
    }

    async TestEditEffect(effect_id) {
        const newEffect = "Draw 2 cards";
        const result = await this.db.cardEffect.editEffect(effect_id, newEffect);
        return result;
    }

    async TestRemoveEffect(effect_id) {
        const result = await this.db.cardEffect.removeEffect(effect_id);
        return result;
    }

    // ==== TRANSLATIONS ====

    async TestAddTranslation(card_id) {
        const translationData = {
            card_id,
            language_code: 'en',
            name: 'Blue-Eyes White Dragon',
            type: 'Monster',
            description: 'This legendary dragon is a powerful engine of destruction.',
            level: 8,
            attribute: 'LIGHT',
            race: 'Dragon',
            typeLine: '[Effect, XYZ]'
        };

        const result = await this.db.cardTranslations.addTranslation(translationData);

        return result;
    }

    async TestEditTranslation(translation_id) {
        const updatedData = {
            language_code: 'fr',
            name: 'Dragon Blanc aux Yeux Bleus',
            type: 'Monstre',
            description: 'Ce dragon légendaire est une puissante machine de destruction.',
            level: 8,
            attribute: 'LUMIERE',
            race: 'Dragon'
        };

        const result = await this.db.cardTranslations.editTranslation(translation_id, updatedData);
        return result;
    }

    async TestRemoveTranslation(translation_id) {
        const result = await this.db.cardTranslations.removeTranslation(translation_id);
        return result;
    }


    // ==== TEST GLOBAL ====

    async TestCards() {
        // Ajout de la carte
        const card = await this.TestAddCard();
        console.log("Carte ajoutée :", card);

        // Ajout d’un effet
        const effect = await this.TestAddEffect(card.id);
        console.log("Effet ajouté :", effect);

        // Ajout d'une traduction
        const translation = await this.TestAddTranslation(card.id);
        console.log("Traduction ajoutée :", translation);

        // Edition de la carte
        const updatedCard = await this.TestEditCard(card.id);
        console.log("Carte éditée :", updatedCard);

        // Edition de l'effet
        const updatedEffect = await this.TestEditEffect(effect.id);
        console.log("Effet édité :", updatedEffect);

        // Edition de la traduction
        const updatedTranslation = await this.TestEditTranslation(translation.id);
        console.log("Traduction éditée :", updatedTranslation);

        // Recherche de cartes
        const foundCards = await this.TestSearchCards();
        console.log("Recherche :", foundCards);

        // Suppression de la traduction
        const translationRemoved = await this.TestRemoveTranslation(translation.id);
        console.log("Traduction supprimée :", translationRemoved);

        // Suppression de l'effet
        const effectRemoved = await this.TestRemoveEffect(effect.id);
        console.log("Effet supprimé :", effectRemoved);

        // Suppression de la carte
        const cardRemoved = await this.TestRemoveCard(card.id);
        console.log("Carte supprimée :", cardRemoved);
    }
}
