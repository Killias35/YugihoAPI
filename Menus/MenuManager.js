export default class MenuManager {
    constructor(database) {
        this.db = database; // Accès à ta base pour récupérer l'état de menu du joueur
    }

    async handleMenu(playerId, userInput) {
        // Récupérer l'état de menu actuel
        const menuState = await this.db.userState.getUserState(playerId); // par ex: "main", "deck"

        switch (menuState) {
            case 'principal':
                return this.mainMenu(playerId, userInput);
            case 'deck':
                return this.deckMenu(playerId, userInput);
            case 'duelRoom':
                return this.duelRoomMenu(playerId, userInput);
            default:
                return { message: 'Menu Disponible: "principal", "deck", "duelRoom', action: ['principal', 'deck', 'duelRoom'] };
        }
    }

    async mainMenu(playerId, input) {
        if (!input) {
            return {
                message: 'Menu principal : Tapez "deck", "duel", ou "amis"',
                expectedInputs: ['deck', 'duel', 'amis']
            };
        }

        switch (input.toLowerCase()) {
            case 'deck':
                await this.db.setMenuState(playerId, 'deck');
                return { message: 'Redirection vers gestion de deck...' };
            case 'duel':
                await this.db.setMenuState(playerId, 'duelRoom');
                return { message: 'Redirection vers la salle de duel...' };
            case 'amis':
                // Pas encore géré
                return { message: 'Fonctionnalité amis en cours de développement.' };
            default:
                return { message: 'Commande inconnue. Essayez "deck", "duel", ou "amis".' };
        }
    }

    async deckMenu(playerId, input) {
        if (!input) {
            return {
                message: 'Menu Deck : Tapez "voir", "créer", "retour"',
                expectedInputs: ['voir', 'créer', 'retour']
            };
        }

        switch (input.toLowerCase()) {
            case 'voir':
                // Appelle un manager de deck, ou renvoie les decks
                return { message: 'Voici vos decks : [...]' };
            case 'créer':
                return { message: 'Création de deck en cours...' };
            case 'retour':
                await this.db.setMenuState(playerId, 'main');
                return { message: 'Retour au menu principal...' };
            default:
                return { message: 'Commande inconnue dans le menu Deck.' };
        }
    }

    async duelRoomMenu(playerId, input) {
        return { message: 'Bienvenue dans la salle de duel ! Fonction à venir.' };
    }
}
