export default class LoginManager {
    constructor(database, responseManager) {
        this.database = database;
        this.responseManager = responseManager;
    }

    async Login(pseudo, password){
        // ne pas oublier de hash le password
        const profile = await this.database.profile.getProfile(pseudo, password);
        if(!profile) return {error: "Pseudo ou mot de passe incorrect" + profile};
        const ret = this.responseManager.isPlayerConnected(profile.id);
        if (ret) return {error: "Joueur deja connecté"};
        const token = crypto.randomUUID();
        this.responseManager.addSession(profile.id, token);
        return token;
    }

    async Logout(token){
        if (this.responseManager.removeSession(token)){
            return {sucess: "Deconnexion reussie"};
        } else {
            return {error: "Session invalide"};
        };
    }

    async Register(pseudo, password){
        let profile = await this.database.profile.getProfile(pseudo, password);
        if(!profile) {
            profile = await this.database.profile.addProfile({pseudo, password});
            console.log(profile);
            const token = crypto.randomUUID();
            this.responseManager.addSession(profile.id, token);

            return token;
        }
        return {error: "Compte déjà existant"};
    }
}
