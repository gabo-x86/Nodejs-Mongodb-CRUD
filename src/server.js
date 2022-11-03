const express = require('express');
const path = require('path');
//Initializations

const app = express();

//Settings (Config de modulos)
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));//Esto para cambiar la ruta de las vistas que node renderizará

//Middlewares (Funciones que se ejecutan antes de que se procese la petición)
app.use(express.urlencoded({extended: false}));//Permite convertir json a obj js


//Global variables


//Routes
app.get('/', (req, res)=>{
    res.send(`Hello world!`);
})

//Static files
//Son archivos públicos que son accesibles desde cualquier lado
app.use(express.static(path.join(__dirname, 'public')))//definimos ruta de los archivos estaticos


module.exports = app;