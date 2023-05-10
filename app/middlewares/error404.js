module.exports = (req, res, next) => {
    // il est important d'informer le client que la requete a échoué grace au code de statut HTTP.
    // 200 => OK, 3xx => Redirections, 4xx => err requete, 5xx => err serveur
    // on utilise la méthode status() de la réponse pour indiquer le code HTTP
    // (par défaut, le code de statut HTTP est 200)
    // on peut enchainer l'appel à res.status() et à res.render() en une seule ligne :
    res.status(404).render('error404');

    next();
};