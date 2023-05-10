const gameList = require('../../games.json');

module.exports = (req, res, next) => {
    // pour que gameList soit accessible dans les templates sur TOUTES les pages
    // on ajoute l'array gameList à res.locals
    res.locals.gameList = gameList;

    next();
};