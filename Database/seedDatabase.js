import CardsSeeder from "./Seeders/cardsSeeder.js";
import DecksSeeder from "./Seeders/decksSeeder.js";
import ProfilesSeeder from "./Seeders/profilesSeeder.js";

const args = process.argv.slice(2); // enlève 'node' et le nom du fichier

const hasCards = args.includes('--cards');
const hasProfile = args.includes('--profiles');
const hasDecks = args.includes('--decks');



if (hasCards) {

    var cardsSeeder = new CardsSeeder("FR");
    cardsSeeder.insertAllCards();
    console.log("✅ Cartes francaises ajoutées.");

    cardsSeeder = new CardsSeeder("EN");
    cardsSeeder.insertAllCards();
    console.log("✅ Cartes anglaises ajoutées.");
}

if (hasProfile) {
    const profilesSeeder = new ProfilesSeeder();
    profilesSeeder.insertAllProfiles();
    console.log("✅ Profils ajoutés.");
}

if (hasDecks) {
    const decksSeeder = new DecksSeeder();
    decksSeeder.insertAllDecks();
    console.log("✅ Decks ajoutés.");
}


if (!hasCards && !hasProfile && !hasDecks) {
    console.error("Aucune option n'a été choisie.");
    console.error("Utilisez --cards, --profiles ou --decks.");
    process.exit(1);
}