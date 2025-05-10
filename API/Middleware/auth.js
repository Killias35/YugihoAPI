// middleware/auth.js
export default function authMiddleware(req, res, next) {

    const { token } = req.game;
    if (token === undefined) {
        return res.status(400).json({ error: 'Key "token" not found' });
    }

    // Exemple : suppose que `responseManager` contient les sessions
    const playerId = responseManager.getPlayerIdFromToken(token);
    if (!playerId) {
        return res.status(403).json({ error: 'Session invalide ou expirée' });
    }

    req.playerId = playerId;
    next();
}
