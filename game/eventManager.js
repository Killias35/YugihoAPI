import UsersInput from "../API/usersInput.js";

export default class EventManager {
    EVENT_NAMES = [

        "DRAW_PHASE_START",
        "STANDBY_PHASE_START",
        "MAIN_PHASE_1_START",
        "BATTLE_PHASE_START",
        "MAIN_PHASE_2_START",
        "END_PHASE_START",
        "TURN_START",
        "TURN_END",
        "PHASE_CHANGE",
    
        "CARD_DRAWN",
        "CARD_PLAYED",
        "CARD_SUMMONED",
        "CARD_SET",
        "CARD_DESTROYED",
        "CARD_SENT_TO_GRAVEYARD",
        "CARD_BANISHED",
        "CARD_ACTIVATED",
        "CARD_TARGETED",
        "EFFECT_RESOLVED",
    
        "ATTACK_DECLARED",
        "ATTACK_TARGETED",
        "BATTLE_STEP",
        "DAMAGE_STEP",
        "MONSTER_DESTROYED_BY_BATTLE",
        "BATTLE_PHASE_END",
    
        "QUICK_EFFECT_OPPORTUNITY",
        "TRAP_ACTIVATION_OPPORTUNITY",
        "NEGATE_OPPORTUNITY",
    
        "EFFECT_CHAIN_UPDATE",
        "EFFECT_CHAIN_RESOLVED",

        "NO_EVENT",
        
        "NOTHING"
    ];

    constructor(duel) {
        this.duel = duel;
        this.input = new UsersInput("local"); 
    }

    async AskForTriggerEvent(player, events) {      // Demande au joueur d'effectuer un event
        this.duel.gameState = "Waiting for input";
        console.log(player.profile.name + " doit effectuer une action");
        const eventToTrigger = await this.input.GetMessage({"for": player.id, "events": events})
        this.duel.gameState = "Acting...";

        return this.TriggerEvent(eventToTrigger, player)
    }

    CanTriggerEventAllPlayers(eventName) {          // Demande aux joueurs d'effectuer un event
        const events = this.CanTriggerEvent(eventName, this.duel.playerTurn)
        const eventAvailable = Object.keys(events).length > 0;

        if (eventAvailable) {
            this.AskForTriggerEvent(this.duel.playerTurn, eventAvailable);
        }

        events = this.CanTriggerEvent(eventName, this.duel.GetOpponent(this.duel.playerTurn));
        eventAvailable = Object.keys(events).length > 0;

        if (eventAvailable) {
            this.AskForTriggerEvent(this.duel.GetOpponent(this.duel.playerTurn), eventAvailable);
        }
    }

    CanTriggerEvent(eventName, player) {    // Renvoie la liste des evenements possibles
        var events = {};
        if (this.effectTriggered) {     // Un effet est en cours
            const cardEvents = this.CanTriggerCardEffect(eventName, player);
            Object.assign(events, cardEvents); // ajoute les events de cartes aux event possible

        }

        if(eventName == "NO_EVENT") {                          // Aucun evenement en cours
            const phaseEvents = this.CanTriggerPhaseEvent(player);
            Object.assign(events, phaseEvents);    // ajoute les events de phase aux event possible
        }

        
        return events
    }

    CanTriggerCardEffect(eventName, player){
        // Boucler sur toutes les cartes du joueur et tester ses conditions d'activations pour savoir si un effet peut etre trigger
        return {"CardEffect": []};
    }

    CanTriggerPhaseEvent(player) {
        const isCurrentPlayer = player === this.duel.playerTurn;
        if (isCurrentPlayer) {
            const canChangeTo = this.duel.phase.inputAllowedTransitions[this.duel.phase.currentPhase];
            if (canChangeTo.length === 0) return {};
            return {"PhaseChange": canChangeTo};   
        }
        return {};
    }

    TriggerEvent(jsonData, player) {
        if (jsonData.event["PhaseChange"]) {
            this.duel.phase.GoToPhase(jsonData.event["PhaseChange"], player);
        }
    }

    AutoEvent(player){
        if (this.duel.phase.currentPhase === "DRAW"){
            player.deck.DrawCard();
            this.duel.phase.GoToPhase("STANDBY");
        }
        else if (this.duel.phase.currentPhase === "STANDBY"){
            this.duel.phase.GoToPhase("MAIN1");
        }
     }
}
