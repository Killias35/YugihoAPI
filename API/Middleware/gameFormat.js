// middleware/auth.js
export default function checkGameFormat(req, res, next) {
    const gameHeader = req.headers['game'];

    if (!gameHeader) {
        return res.status(400).json({ error: 'Header "Game" manquant' });
    }

    let game;
    try {
        game = JSON.parse(gameHeader); // Doit contenir playerId et token
    } catch (err) {
        return res.status(400).json({ error: 'Header "Game" invalide (JSON attendu)' });
    }

    if(!game.action) {
        return res.status(400).json({ error: 'Key "action" manquant' });
    }


    req.game = game;
    // Si tout est bon
    next();
}
