const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');//Motor de plantillas
const logger = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');


//Initializations
const app = express();



//Settings (Config de modulos)
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views')); //Esto para cambiar la ruta de las vistas que node renderizará
app.engine('.hbs', exphbs.engine({              //Config de motor de plantillas(vistas)
    defaultLayout: 'main',                      //Definimos plantilla principal
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', //Def extensión de archivos
}))
app.set('view engine', '.hbs');// Decir a node qué motor de plantillas usar
/**
 * NOTA:
 * express-handlebars separa las plantillas en dos:
 *      layouts.-  Plantillas con código común en todas las plantillas
 *      partials.- Pedazos html reutilizables 
 */



//Middlewares (Funciones que se ejecutan antes de que se procese la petición)
app.use(express.urlencoded({extended: false}));//Permite convertir json a obj js
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'palabrasupersecreta',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

//Global variables
//Variable global q permite compartir los mensajes generados con flash → req.flash('success_msg')
app.use((req, res, next) => {                          //Config de middleware propio
    res.locals.success_msg = req.flash('success_msg'); //Config variable global
    next();                                            //Importante para que continúe con la ejecución de abajo
})


//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));


//Static files
//Son archivos públicos que son accesibles desde cualquier lado
app.use(express.static(path.join(__dirname, 'public')))//definimos ruta de los archivos estaticos


module.exports = app;