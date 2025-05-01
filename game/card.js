export default class Card {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.type = data.type;
      this.frameType = data.frameType;
      this.description = data.desc;
      this.attack = data.atk;
      this.defense = data.def;
      this.level = data.level;
      this.race = data.race;
      this.attribute = data.attribute;
      this.imageUrl = data.card_images;
    }
  
    // Exemple de méthode utile
    DisplayInfo() {
      console.log(`${this.name} [${this.attribute} / ${this.race}]`);
      console.log(`ATK: ${this.attack} | DEF: ${this.defense} | Level: ${this.level}`);
      console.log(`Description: ${this.description}`);
      console.log(`Image: ${this.imageUrl}`);
    }
  }