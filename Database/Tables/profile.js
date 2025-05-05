// Fonction pour ajouter un profil

export default class Profile{
    constructor(connection){
        this.connection = connection;
    }


    addProfile(profileData) {
        const connection = this.connection;
        const { uuid, pseudo, password } = profileData;
        try{
            return new Promise((resolve, reject) => {
                this.connection.query(
                    'INSERT INTO profile (uuid, pseudo, password) VALUES (?, ?, ?)',
                    [uuid, pseudo, password],
                    (err, result) => {
                        if (err) return reject(err);
                        
                        resolve('Profil ajouté avec succès !');
                    }
                );
            });
        }
        catch(err){
            return "Une erreur s'est produite lors de l'ajout du profil";
        }
        finally {
            connection.end();
        }
    }

    removeProfile(uuid) {
        const connection = this.connection;
        try {
            return new Promise((resolve, reject) => {
                connection.query(
                    'DELETE FROM profile WHERE uuid = ?',
                    [uuid],
                    (err, result) => {
                        if (err) return reject(err);
                        if (result.affectedRows === 0) {
                            return resolve('Aucun profil trouvé pour cet UUID.');
                        }
                        resolve('Profil supprimé avec succès !');
                    }
                );
            });
        } catch(err) {
            return "Une erreur s'est produite lors de la suppression du profil";
        } finally {
            connection.end();
        }
    }

    editProfile(profileData) {
        const connection = this.connection;
        const { uuid, pseudo, password } = profileData;
        try {
            return new Promise((resolve, reject) => {
                connection.query(
                    'UPDATE profile SET pseudo = ?, password = ? WHERE uuid = ?',
                    [pseudo, password, uuid],
                    (err, result) => {
                        if (err) return reject(err);
                        if (result.affectedRows === 0) {
                            return resolve("Aucun profil mis à jour (UUID introuvable).");
                        }
                        resolve('Profil mis à jour avec succès !');
                    }
                );
            });
        } catch(err) {
            return "Une erreur s'est produite lors de la modification du profil";
        } finally {
            connection.end();
        }
    }
    
}