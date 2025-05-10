export default function checkRegisterFormat(req, res, next) {
    const registerHeader = req.headers['register'];

    if (!registerHeader) {
        return res.status(400).json({ error: 'Header "register" manquant' });
    }

    let playerregister;
    try {
        playerregister = JSON.parse(registerHeader); // Doit contenir name et password
    } catch (err) {
        return res.status(400).json({ error: 'Header "register" invalide (JSON attendu)' });
    }

    const { name, password } = playerregister;

    // Vérification présence
    if (!name || !password) {
        return res.status(400).json({ error: 'Champs "name" et "password" requis' });
    }

    // Vérification types
    if (typeof name !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ error: '"name" et "password" doivent être des chaînes de caractères' });
    }

    // Vérification longueur
    if (name.length < 3 || name.length > 20) {
        return res.status(400).json({ error: '"name" doit faire entre 3 et 20 caractères' });
    }

    if (password.length < 7 || password.length > 20) {
        return res.status(400).json({ error: '"password" doit faire entre 7 et 20 caractères' });
    }

    // Stocke les infos validées dans req.register pour usage futur
    req.register = { name, password };

    // Passe au middleware ou à la route suivante
    next();
}
