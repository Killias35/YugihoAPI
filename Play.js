import Duel from "./game/duel.js";
import Deck from "./game/deck.js";
import Card from "./game/card.js";
import Player from "./game/player.js";
import Profile from "./API/profile.js";
import Simulate from "./game/simulate.js";

var sim = new Simulate();

let profile1 = new Profile("yugi");
let profile2 = new Profile("kaiba");

profile1.RegisterDeck(new Deck("test1", sim.CreateDeck()));
profile1.SelectDeck(0);

profile2.RegisterDeck(new Deck("test1", sim.CreateDeck()));
profile2.SelectDeck(0);

let duel = new Duel(8000);
duel.StartDuel(profile1, profile2);