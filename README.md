# YugihoAPI

Initialisation du projet:
    -Créer une base de donnée mysql 'YuGiHoAPI'
    -Executer 'node serveur.js'


Fonction de chaque scripts:
-game
    card        : Contient les informations des cartes et gere les activations, effets et autres particularités
    deck        : Gere le fonction d'un deck comme le mélange, piocher, ajout etc... possede aussi un nom
    duel        : Gere tout le fonctionnement autonome d'un duel, il vas faire changer de phase, piocher automatiquement etc ne gere pas les effets de carte
    field       : Gere et contient les emplacements des cartes sur le terrains, les deplacements de cartes lors d'activations, pioches
    lifePoint   : Gere le calcul des lifePoint, les resets et autres fonctionalités precises
    player      : Gere le setup des pv et contient les informations du joueur comme pv, invocations restantes...

Fonctionnement:

Initialisation du duel:

1ere étape
un duel est crée avec un terrain vide et le calcul des lps pret, choix des parametres pour le duel (defaut 8000, 60 cartes dans deck, 15 carte extra deck, 5 emplacement monstre et pieges)

2eme étape
Crée les profiles en leurs donnant un noms et un deck (suystem de login et bibliothèque de deck d'emprunt a faire)

3eme étape
Début du duel en fesant StartDuel(profile1, profile2) pour tout init
créer les joueurs depuis les profiles
init les joueurs en leurs fesant StartDuel du script player (leurs donne les script duel et lifepoint ainsi que set des lp par defauts)
ShowInfos(player) pour afficher les informations d'un joueur (terrain, pv etc)
