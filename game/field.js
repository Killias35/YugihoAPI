export default class Field {
    constructor(playerId1, playerId2, deckCapacity=60, extraDeckCapacity=15, fieldLength=5) {
        this.playerId1 = playerId1;
        this.playerId2 = playerId2;
        this.deckCapacity = deckCapacity;
        this.extraDeckCapacity = extraDeckCapacity;
        this.fieldLength = fieldLength;

        /*
        this.fieldSpellField = {};  // Zone magie terrain
        this.monsterField = {}; // Zone monstre
        this.discardField = {}; // Zone défausse
        this.banishField = {};  // Zone de bannissement
        this.extraDeckField = {}; // Zone d'extra deck
        this.spellField = {};   // Zone magie & piège
        this.deckField = {};    // Zone de deck
        this.handField = {};    // Zone de main
        this.linkField = [];   // Zone de lien
        */
        // Initialisation des zones avec un tableau vide pour chaque zone

        [this.playerId1, this.playerId2].forEach(id => {
            this.initZone('fieldSpellField', id, true, 1);
            this.initZone('monsterField', id, true, this.fieldLength);
            this.initZone('discardField', id, false, 0);
            this.initZone('banishField', id, false, 0);
            this.initZone('extraDeckField', id, false, this.extraDeckCapacity);
            this.initZone('spellField', id, true, this.fieldLength);
            this.initZone('deckField', id, false, this.deckCapacity);
            this.initZone('handField', id, false, 0);
            this.initZone('linkField', id, true, 2);
        });
    }

    // Méthode pour initialiser une zone avec un tableau vide
    initZone(zoneName, playerId, sizeLimited, capacity) {
        var identifier = '/'+playerId;
        if (zoneName === 'linkField') {
            identifier = '';
        }
        this[zoneName+identifier] = {
            cards: [], // Liste des cartes dans la zone
            maxCapacity: capacity, // Optionnel, capacité maximale de la zone (ex: nombre maximum de cartes par zone)
            sizeLimited: sizeLimited,
            addCard(card) {
                if (this.cards.length < this.maxCapacity || sizeLimited !== true) {
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
    }

    // Initialisation du terrain avec les cartes de deux decks
    SetUpField(deck1, id1, deck2, id2) {
        this['deckField/'+id1].cards = deck1.cardListe;
        this['deckField/'+id2].cards = deck2.cardListe;

        this['extraDeckField/'+id1].cards = deck1.extraCardListe;
        this['extraDeckField/'+id2].cards = deck2.extraCardListe;
    }

    GetZone(zoneName, playerId) {
        var identifier = '/'+playerId;
        if (zoneName === 'linkField') {
            identifier = '';
        }
        return this[zoneName+identifier].cards;
    }

    // Déplacer une carte d'une zone à une autre
    MoveCard(playerId, card, fromZone, toZone) {
        // Retirer la carte de la zone source
        this[fromZone+"/"+playerId].removeCard(card.id);

        // Ajouter la carte à la zone de destination
        this[toZone+"/"+playerId].addCard(card);
    }

    // Afficher une zone pour déboguer
    PrintZone(zoneName, id) {
        console.log(`${zoneName}:`, this[zoneName+"/"+id].getCards());
    }
}

