import Database from '../dataAcess.js';
import { randomInt } from 'crypto';
import { StructureDeckBlueEyesWhiteDragon } from './structureDeck.js'

export default class decksSeeders {
  constructor(language_code = 'en') {
      this.language_code = language_code.toLowerCase();
      this.db = new Database();
  }
  

  async insertAllDecks() {
    const [deckData, deckContent] = await StructureDeckBlueEyesWhiteDragon();
    const deck = await this.db.deck.addDeck(deckData);
    console.log(deck);
    this.db.deckData.addDeckDataWithCards(deck, deckContent);
    this.db.close();
  }
}