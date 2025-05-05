import fs from 'fs';
import https from 'https';

function fetchAllCards(url, name) {
    const outputPath = './data/' + name;

    https.get(url, res => {
        let data = '';

        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            try {
                const parsed = JSON.parse(data);
                const cards = parsed.data;

                const stream = fs.createWriteStream(outputPath, { flags: 'a' });

                console.log(`💾 Enregistrement de ${cards.length} cartes en français dans ${outputPath}...\n`);

                stream.write('[\n');

                for (let i = 0; i < cards.length; i++) {
                    const card = cards[i];
                    const line = JSON.stringify(card);
                    stream.write(line);
                
                    if (i < cards.length - 1) {
                        stream.write(',\n');
                    } else {
                        stream.write('\n');
                    }
                }
                
                stream.write(']');

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

function fetchAllCardsFR() {
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?language=fr';
    fetchAllCards(url, 'cardsFR.json');
}

function fetchAllCardsEN() {
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    fetchAllCards(url, 'cardsEN.json');
}



fetchAllCardsFR();
//fetchAllCardsEN();