import { randomInt, randomUUID } from 'crypto';


export default class TestProfile {
    constructor(db){
        this.db = db;
    }

    async TestAddProfile() {
        // Données du profil
        const profileData = {
            uuid: randomUUID(),
            pseudo: 'Yugi'+randomInt(1000),
            password: '12345'
        };
    
        const result = await this.db.profile.addProfile(profileData)
        //console.log(result);       
        return result;    
    }
    
    async TestEditProfile(profileData) {
        const result = await this.db.profile.editProfile(profileData)
        //console.log(result);    
        return result;   
    }

    async TestGetProfileByUUID(uuid) {
        const result = await this.db.profile.getProfileByUUID(uuid)
        //console.log(result);       
        return result;
    }

    async TestGetProfileByPseudo(pseudo) {
        const result = await this.db.profile.getProfileByPseudo(pseudo)
        //console.log(result);       
        return result;
    }
    
    async TestRemoveProfile(uuid) {
        const result = await this.db.profile.removeProfile(uuid)
        //console.log(result);       
        return result;
    }
    
    async TestProfiles(){
        const profile = await this.TestAddProfile();
        console.log(profile);
        profile.pseudo = 'Kaiba The TRUE Master';
        console.log(await this.TestEditProfile(profile));
        console.log(await this.TestGetProfileByUUID(profile.uuid));
        console.log(await this.TestGetProfileByPseudo(profile.pseudo));
        console.log(await this.TestRemoveProfile(profile.uuid));
    }
}
