import express from 'express';
const app = express();
const PORT = 8080;

// Middleware pour parser le JSON
app.use(express.json());

// Route GET de test
app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
