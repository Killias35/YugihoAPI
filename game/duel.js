import Field from "./field.js";
import LifePoint from "./lifePoint.js";
import Player from "./player.js";
import Profile from "./../API/profile.js";

export default class Duel{
    constructor(lp=8000){
        this.field = new Field();
        this.lifePoint = new LifePoint();
        this.lifePoint.maxLifePoint = lp;
    };

    StartDuel(profile1, profile2) {
        this.player1 = new Player(profile1);
        this.player2 = new Player(profile2);

        this.player1.StartDuel(this, this.lifePoint);
        this.player2.StartDuel(this, this.lifePoint);

        this.ShowInfos(this.player1);
        this.ShowInfos(this.player2);
    }

    ShowInfos(player) {
        console.log(player.profile.name + " : " + player.lp);
    }
}

let duel = new Duel(8000);
let profile1 = new Profile("yugi");
let profile2 = new Profile("kaiba");

duel.StartDuel(profile1, profile2);
