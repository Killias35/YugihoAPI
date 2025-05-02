import readline from 'readline';



export default class LocalInput{
    constructor(){
        this.typeInput = "local";
        this.rl = this.GetNewReadLine();
    }

    GetNewReadLine(){
        return readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
    }

    GetMessage(jsonData) {
        this.rl = this.GetNewReadLine();
        return this.GetResponseFromTerminal(jsonData);
    }

    GetResponseFromTerminal(jsonData) {
        return new Promise((resolve) => {
            console.log(`\n\n\n\n\n\n\n\n\n[Choisis une action]`);
    
            const events = jsonData.events;
            const eventKeys = Object.keys(events);
    
            eventKeys.forEach((key, index) => {
                const values = events[key];
                if (Array.isArray(values) && values.length > 0) {
                    console.log(`${index + 1}. ${key}: ${values.join(', ')}`);
                } else {
                    console.log(`${index + 1}. ${key}`);
                }
            });
            console.log(`${eventKeys.length + 1}. Nothing`);

            // console.log('\n' + JSON.stringify(jsonData, null, 4));       // affiche le json complet
            this.rl.question('\nNuméro de l’événement : ', (eventAnswer) => {
                const eventIndex = parseInt(eventAnswer) - 1;
            
                // Si l'utilisateur a choisi l'option "Nothing"
                if (eventIndex === eventKeys.length) {
                    this.rl.close();
            
                    resolve({
                        event: {
                            "Nothing": null
                        }
                    });
                    return;
                }
            
                const selectedKey = eventKeys[eventIndex];
                const availableActions = events[selectedKey];
            
                // Si l'événement a plusieurs actions possibles (ex: PhaseChange)
                if (Array.isArray(availableActions) && availableActions.length > 0) {
                    console.log(`Actions disponibles pour ${selectedKey} :`);
                    availableActions.forEach((action, index) => {
                        console.log(`${index + 1}. ${action}`);
                    });
            
                    this.rl.question('\nNuméro de l’action : ', (actionAnswer) => {
                        const actionIndex = parseInt(actionAnswer) - 1;
                        const selectedAction = availableActions[actionIndex];
            
                        console.log(`\n${selectedKey} => ${selectedAction}`);
                        this.rl.close();
            
                        resolve({
                            event: {
                                [selectedKey]: selectedAction
                            }
                        });
                    });
            
                } else {
                    // Cas où l'événement n’a pas d’actions précises (ou un seul choix implicite)
                    console.log(`${selectedKey} sélectionné`);
                    this.rl.close();
            
                    resolve({
                        event: {
                            [selectedKey]: null
                        }
                    });
                }
            });            

        });
    }
}