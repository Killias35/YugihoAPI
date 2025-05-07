import { randomInt, randomUUID } from 'crypto';

export default class TestDeck {
    constructor(db) {
        this.db = db;
    }

    async TestAddDeck() {
        const deckData = {
            nom_deck: 'Deck Yugi ' + randomInt(1000),
            private: false,
            main_size: 40,
            extra_size: 15,
            side_size: 15,
            created_by: "Yugi"
        };

        const result = await this.db.deck.addDeck(deckData);
        return result;
    }

    async TestEditDeck(id, deckData) {
        deckData.nom_deck = 'Deck Kaiba';
        deckData.main_size = 41;

        const result = await this.db.deck.editDeck(id, deckData);
        return result;
    }

    async TestRemoveDeck(id) {
        const result = await this.db.deck.removeDeck(id);
        return result;
    }

    async TestGetDeck(id) {
        const result = await this.db.deck.getDeck(id);
        return result;
    }

    async TestAddCardToDeck(deck_id, card_id) {
        const cardData = {
            deck_id,
            card_id,
            quantity: 2,
            zone: "main"
        };

        const result = await this.db.deckData.addCardsToDeck(cardData);
        return result;
    }

    async TestEditCardInDeck(deck_id) {
        const newData = {
            quantity: 3,
            zone: "side"
        };

        const result = await this.db.deckData.editCardInDeck(deck_id, newData);
        return result;
    }

    async TestRemoveCardFromDeck(deck_id) {
        const result = await this.db.deckData.removeCardFromDeck(deck_id);
        return result;
    }

    async TestGetDeckData(id) {
        const result = await this.db.deckData.getDeckData(id);
        return result;
    }


    async TestDecks() {
        console.log("\n===== DÉBUT TEST DECK =====\n");
    
        try {
            const addedDeck = await this.TestAddDeck();
            console.log("✅ Deck ajouté :", addedDeck);
    
            const editedDeck = await this.TestEditDeck(addedDeck.id, addedDeck);
            console.log("✏️ Deck modifié :", editedDeck);
    
            const fetchedDeck = await this.TestGetDeck(addedDeck.id);
            console.log("🔍 Deck récupéré :", fetchedDeck);
    
            // Vérifie s'il existe une carte, sinon en crée une
            let card;
            let cardCreatedForTest = false;
    
                card = await this.db.cards.addCard({
                    id: "1234567890",
                    atk: randomInt(1000, 3000),
                    def: randomInt(1000, 3000),
                    archetype: 'Dragon',
                    frameType: "effect"
                });
                cardCreatedForTest = true;
    
            const addedDeckCard = await this.TestAddCardToDeck(addedDeck.id, card.id);
            console.log("🃏 Carte ajoutée au deck :", addedDeckCard);
    
            const editedDeckCard = await this.TestEditCardInDeck(addedDeckCard.id);
            console.log("✏️ Carte dans deck modifiée :", editedDeckCard);
    
            const deckContents = await this.TestGetDeckData(addedDeck.id);
            console.log("📦 Contenu du deck :", deckContents);
    
            const removedDeckCard = await this.TestRemoveCardFromDeck(addedDeckCard.id);
            console.log("🗑️ Carte retirée du deck :", removedDeckCard ? "✔️ Succès" : "❌ Échec");
    
            const removedDeck = await this.TestRemoveDeck(addedDeck.id);
            console.log("🗑️ Deck supprimé :", removedDeck ? "✔️ Succès" : "❌ Échec");
    
            if (cardCreatedForTest) {
                console.log("🧹 Nettoyage de la carte temporaire...");
                await this.db.cards.removeCard(card.id);
            }
    
        } catch (err) {
            console.error("❌ Erreur lors des tests de deck :", err);
        }
    
        console.log("\n===== FIN TEST DECK =====\n");
    }
    
}
