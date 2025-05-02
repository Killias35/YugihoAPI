export default class Phase {
    constructor(duel) {
        this.phases = [
            "DRAW",
            "STANDBY",
            "MAIN1",
            "BATTLE",
            "MAIN2",
            "END"
        ];

        this.allowedTransitions = {
            "DRAW": ["STANDBY"],
            "STANDBY": ["MAIN1"],
            "MAIN1": ["BATTLE", "END"], // autorise de sauter à END (rarement utile, mais possible)
            "BATTLE": ["MAIN2", "END"],
            "MAIN2": ["END"],
            "END": ["DRAW"]
        };

        this.inputAllowedTransitions = {
            "DRAW": [],
            "STANDBY": [],
            "MAIN1": ["BATTLE", "END"], // autorise de sauter à END (rarement utile, mais possible)
            "BATTLE": ["MAIN2", "END"],
            "MAIN2": ["END"],
            "END": []
        };

        this.currentPhase = "DRAW";
        this.battlePhasePassed = false;
        this.duel = duel;
    }

    NextPhase() {
        switch (this.currentPhase) {
            case "DRAW":
                this.currentPhase = "STANDBY";
                break;
            case "STANDBY":
                this.currentPhase = "MAIN1";
                break;
            case "MAIN1":
                this.currentPhase = "BATTLE";
                break;
            case "BATTLE":
                this.battlePhasePassed = true;
                this.currentPhase = "MAIN2";
                break;
            case "MAIN2":
                this.currentPhase = "END";
                break;
            case "END":
                this.currentPhase = "DRAW";
                this.battlePhasePassed = false;
                break;
            default:
                console.log("Phase inconnue");
        }
    }

    // Méthode pour forcer un saut vers une phase autorisée (ex: sauter la battle)
    GoToPhase(phaseName) {
        if (!this.allowedTransitions[this.currentPhase].includes(phaseName)) {
            return console.log(`Impossible de passer de ${this.currentPhase} à ${phaseName}`);
        }

        if (this.currentPhase === "BATTLE") this.battlePhasePassed = true;
        this.currentPhase = phaseName;

        if (this.currentPhase === "END") this.duel.NextTurn();
    }
}
