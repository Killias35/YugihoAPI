import MenuManager from '../Menus/MenuManager.js';
import crypto from 'crypto';

export default class LoginManager {
    constructor(database, responseManager) {
        this.database = database;
        this.responseManager = responseManager;
    }

    async Login(pseudo, password){
        // ne pas oublier de hash le password
        const profile = await this.database.profile.getProfile(pseudo, password);
        if(!profile) return {error: "Pseudo ou mot de passe incorrect" + profile};
        const ret = this.responseManager.isPlayerConnected(profile.uuid);
        if (ret) return {error: "Joueur deja connecté"};
        
        return await this.loginConfirmed(profile.uuid);
    }

    async Logout(token){
        const profileId = this.responseManager.getPlayerIdFromToken(token);
        if (this.responseManager.removeSession(token)){        
            this.database.userState.removeUserState(profileId);
            return {sucess: "Deconnexion reussie"};
        } else {
            return {error: "Session invalide"};
        };
    }

    async Register(pseudo, password){
        let profile = await this.database.profile.getProfile(pseudo, password);
        if(!profile) {
            profile = await this.database.profile.addProfile({pseudo, password});

            return await this.loginConfirmed(profile.uuid);
        }
        return {error: "Compte déjà existant"};
    }

    async loginConfirmed(profileId){
        const token = crypto.randomUUID();
        this.responseManager.addSession(profileId, token);
        this.database.userState.addUserState(profileId, "none");

        const menu = new MenuManager(this.database, this.responseManager);
        const ret = await menu.handleMenu(profileId, "");

        return {token: token, message: ret.message, action: ret.action};
    }
}
