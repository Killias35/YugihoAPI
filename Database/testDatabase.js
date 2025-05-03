import Database from './dataAcess.js';


async function TestAddProfile() {
    const db = new Database();

    // Données du profil
    const profileData = {
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        pseudo: 'Yugi',
        password: '12345'
    };

    const result = await db.addProfile(profileData)
    console.log(result);       
}

async function ResetDB() {
    const db = new Database();

    await db.resetDB();
}

ResetDB();