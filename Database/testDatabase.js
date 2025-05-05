import Database from "./dataAcess.js";
import TestProfile from "./Tests/testProfile.js";
import TestDeck from "./Tests/testDeck.js";
import TestCards from "./Tests/testCard.js";

async function ResetDB() {
    const db = new Database();

    console.log(await db.resetDB());
    db.close();
}

async function testProfiles() {
    const db = new Database();   
    const test = new TestProfile(db);
    await test.TestProfiles();

    db.close();
}

async function testDecks() {
    const db = new Database();   
    const test = new TestDeck(db);
    await test.TestDecks();

    db.close();
}

async function testCards() {
    const db = new Database();   
    const test = new TestCards(db);
    await test.TestCards();

    db.close();
}

ResetDB();
//testProfiles();
//testCards();
//testDecks();

