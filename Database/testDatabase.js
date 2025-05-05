import Database from './dataAcess.js';
import { randomInt, randomUUID } from 'crypto';


async function TestAddProfile() {
    const db = new Database();

    // Données du profil
    const profileData = {
        uuid: randomUUID(),
        pseudo: 'Yugi'+randomInt(1000),
        password: '12345'
    };

    const result = await db.profile.addProfile(profileData)
    console.log(result);       
}

async function TestRemoveProfile(uuid) {
    const db = new Database();
    const result = await db.profile.removeProfile(uuid)
    console.log(result);       
}

async function TestEditProfile(profileData) {
    const db = new Database();
    const result = await db.profile.editProfile(profileData)
    console.log(result);       
}

async function ResetDB() {
    const db = new Database();

    console.log(await db.resetDB());
}

//ResetDB();
//TestAddProfile();
//TestRemoveProfile("9bbf3e6a-523c-4400-8056-b7420dca9d87");

const profile = {
    uuid: "9bbf3e6a-523c-4400-8056-b7420dca9d87",
    pseudo: 'Yugi'+randomInt(1000),
    password: '12345'
};

TestEditProfile(profile);
