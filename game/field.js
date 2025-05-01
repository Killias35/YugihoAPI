export default class Field {
    constructor(playerId1, playerId2, deckCapacity=60, extraDeckCapacity=15, fieldLength=5) {
        this.playerId1 = playerId1;
        this.playerId2 = playerId2;
        this.deckCapacity = deckCapacity;
        this.extraDeckCapacity = extraDeckCapacity;
        this.fieldLength = fieldLength;
        this.linkSpace = [];   // Zone de lien

        /*
        this.fieldSpellField = {};  // Zone magie terrain
        this.monsterField = {}; // Zone monstre
        this.discardField = {}; // Zone défausse
        this.banishField = {};  // Zone de bannissement
        this.extraDeckField = {}; // Zone d'extra deck
        this.spellField = {};   // Zone magie & piège
        this.deckField = {};    // Zone de deck
        this.handField = {};    // Zone de main
        */
        // Initialisation des zones avec un tableau vide pour chaque zone

        [this.playerId1, this.playerId2].forEach(id => {
            this.initZone('fieldSpellField', id);
            this.initZone('monsterField', id);
            this.initZone('discardField', id);
            this.initZone('banishField', id);
            this.initZone('extraDeckField', id);
            this.initZone('spellField', id);
            this.initZone('deckField', id);
            this.initZone('handField', id);
        });
    }

    // Méthode pour initialiser une zone avec un tableau vide
    initZone(zoneName, playerId) {
        this[zoneName+"/"+playerId] = {
            cards: [], // Liste des cartes dans la zone
            maxCapacity: this.fieldLength, // Optionnel, capacité maximale de la zone (ex: nombre maximum de cartes par zone)
            addCard(card) {
                if (this.cards.length < this.maxCapacity) {
                    this.cards.push(card);
                    // console.log(`Carte ${card.name} ajoutée à la zone ${zoneName}`);
                } else {
                    console.error(`Zone ${zoneName} pleine`);
                }
            },
            removeCard(cardId) {
                const index = this.cards.findIndex(c => c.id === cardId);
                if (index !== -1) {
                    this.cards.splice(index, 1);
                    // console.log(`Carte supprimée de la zone ${zoneName}`);
                } else {
                    console.error('Carte non trouvée dans la zone');
                }
            },
            getCards() {
                return this.cards;
            }
        };

        if (zoneName === 'deckField') {
            this[zoneName+"/"+playerId].maxCapacity = this.deckCapacity;
        }
        else if (zoneName === 'extraDeckField') {
            this[zoneName+"/"+playerId].maxCapacity = this.extraDeckCapacity;
        }
    }

    // Initialisation du terrain avec les cartes de deux decks
    SetUpField(deck1, id1, deck2, id2) {
        this['deckField/'+id1].cards = deck1.cardListe;
        this['deckField/'+id2].cards = deck2.cardListe;
    }

    // Déplacer une carte d'une zone à une autre
    moveCard(playerId, card, fromZone, toZone) {
        // Retirer la carte de la zone source
        this[fromZone+"/"+playerId].removeCard(card.id);

        // Ajouter la carte à la zone de destination
        this[toZone+"/"+playerId].addCard(card);
    }

    // Afficher une zone pour déboguer
    printZone(zoneName) {
        console.log(`${zoneName}:`, this[zoneName].getCards());
    }
}

