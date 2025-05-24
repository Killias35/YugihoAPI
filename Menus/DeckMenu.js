import { handlemainMenu } from './MainMenu.js';
import {handleDeckListeMenu} from './DeckListeMenu.js';

export async function handleDeckMenu(playerId, input, db) {
    db.userState.editUserState(playerId, 'deck');
    db.userState.setExpectedInputs(playerId, ['voir', 'creer', 'retour']);
    const expectedInputs = ['voir', 'creer', 'retour'];

    if (!input || !input.action) {
        return {
            message: 'Menu Deck : Voir les decks, creation de deck ou retour au menu principal.', 
            expectedInputs: expectedInputs 
        };
    }

    // return deck.handleMenu(playerId, input);
    switch (input.action.toLowerCase()) {
        case 'voir':
            return handleDeckListeMenu(playerId, null, db);
        case 'creer':
            return { message: 'Création de deck en cours...' };
        case 'retour':
            return handlemainMenu(playerId, null, db);
        default:
            return { message: 'Commande inconnue dans le menu Deck.' };
    }
}
