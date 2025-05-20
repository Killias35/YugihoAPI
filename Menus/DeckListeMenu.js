import { handleDeckMenu } from "./DeckMenu.js";

export async function handleDeckListeMenu(playerId, input, db) {
    db.userState.editUserState(playerId, 'deck liste');
    const expectedInputs = ['voir', 'retour'];
    if (!input || !input.action) {
        return {
            message: 'Voici la liste des decks',
            expectedInputs: expectedInputs,
            infos: db.decks.getDeckOfPlayer(playerId)
        };
    }

    // return deck.handleMenu(playerId, input);
    switch (input.action.toLowerCase()) {
        case 'voir':
            return listDeckMenu(playerId, db);
        case 'retour':
            return await handleDeckMenu(playerId, {}, db);
        default:
            return { message: 'Commande inconnue dans le menu Deck Liste.' };
    }
}

function listDeckMenu(playerId, db) {
    const decks = db.decks.getDeckOfPlayer(playerId);
    
    return {
        message: 'Liste des decks :',
        infos: decks
    };

}