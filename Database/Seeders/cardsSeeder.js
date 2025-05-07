import fs from 'fs';
import Database from '../dataAcess.js';

export default class CardsSeeder {
  constructor(language_code = 'en') {
    this.language_code = language_code.toLowerCase();
    this.db = new Database();
  }

  getCardsListJSON(fileName) {
    const raw = fs.readFileSync(`./GetDatas/data/${fileName}`, 'utf8');
    return JSON.parse(raw);
  }

  decodeCardJSON(card) {
    return {
      id: card.id.toString(),
      atk: card.atk || null,
      def: card.def || null,
      type: card.type || null,
      frameType: card.frameType || null,
      archetype: card.archetype || null,
      image_url: card.card_images?.[0]?.image_url || null,

      card_id: card.id.toString(),
      language_code: this.language_code,
      name: card.name || null,
      description: card.desc || null,
      level: card.level || null,
      attribute: card.attribute || null,
      race: card.race || null,
      typeLine: card.type || null,

      effect: card.desc || null
    };
  }

  getCard(jsonArray, i = 0) {
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
      throw new Error("L'array JSON est vide ou invalide.");
    }
    return jsonArray[i];
  }

  async insertCard(card) {
    this.db.cards.addCard(card);
    this.db.cardTranslations.addTranslation(card);
  }

  async insertAllCards() {
    const cards = this.getCardsListJSON(`cards${this.language_code.toUpperCase()}.json`);
    for (let i = 0; i < cards.length; i++) {
      const jsonCard = this.decodeCardJSON(this.getCard(cards, i));
      await this.insertCard(jsonCard);
    }
    console.log('✅ ' + cards.length + ' cartes ont été ajoutées.');
    this.db.close();
  }
} 