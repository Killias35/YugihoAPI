import * as crypto from 'crypto';

export default class Profile {
    selectedDeck = null;
    deckList = []; // attention, pas besoin de chargé tout les deck de la liste a tout moment, voir pour recuperer le deck selectionné depuis la base
    constructor(name) {
        this.name = name;
        this.id = crypto.randomUUID();
    }

    SetDeckList(deckList) {
        this.deckList = deckList;
    }

    RegisterDeck(deck) {
        this.deckList.push(deck);
    }

    SelectDeck(index) {
        this.selectedDeck = this.deckList[index];
    }
}