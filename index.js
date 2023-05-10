const express = require('express');
const error404mw = require('./app/middlewares/error404');
const gameListMw = require('./app/middlewares/gameList');
// on récupère le module "router"
// avec toutes les routes déclarées dans router.js
const gameHubRouter = require('./app/router');

const PORT = 8989;

// on créer l'instance du serveur
const app = express();

// pour gérer le corps des requetes POST
app.use(express.urlencoded({extended: true}));

// choisir le moteur de vues
app.set('view engine', 'ejs');
// choisir le dossier des vues
app.set('views', './app/views');
// choisir le dossier statique
// utilisation du middleware "static" (natif à express)
app.use(express.static('./public'));

// on a besoin de passer gameList à res.locals AVANT d'arriver aux routes
app.use(gameListMw);

// à l'endroit où on gérait nos routes, on appelle le middleware "gameHubRouter"
app.use(gameHubRouter);

// mw404 APRES le routeur
app.use(error404mw);

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});