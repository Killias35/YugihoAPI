export default class APIInput{
    constructor(){
        this.typeInput = "local";
    }

    GetMessage(jsonData){
        // Envoie le message en passant par l'api
        return console.log("Provient de l'api");
    }
}