import Database from '../dataAcess.js';
import fs from 'fs/promises';
import path from 'path';


export default class decksSeeders {
  constructor(language_code = 'en') {
      this.language_code = language_code.toLowerCase();
      this.db = new Database();
      this.YDK_DIR = "./GetDatas/data/deck/";
  }
  
  async parseYdkFile(filePath) {
    const content = await fs.readFile(filePath, "utf-8");
    const lines = content.split(/\r?\n/);
  
    var main_size = 0;
    var extra_size = 0;
    var side_size = 0;
    var deckContent = [];
  
    let currentSection = "MAIN";
  
    for (let line of lines) {
      if (line.startsWith("#created")) continue; // commentaire
      if (line === "!side") {
        currentSection = "SIDE";
        continue;
      }
      if (line === "#extra" || line === "!extra") {
        currentSection = "EXTRA";
        continue;
      }
      if (!line.trim()) continue;
      switch (currentSection) {
        case "MAIN":
          main_size += 1;
          break
        case "EXTRA":
          extra_size += 1;
          break
        case "SIDE":
          side_size += 1;
          break
      }

      if (line.startsWith("#")) continue;
      const data = {
        id: line,
        quantity: 1,
        zone: currentSection,
      };
      deckContent.push(data);
    }
    return [{
      nom_deck: path.basename(filePath, ".ydk"),
      private: false,
      main_size: main_size,
      extra_size: extra_size,
      side_size: side_size,
    }, deckContent];
  }

  async GetStructuresDeck() {
    const decksData = [];
  
    try {
      const files = await fs.readdir(this.YDK_DIR);
      const ydkFiles = files.filter(file => path.extname(file) === ".ydk");
  
      for (const file of ydkFiles) {
        const filePath = path.join(this.YDK_DIR, file);
        const [deckData, deckContent] = await this.parseYdkFile(filePath); // ← aussi async
        decksData.push([deckData, deckContent]);
        /*
        console.log(`\n📁 Fichier: ${file}`);
        if (parsed){
          console.log(`🃏 Main Deck (${parsed.main_size.length} cartes)`);
          console.log(`✨ Extra Deck (${parsed.extra_size.length} cartes)`);
          console.log(`🧩 Side Deck (${parsed.side_size.length} cartes)`);
        }
        else{
          console.log("🚫 Aucun deck trouvé.");
        }
      */
      }
      
      return decksData;
  
    } catch (err) {
      console.error("Erreur de lecture du dossier :", err);
      return [];
    }
  }

  async insertAllDecks() {
    const decksData = await this.GetStructuresDeck();
  
    for (const deckData of decksData) {
      try{
        const deck = await this.db.deck.addDeck(deckData[0]);
        await this.db.deckData.addDeckDataWithCards(deck, deckData[1]);
        console.log("✅ Deck ajouté :", deck.nom_deck);
      }
      catch (err) {
        console.error("Erreur lors de l'ajout du deck :", err);
        this.db.connection.rollback();
      }
    }
  
    this.db.close(); // Ne sera appelé que lorsque tout est terminé
  }
}