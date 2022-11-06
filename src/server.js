const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');//Motor de plantillas
const logger = require('morgan');


//Initializations
const app = express();



//Settings (Config de modulos)
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views')); //Esto para cambiar la ruta de las vistas que node renderizará
app.engine('.hbs', exphbs.engine({ //Config de motor de plantillas(vistas)
    defaultLayout: 'main', //Definimos plantilla principal
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

//Global variables



//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'))


//Static files
//Son archivos públicos que son accesibles desde cualquier lado
app.use(express.static(path.join(__dirname, 'public')))//definimos ruta de los archivos estaticos


module.exports = app;