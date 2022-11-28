/*var path = require("path"); // Incluyo path en el proyecto
var express = require("express"); // Incluyo express en el proyecto

var app = express(); // Inicializo express
var folder = path.join(__dirname, "public"); // Creo la variable con la carpeta public
app.use(express.static(folder)); // Defino la carpeta public como la base de los archivos del sitio
app.listen(5000); // Levanto el servidor en el puerto 5000*/



//VINCULADO A BASE DE DATOS MONGO
var express = require('express');
var path = require('path');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://DylanPorras:1234@ucenfotec.aok0faj.mongodb.net/Proyecto?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Permite el uso de JSON como parámetros del POST
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', require('./api/usuarios.js'));

app.listen(5000, function() {
  console.log('Servidor corriendo en puerto 5000...')
});