import Duel from "./game/duel.js";
import Deck from "./game/deck.js";
import Profile from "./API/profile.js";
import usersInput from "./API/usersInput.js";
import Simulate from "./game/simulate.js";

var input = new usersInput("local"); 

var sim = new Simulate();

let profile1 = new Profile("yugi");
let profile2 = new Profile("kaiba");

profile1.RegisterDeck(new Deck("test1", sim.CreateDeck(), sim.CreateExtraDeck()));
profile1.SelectDeck(0);

profile2.RegisterDeck(new Deck("test1", sim.CreateDeck(), sim.CreateExtraDeck()));
profile2.SelectDeck(0);

let duel = new Duel(8000, 60, 15, 5);
duel.StartDuel(profile1, profile2);


