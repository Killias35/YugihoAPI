import Duel from "./duel.js";
import Deck from "./deck.js";
import Card from "./card.js";
import Player from "./player.js";
import Profile from "./../API/profile.js";


export default class Simulate {
    CreateDeck(){
        // création faux deck
        const cardData = {
            id: 6983839,
            name: "Tornado Dragon",
            type: "XYZ Monster",
            frameType: "xyz",
            desc: "2 Level 4 monsters\nOnce per turn (Quick Effect): You can detach 1 material from this card, then target 1 Spell/Trap on the field; destroy it.",
            atk: 2100,
            def: 2000,
            level: 4,
            race: "Wyrm",
            attribute: "WIND",
            card_images: "https://images.ygoprodeck.com/images/cards/6983839.jpg"
        };
        const deck = Array.from({ length: 40 }, () => new Card(cardData));

        return deck;
    }

    CreateExtraDeck(){
        // création faux deck
        const cardData = {
            id: 6983839,
            name: "Tornado Dragon",
            type: "XYZ Monster",
            frameType: "xyz",
            desc: "2 Level 4 monsters\nOnce per turn (Quick Effect): You can detach 1 material from this card, then target 1 Spell/Trap on the field; destroy it.",
            atk: 2100,
            def: 2000,
            level: 4,
            race: "Wyrm",
            attribute: "WIND",
            card_images: "https://images.ygoprodeck.com/images/cards/6983839.jpg"
        };
        const deck = Array.from({ length: 15 }, () => new Card(cardData));

        return deck;
    }
}