import Field from "./field.js";
import LifePoint from "./lifePoint.js";
import Player from "./player.js";
import Phase from "./phase.js";
import GameManager from "./gameManager.js";
import EventManager from "./eventManager.js";

export default class Duel{
    constructor(lp=8000, deckCardLimite=60, extraDeckCapacity=15, fieldLength=5){
        this.lifePoint = new LifePoint();
        this.lifePoint.maxLifePoint = lp;
        this.deckCardLimite = deckCardLimite;
        this.extraDeckCapacity = extraDeckCapacity;
        this.fieldLength = fieldLength;
        this.playerTurn = null;                                 // quel joueur est en train de jouer
        this.needAction = {"for": null, "message": ""};         // quel joueur est en attente d'une action
        this.gameState = "Initialisation";
        this.eventManager = new EventManager(this);
        this.gameManager = new GameManager(this, this.eventManager);
        this.turn = 0;
        this.isFinished = false;
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
        this.phase = new Phase(this);

        this.player1.StartDuel(this, this.field, this.lifePoint);
        this.player2.StartDuel(this, this.field, this.lifePoint);
        this.field.SetUpField(this.player1.deck, this.player1.profile.id, this.player2.deck, this.player2.profile.id);

        console.log("\n\n\n\n\n\n\n\n\nC'est l'heure du duel !");

        for (let i = 0; i < 5; i++) {
            this.player1.deck.DrawCard();
            this.player2.deck.DrawCard();            
        }

        this.playerTurn = ChoosePlayerTurn(this.player1, this.player2);
        this.gameManager.Dueling();
    }

    ShowInfos(player) {
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

    NextTurn() {
        this.playerTurn = this.GetOpponent(this.playerTurn);
        this.phase.GoToPhase("DRAW");
        console.log(this.playerTurn.profile.name + " commence");
    }

    EndDuel() {
        this.isFinished = true;
    }

    GetOpponent(player) {
        if (player === this.player1) {
            return this.player2;
        } else {
            return this.player1;
        }
    }
}


function ChoosePlayerTurn(player1, player2) {
    if (Math.random() < 0.5) {
        return player1;
    } else {
        return player2;
    }
}
