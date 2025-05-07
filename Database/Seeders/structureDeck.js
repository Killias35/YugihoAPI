import Database from "../dataAcess.js";

export async function StructureDeckBlueEyesWhiteDragon(){
    // Structure Deck : La Saga du Dragon Blanc aux Yeux Bleus (SDBE-FR)
    // 40 cartes
    // 0 cartes EXTRA
    // 0 carte side deck
    const db = new Database();

    const deckData = {
        nom_deck: 'Structure Deck: Blue-Eyes White Dragon',
        private: false,
        main_size: 40,
        extra_size: 1,
        side_size: 0,
        created_by: "Kaiba"
    };  
    const sagaDragonBlanc = [
      { nom: "Dragon Blanc aux Yeux Bleus", quantite: 1, zone: "MAIN" },
      { nom: "Dragolapin", quantite: 1, zone: "MAIN" },
      { nom: "Dragon Alexandrite", quantite: 1, zone: "MAIN" },
      { nom: "Dragon Étincelant", quantite: 1, zone: "MAIN" },
      { nom: "Sentinelle de la Cloche de Feu", quantite: 1, zone: "MAIN" },
      { nom: "Demoiselle aux Yeux Couleur Bleu", quantite: 1, zone: "MAIN" },
      { nom: "Chevaucheur des Vents de Tempête", quantite: 1, zone: "MAIN" },
      { nom: "Dragon Orage Ténébreux", quantite: 1, zone: "MAIN" },
      { nom: "Planeur du Kaiser", quantite: 1, zone: "MAIN" },
      { nom: "Dragon Hiératique de Tefnuit", quantite: 1, zone: "MAIN" },
      { nom: "Dragon Mirage", quantite: 1, zone: "MAIN" },
      { nom: "Dragon Divin Apocralyphe", quantite: 1, zone: "MAIN" },
      { nom: "Pierre Blanche Légendaire", quantite: 1, zone: "MAIN" },
      { nom: "Kaibaman", quantite: 1, zone: "MAIN" },
      { nom: "Prophète de la Création", quantite: 1, zone: "MAIN" },
      { nom: "Kaiser Hippocampe", quantite: 1, zone: "MAIN" },
      { nom: "Ange de Loyauté", quantite: 1, zone: "MAIN" },
      { nom: "Ange Lumineux", quantite: 1, zone: "MAIN" },
      { nom: "Sanctuaire du Dragon", quantite: 1, zone: "MAIN" },
      { nom: "Hurlement d'Argent", quantite: 1, zone: "MAIN" },
      { nom: "Flot Rugissant de Destruction", quantite: 1, zone: "MAIN" },
      { nom: "Écrasement Destructeur", quantite: 1, zone: "MAIN" },
      { nom: "Le Battement d'Aile du Dragon Géant", quantite: 1, zone: "MAIN" },
      { nom: "Transaction", quantite: 1, zone: "MAIN" },
      { nom: "Cartes de l'Harmonie", quantite: 1, zone: "MAIN" },
      { nom: "Cadeau de l'Éléphant Blanc", quantite: 1, zone: "MAIN" },
      { nom: "Un pour Un", quantite: 1, zone: "MAIN" },
      { nom: "Monster Reborn", quantite: 1, zone: "MAIN" },
      { nom: "Tactique Dragonienne", quantite: 1, zone: "MAIN" },
      { nom: "Bourse des Âmes", quantite: 1, zone: "MAIN" },
      { nom: "Épées de Révélation de la Lumière", quantite: 1, zone: "MAIN" },
      { nom: "Contrôleur d'Ennemi", quantite: 1, zone: "MAIN" },
      { nom: "Château des Âmes de Dragon", quantite: 1, zone: "MAIN" },
      { nom: "Chaîne Démoniaque", quantite: 1, zone: "MAIN" },
      { nom: "Kunai avec Chaîne", quantite: 1, zone: "MAIN" },
      { nom: "Concentrateur de Dommages", quantite: 1, zone: "MAIN" },
      { nom: "Appel de l'Être Hanté", quantite: 1, zone: "MAIN" },
      { nom: "Dispositif d'Évacuation Obligatoire", quantite: 1, zone: "MAIN" },
      { nom: "Vigilance de Champion", quantite: 1, zone: "MAIN" },
      { nom: "Dragon Argent aux Yeux Azur", quantite: 1, zone: "EXTRA" }
    ];


    const promises = sagaDragonBlanc.map(card =>
    db.cards.searchCards({ name: card.nom, language_code: 'fr' }).then(result => {
        if (result.length > 0) {
            result[0].quantity = card.quantite;
            result[0].zone = card.zone;
            return result[0];
        }
    })
    );

    return Promise.all(promises).then(resolvedCards => {
        const deckContent = resolvedCards.filter(card => card !== null);
        db.close();
        return [deckData, deckContent];
    });
}