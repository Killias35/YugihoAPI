export default class deck{
    nameDeck = "";
    cardListe = [];
    extraCardListe = [];
    player = null;

    constructor(nameDeck, cardList, extraCardListe){
        this.nameDeck = nameDeck;
        this.cardListe = cardList;
        this.extraCardListe = extraCardListe;
        this.ShuffleDeck();
    }

    ShuffleDeck(){
        for (let i = this.cardListe.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cardListe[i], this.cardListe[j]] = [this.cardListe[j], this.cardListe[i]];
        }
    }

    DrawCard(){
        this.player.field.MoveCard(this.player.profile.id, this.cardListe[0], "deckField", "handField");
    }

    AddCard(card){
        this.cardListe.push(card);
    }

    ShowCardList(){
        this.cardListe.forEach(card => {
            console.log(card.name);
        });
    }

}