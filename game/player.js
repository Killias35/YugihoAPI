export default class Player{
    maxlp = 0;
    lp = 0;
    deck = null;
    duel = null;
    field = null;
    lifePoint = null;
    profile = null;
    normalSummonLeft = 1;
    specialSummonLeft = -1;

    constructor(profile){
        this.profile = profile;
        this.deck = profile.selectedDeck;
        this.id = profile.id;
    }

    StartDuel(duel, field, lifePoint){
        this.duel = duel;
        this.field = field;
        this.lifePoint = lifePoint;

        this.deck.player = this;
        this.lifePoint.ResetLifePointOfPlayer(this);
    }

    SetLifePoint(lp){       // lors de dommage ou de heal
        this.lifePoint.SetLifePointOfPlayer(this, lp);
    }
}