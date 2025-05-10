import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';

import authMiddleware from './API/Middleware/auth.js';
import checkRegisterFormat from './API/Middleware/registerFormat.js';
import checkLoginFormat from './API/Middleware/loginFormat.js';

import ResponseManager from './API/responseManager.js';
import Database from './Database/dataAcess.js';
import LoginManager from './API/loginManager.js';

const app = express();
const server = http.createServer(app); // Important: socket.io a besoin du serveur brut
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const PORT = 8080;

const database = new Database();
const responseManager = new ResponseManager(database);
const loginManager = new LoginManager(database, responseManager);

app.locals.loginManager = loginManager;
app.locals.responseManager = responseManager;

const playerLimiter = rateLimit({
  windowMs: 1000,
  max: 2,
  keyGenerator: (req) => {
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

app.use(express.json());
app.use(playerLimiter);

app.get('/login', checkLoginFormat, async (req, res) => {
  try {
    const ret = await loginManager.Login(req.login.name, req.login.password);
    if (ret.error) return res.status(400).json(ret);

    console.log(req.login.name + " est connecté");
    return res.json(ret);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

app.get('/register', checkRegisterFormat, async (req, res) => {
  try {
    const ret = await loginManager.Register(req.register.name, req.register.password);
    if (ret.error) return res.status(400).json(ret);

    console.log(req.register.name + " est inscrit");
    return res.json(ret);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

// ----------- WebSocket AUTH + EVENTS -----------
io.use(async (socket, next) => {    // lu une fois a l'init de la co
  const token = socket.handshake.auth?.token;

  if (!token || token === undefined) {
    return next(new Error('Token manquant'));
  }
  console.log(`📡 tentative de connexion via WS : ${token}\n\n`);
  const playerId = await responseManager.getPlayerIdFromToken(token);
  if (!playerId) {
    return next(new Error('Token invalide'));
  }

  socket.playerId = playerId;
  socket.token = token;
  next();
});

io.on('connection', (socket) => {
  console.log(`📡 Joueur connecté via WS : ${socket.playerId}`);

  socket.on('gameAction', async (action) => {
    // verif du token encore valide
    if (responseManager.getTokenFromPlayerId(socket.playerId) !== socket.token) {
      console.log(`❌ Action reçue par un joueur non autorisé : ${socket.playerId}`);
      return disconnectSocket(socket);
    };


    console.log(`📥 Action reçue du joueur ${socket.playerId} : ${action}`);
    responseManager.addResponse(socket.playerId, action);
    socket.emit('gameResponse', { success: true });
  });

  socket.on('disconnect', () => {
    return disconnectSocket(socket);
  });
});

// ----------- Start Server -----------
server.listen(PORT, () => {
  console.log(`\nServeur HTTP + WebSocket lancé sur http://localhost:${PORT}`);
});


function disconnectSocket(socket) {
  console.log(`❌ Déconnexion du joueur ${socket.playerId}`);
  try {
    loginManager.Logout(socket.token).then((ret) => {
      socket.emit('gameResponse', ret);
    })
  } catch (err) {
    console.error(err);
    socket.emit('gameResponse', { error: 'Erreur serveur' });
  }
}