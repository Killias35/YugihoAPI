import Database from '../dataAcess.js';

export default class ProfilesSeeder {
  constructor(language_code = 'en') {
      this.language_code = language_code.toLowerCase();
      this.db = new Database();
  }

  async insertAllProfiles() {
    const profile = {
      pseudo: 'Yami Yugi',
      uuid: crypto.randomUUID(),
      password: '12345'
    };

    this.db.profile.addProfile(profile);
    this.db.close();
  }
}