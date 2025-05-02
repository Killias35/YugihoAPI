import LocalInput from "./usersInput/localInput.js";
import APIInput from "./usersInput/APIInput.js";

export default class UsersInput{
    constructor(typeInput="API"){
        this.typeInput = typeInput;

        if(this.typeInput === "local"){
            this.input = new LocalInput();
        }else if(this.typeInput === "API"){
            this.input = new APIInput();
        }
    }

    async GetMessage(jsonData){
        //console.log("Demande de message a " + jsonData.for);
        return await this.input.GetMessage(jsonData);
    }
}