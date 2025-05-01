import Field from "./field.js";
import LifePoint from "./lifePoint.js";
import Player from "./player.js";

export default class Duel{
    constructor(lp=8000){
        this.field = new Field();
        this.lifePoint = new LifePoint();
        this.lifePoint.maxLifePoint = lp;
    };

    StartDuel(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;

        this.player1.StartDuel(this, this.lifePoint);
        this.player2.StartDuel(this, this.lifePoint);

        this.ShowInfos(this.player1);
        this.ShowInfos(this.player2);
    }

    ShowInfos(player) {
        console.log(player.name + " : " + player.lifePoint);
    }
}

let duel = new Duel(8000);
let player1 = new Player("yugi");
let player2 = new Player("kaiba");

duel.StartDuel(player1, player2);
