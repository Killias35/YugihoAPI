import * as crypto from 'crypto';

export default class Profile {
    selectedDeck = null;
    deckList = [];
    constructor(name) {
        this.name = name;
        this.id = crypto.randomUUID();
    }

    RegisterDeck(deck) {
        this.deckList.push(deck);
    }

    SelectDeck(index) {
        this.selectedDeck = this.deckList[index];
    }
}