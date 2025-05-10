// middleware/auth.js
export default function authMiddleware(req, res, next) {
    const authHeader = req.headers['token'];

    if (!authHeader) {
        return res.status(400).json({ error: 'Header "token" manquant' });
    }

    let auth;
    try {
        auth = JSON.parse(authHeader); // Doit contenir playerId et token
    } catch (err) {
        return res.status(400).json({ error: 'Header "token" invalide (JSON attendu)' });
    }

    if(!auth.token) {
        return res.status(400).json({ error: 'Key "token" manquant' });
    }

    const playerId = req.app.locals.responseManager.getPlayerIdFromToken(auth.token);
    if (!playerId) {
        return res.status(403).json({ error: 'Session invalide ou expirée' });
    }

    req.token = auth;
    // Si tout est bon
    next();
}
