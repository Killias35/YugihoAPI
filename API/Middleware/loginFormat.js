export default function checkLoginFormat(req, res, next) {
    const loginHeader = req.headers['login'];

    if (!loginHeader) {
        return res.status(400).json({ error: 'Header "login" manquant' });
    }

    let playerlogin;
    try {
        playerlogin = JSON.parse(loginHeader); // Doit contenir name et password
    } catch (err) {
        return res.status(400).json({ error: 'Header "login" invalide (JSON attendu)' });
    }

    const { name, password } = playerlogin;

    // Vérification présence
    if (!name || !password) {
        return res.status(400).json({ error: 'Champs "name" et "password" requis' });
    }

    // Vérification types
    if (typeof name !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: '"name" et "password" doivent être des chaînes de caractères' });
    }

    // Stocke les infos validées dans req.login pour usage futur
    req.login = { name, password };

    // Passe au middleware ou à la route suivante
    next();
}
