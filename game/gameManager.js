

export default class GameManager {

    constructor(duel, eventManager) {
        this.duel = duel;
        this.eventManager = eventManager;
        this.effectTriggered = null;
        this.effectChain = [];
    }

    async Dueling(){
        while (!this.duel.isFinished){

            while (this.duel.phase.currentPhase !== 'END') 
            {
                var currentPlayer = this.duel.playerTurn;
                var opponent = this.duel.GetOpponent(currentPlayer);

                const events = this.eventManager.CanTriggerEvent("NO_EVENT", currentPlayer);
                const eventAvailable = Object.keys(events).length > 0;
                // console.log('\n' + JSON.stringify(events, null, 4));

                if (eventAvailable) {
                    console.log("peut trigger un event");
                    await this.eventManager.AskForTriggerEvent(currentPlayer, events);
                }
                else{
                    this.duel.gameState = "Acting...";
                    await this.eventManager.AutoEvent(currentPlayer);
                }
                this.duel.ShowInfos(currentPlayer);
            }
            this.duel.NextTurn(); // passe au joueur suivant
        }
    }
}
