// ce fichier est un module qui contient la déclaration des routes de l'application
const express = require('express');
// on exportera cette constante pour permettre à index.js d'utiliser ce router
// à ce stade il ne gère aucune route, on va les déclarer avec .get() .post() plus bas
const router = express.Router();

// on récupère les données dpuis le fichier games.json
// ici on récupère un array qui contient des objets
const gameList = require('../games.json');

router.get('/', (req, res) => {
    // plus besoin de passer gameList au template avec l'objet en 2e argument, puisqu'il est désormais passé à res.locals via le mw gameListMw
    res.render('index');
});

router.get('/game/:gameName', (req, res, next) => {
    const templateName = req.params.gameName;

    // il faut passer l'objet qui représente le jeu courant, pour déterminer coté template le fichier css à utilier, le nom du jeu à afficher dans le <title>, etc
    // récupérer l'objet du jeu courant : 
    // find permet de récupérer le premier élément d'un array qui correspond à la fonction de recherche qu'on lui fournit
    const currentGame = gameList.find((oneGame) => {
        // si la fonction de recherche renvoie true, find() renvoie l'élément courant
        return oneGame.name === req.params.gameName;
    });

    // si aucun jeu de la liste ne correspond au paramètre gameName dans l'url,
    // alors le find au dessus n'a rien renvoyé => currentGame est undefined
    // on fait le test d'existence d'une valeur pour currentGame
    if (currentGame) {
        res.render(templateName, { currentGame });
    } else {
        next();        
    }
});

// on récupère et on traite la soumission du formulaire de recherche
router.get("/search", (req, res, next) => {
    // exo1 : console.log du terme recherché
    // ajout :
    // récupérer depuis gameList les jeux dont le "title" contient le terme de recherche
    // la méthode filter renvoie un array qui contient le ou les éléments d'un array pour le ou lesquels la fonction de recherche a renvoyé true (= comme find() mais peut renvoyer plusieurs éléments)
    const searchResults = gameList.filter((oneGame) => {
        // retourne "true" si la string oneGame.title contient la valeur de req.query.search
        return oneGame.title.includes(req.query.search);
    });

    res.render('searchResults', { searchString: req.query.search, searchResults });
});

// affichage du formulaire de connexion
router.get('/signin', (req, res, next) => {
    res.render('signIn');
});

// traitement de la soumission du formulaire de connexion
router.post('/signin-action', (req, res, next) => {
    console.log('coucou', req.body);
    res.send('connexion..');
});

// on exporte le routeur qui contient maintenant toutes les routes déclarées au dessus
module.exports = router;