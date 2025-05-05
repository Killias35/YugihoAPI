import fs from 'fs';
import https from 'https';


function fetchAllCardsFR() {
    const outputPath = './data/cardsFR.json'
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?language=fr';

    https.get(url, res => {
        let data = '';

        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const parsed = JSON.parse(data);
                const cards = parsed.data;

                const stream = fs.createWriteStream(outputPath, { flags: 'a' });

                console.log(`💾 Enregistrement de ${cards.length} cartes en français dans ${outputPath}...\n`);

                for (const card of cards) {
                    stream.write(JSON.stringify(card) + '\n');
                }

                stream.end(() => {
                    console.log("✅ Sauvegarde terminée !");
                });
            } catch (err) {
                console.error("❌ Erreur lors du parsing JSON :", err);
            }
        });
    }).on('error', err => {
        console.error("❌ Erreur lors de la requête HTTPS :", err);
    });
}


function fetchAllCardsEN() {
    const outputPath = './data/cardsEN.json'
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    https.get(url, res => {
        let data = '';

        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const parsed = JSON.parse(data);
                const cards = parsed.data;

                const stream = fs.createWriteStream(outputPath, { flags: 'a' });

                console.log(`💾 Enregistrement de ${cards.length} cartes en français dans ${outputPath}...\n`);

                for (const card of cards) {
                    stream.write(JSON.stringify(card) + '\n');
                }

                stream.end(() => {
                    console.log("✅ Sauvegarde terminée !");
                });
            } catch (err) {
                console.error("❌ Erreur lors du parsing JSON :", err);
            }
        });
    }).on('error', err => {
        console.error("❌ Erreur lors de la requête HTTPS :", err);
    });
}

//fetchAllCardsFR();
fetchAllCardsEN();