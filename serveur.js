import express from 'express';
import rateLimit from 'express-rate-limit';

import authMiddleware from './API/Middleware/auth.js';
import checkGameFormat from './API/Middleware/gameFormat.js';
import checkRegisterFormat from './API/Middleware/registerFormat.js';
import checkLoginFormat from './API/Middleware/loginFormat.js';

import ResponseManager from './API/responseManager.js';
import Database from './Database/dataAcess.js';
import LoginManager from './API/loginManager.js';

const app = express();
const PORT = 8080;

const responseManager = new ResponseManager();
const database = new Database();
const loginManager = new LoginManager(database, responseManager);


app.locals.loginManager = loginManager;
app.locals.responseManager = responseManager;


const playerLimiter = rateLimit({
  windowMs: 1000,      // Fenêtre de 1 seconde
  max: 2,              // 2 requêtes maximum par fenêtre
  keyGenerator: (req) => {
    // On identifie chaque joueur avec son token (ou son IP si pas encore loggué)
    try {
      const login = JSON.parse(req.headers['login']);
      return login.token || req.ip;
    } catch {
      return req.ip;
    }
  },
  handler: (req, res) => {
    return res.status(429).json({ error: 'Trop de requêtes, ralentis !' });
  }
});


// Middleware pour parser le JSON
app.use(express.json());
app.use(playerLimiter);

app.get('/login', checkLoginFormat, async (req, res) => {
  try{
    const ret = await loginManager.Login(req.login.name, req.login.password);
    if(ret.error) return res.status(400).json(ret);

    console.log(req.login.name + " est connecté");
    return res.json(ret);

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
      console.log(req.register.name + " est inscrit");
      return res.json(ret);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/logout', authMiddleware, async (req, res) => {
  try {
      const ret = await loginManager.Logout(req.token.token);
      return res.json(ret);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Exemple de route protégée
app.get('/game', checkGameFormat, authMiddleware, (req, res) => {
    const playerId = req.playerId;
    const response = req.game.action;

    responseManager.addResponse(playerId, response);

    res.json({ success: "Bien logged" });
});


// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`\n\n\n\nServeur démarré sur http://localhost:${PORT}\n`);
});
