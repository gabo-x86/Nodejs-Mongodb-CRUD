const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){      //Método de passport q permite saber si hay una sesión
        return next();              //Si hay una sesión→Continuar con la ejecución
    }
    req.flash('err_msg', 'URL no autorizada');
    res.redirect('/users/signin');
}

module.exports = helpers;

