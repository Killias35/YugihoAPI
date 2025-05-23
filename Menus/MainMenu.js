import { handleDeckMenu } from './DeckMenu.js';

export async function handlemainMenu(playerId, input, db) {
    db.userState.editUserState(playerId, 'principal');
    db.userState.setExpectedInputs(playerId, ['deck']);

    const expectedInputs = ['deck'];
    if (!input || !input.action) {
        return {
            message: 'Menu principal : Tapez "deck", "duel", ou "amis"', 
            expectedInputs : expectedInputs
        };
    }

    switch (input.action.toLowerCase()) {
        case 'deck':
            return await handleDeckMenu(playerId, input, db);
        default:
            return { message: 'Commande inconnue. Essayez "deck", "duel", ou "amis".' };
    }
}