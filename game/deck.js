export default class deck{
    nameDeck = "";
    cardListe = [];
    player = null;

    constructor(nameDeck, cardList){
        this.nameDeck = nameDeck;
        this.cardListe = cardList;
        this.ShuffleDeck();
    }

    ShuffleDeck(){
        for (let i = this.cardListe.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cardListe[i], this.cardListe[j]] = [this.cardListe[j], this.cardListe[i]];
        }
    }

    DrawCard(){
        this.player.field.moveCard(this.player.profile.id, this.cardListe[0], "deckField", "handField");
        console.log(this.cardListe.length);
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