export default class Player{
    maxlp = 0;
    lp = 0;
    deck = [];

    constructor(profile){
        this.profile = profile;
    }

    StartDuel(duel, lifePoint){
        this.duel = duel;
        this.lifePoint = lifePoint;

        this.lifePoint.resetLifePointOfPlayer(this);
    }

    SetLifePoint(lp){
        this.lifePoint.SetLifePointOfPlayer(this, lp);
    }

    SetDeck(deck){
        this.deck = deck;
    }
}