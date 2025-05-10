// middleware/auth.js
export default function checkLogoutFormat(req, res, next) {
    const logoutHeader = req.headers['logout'];

    if (!logoutHeader) {
        return res.status(400).json({ error: 'Header "logout" manquant' });
    }

    let logout;
    try {
        logout = JSON.parse(logoutHeader); // Doit contenir playerId et token
    } catch (err) {
        return res.status(400).json({ error: 'Header "logout" invalide (JSON attendu)' });
    }

    if(!logout.token) {
        return res.status(400).json({ error: 'Key "token" manquant' });
    }

    req.logout = logout;
    // Si tout est bon
    next();
}
