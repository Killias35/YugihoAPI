import Field from "./field.js";
import LifePoint from "./lifePoint.js";
import Player from "./player.js";
import Profile from "./../API/profile.js";

export default class Duel{
    constructor(lp=8000, deckCardLimite=60, extraDeckCapacity=15, fieldLength=5){
        this.lifePoint = new LifePoint();
        this.lifePoint.maxLifePoint = lp;
        this.deckCardLimite = deckCardLimite;
        this.extraDeckCapacity = extraDeckCapacity;
        this.fieldLength = fieldLength;
    };

    StartDuel(profile1, profile2) {
        if (!profile1.selectedDeck || !profile2.selectedDeck){
            return console.log("Un joueur n'a pas choisit de deck");
        } 
        if (profile1.selectedDeck.cardListe.length > this.deckCardLimite || profile2.selectedDeck.cardListe.length > this.deckCardLimite){
            return console.log("Un deck est trop gros");
        }

        this.player1 = new Player(profile1);
        this.player2 = new Player(profile2);

        this.field = new Field(profile1.id, profile2.id, this.deckCardLimite, this.extraDeckCapacity, this.fieldLength);

        this.player1.StartDuel(this, this.field, this.lifePoint);
        this.player2.StartDuel(this, this.field, this.lifePoint);
        this.field.SetUpField(this.player1.deck, this.player1.profile.id, this.player2.deck, this.player2.profile.id);

        console.log("\n\n\n\n\n\n\n\n\nC'est l'heure du duel !");

        for (let i = 0; i < 5; i++) {
            this.player1.deck.DrawCard();
            this.player2.deck.DrawCard();            
        }

        ShowInfos(this.player1);
        ShowInfos(this.player2);
    }

}


function ShowInfos(player) {
    console.log(player.profile.name + " : " + player.lp);
    console.log(player.field.GetZone("deckField", player.profile.id).length + " cartes dans le deck");
    console.log(player.field.GetZone("handField", player.profile.id).length + " cartes dans la main");
    console.log(player.field.GetZone("extraDeckField", player.profile.id).length + " cartes dans l'extra deck");
    console.log(player.field.GetZone("spellField", player.profile.id).length + " cartes dans la zone magie");
    console.log(player.field.GetZone("fieldSpellField", player.profile.id).length + " cartes dans la zone magie terrain");
    console.log(player.field.GetZone("monsterField", player.profile.id).length + " cartes dans la zone monstre");
    console.log(player.field.GetZone("discardField", player.profile.id).length + " cartes dans la zone d'abandon");
    console.log(player.field.GetZone("banishField", player.profile.id).length + " cartes dans la zone de bannissement");
    console.log(player.field.GetZone("linkField").length + " cartes dans la zone de lien");
    console.log("\n");

}

