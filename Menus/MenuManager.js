import { handlemainMenu} from './MainMenu.js';
import { handleDeckMenu } from './DeckMenu.js';
import { handleDeckListeMenu } from './DeckListeMenu.js';
import { exitCode } from 'process';

export default class MenuManager {
    constructor(database) {
        this.db = database; // Accès à ta base pour récupérer l'état de menu du joueur
    }

    async handleMenu(playerId, action) {
        // Récupérer l'état de menu actuel
        const menuState = await this.db.userState.getUserState(playerId); // par ex: "main", "deck"
        const expectedInputs = await this.db.userState.getExpectedInputs(playerId);
        console.log("ExpectedInputs:", expectedInputs);
        if (menuState.error) menuState = "principale";                    // defaut
        if (expectedInputs === null) expectedInputs = [];
        if (action === null || action.action === undefined) action = { action: '' };
        if (action.action !== '' && !expectedInputs.includes(action.action)) return { message: 'Commande inconnue.' };

        switch (menuState.current_menu) {
            case 'principal':
                return await handlemainMenu(playerId, action, this.db);
            case 'deck':
                return await handleDeckMenu(playerId, action, this.db);
            case 'deck liste':
                return await handleDeckListeMenu(playerId, action, this.db);
            default:
                menuState = "principale"; 
                return { message: 'Menu Disponible: [principal, deck, duelRoom]', action: ['principal', 'deck', 'duelRoom'] };
        }
    }


}
