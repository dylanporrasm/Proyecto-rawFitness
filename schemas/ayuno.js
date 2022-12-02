var mongoose = require('mongoose'); //Se llama la libreria Mongoose

var ayunoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  correo: String,
  tipo: String,
  horaInicio: String,
  horaFinal: String,
  fecha: Date

});

module.exports = mongoose.model('Ayuno', ayunoSchema, 'Ayunos');