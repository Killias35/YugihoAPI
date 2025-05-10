import express from 'express';
import authMiddleware from './API/Middleware/auth.js';
import checkGameFormat from './API/Middleware/gameFormat.js';
import checkRegisterFormat from './API/Middleware/registerFormat.js';
import checkLoginFormat from './API/Middleware/loginFormat.js';
import checkLogoutFormat from './API/Middleware/logoutFormat.js';

import ResponseManager from './API/responseManager.js';
import Database from './Database/dataAcess.js';
import LoginManager from './API/loginManager.js';

const app = express();
const PORT = 8080;

// Middleware pour parser le JSON
app.use(express.json());

app.use(express.json());

const responseManager = new ResponseManager();
const database = new Database();
const loginManager = new LoginManager(database, responseManager);

// Injection possible dans les middlewares si besoin
global.responseManager = responseManager; // simple solution pour test rapide

app.get('/login', checkLoginFormat, async (req, res) => {
  try{
    const ret = await loginManager.Login(req.login.name, req.login.password);
    if(ret.error) return res.status(400).json(ret);

    console.log(responseManager.sessions);
    return res.json({ success: "Connecté avec : " + req.login.name, token: ret });


  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/register', checkRegisterFormat, async (req, res) => {
  try {
      const ret = await loginManager.Register(req.register.name, req.register.password);
      if (ret.error) {
          return res.status(400).json(ret);
      }
      return res.json({ success: "Inscrit avec : " + req.register.name, token: ret });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/logout', checkLogoutFormat, async (req, res) => {
  try {
      const ret = await loginManager.Logout(req.logout.token);
      return res.json(ret);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Exemple de route protégée
app.get('/game', checkGameFormat, authMiddleware, (req, res) => {
    const playerId = req.playerId;
    const response = req.body;

    responseManager.addResponse(playerId, response);

    res.json({ success: "Bien logged" });
});


// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`\n\n\n\nServeur démarré sur http://localhost:${PORT}\n`);
});
