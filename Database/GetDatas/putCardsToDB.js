import fs from 'fs';
import Database from '../dataAcess.js';

function getCardsListJSON(name){
  const raw = fs.readFileSync("data/" + name, 'utf8');
  return JSON.parse(raw);
}

function decodeCardJSON(card, language_code = 'en') {
    const cardData = {
      id: card.id.toString(),
      atk: card.atk || null,
      def: card.def || null,
      type: card.type || null,
      frameType: card.frameType || null,
      archetype: card.archetype || null,
      image_url: card.card_images?.[0]?.image_url || null,

      card_id: card.id.toString(),
      language_code: language_code,
      name: card.name || null,
      description: card.desc || null,
      level: card.level || null,
      attribute: card.attribute || null,
      race: card.race || null,
      typeLine: card.type || null, // peut être affiné

      effect: card.desc || null
    };

  
    return cardData;
  }
  
  // ✅ Fonction pour retourner la 1ère carte du tableau JSON
  function getCard(jsonArray, i=0) {
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
      throw new Error("L'array JSON est vide ou invalide.");
    }
    return jsonArray[i];
  }
  
  async function insertCard(db, card) {

    db.cards.addCard(card);
    db.cardTranslations.addTranslation(card);
    
    console.log(`✅ Carte ${card.name} insérée.`);
}

function insertAllCards(language_code) {
  const cards = getCardsListJSON('cards' + language_code + '.json');
  const db = new Database();


  for (let i = 0; i < cards.length; i++) {
    const jsonCard = decodeCardJSON(getCard(cards, i), language_code.toLowerCase());
    insertCard(db, jsonCard);
  }
  
  db.close();
}

insertAllCards("EN");

