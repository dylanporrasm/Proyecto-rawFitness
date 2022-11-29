
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();




var Usuario = require('../schemas/usuario.js');
const { uploadImage } = require('../utils/cloudinary.js');

router.get('/', async function (req, res) {
    const usuarios = await Usuario.find().exec();
    return res.json(usuarios);
});

  router.post('/buscar', function(req, res) {
    var idUsuario = req.body.idUsuario;
    Usuario.findById(idUsuario).exec()
      .then(
        function(result) {
          res.json(result);
        }
      );
  });
  
  router.get('/buscar-por/:correo', async (req, res) => {
    const { correo } = req.params;
    const mensajeError = `Usuario${correo ? ' con correo ' + correo : ''} no encontrado en la base de datos`
    try {
      const usuario = await Usuario.findOne({ correo }).exec();
      if (!usuario) return res.json({ mensaje: mensajeError })
      return res.json(usuario);
    } catch (error) {
      console.error(error);
      return res.json({ mensaje: mensajeError })
    }
  })



  router.post('/insertar', async function (req, res) {

    const usuarioNuevo = new  Usuario(
      {
      _id: new mongoose.Types.ObjectId(),
      foto: req.body.foto,
      nombre: req.body.nombre,
      apellidos:req.body.apellidos,
      nacimiento:req.body.nacimiento,
      genero:req.body.genero,
      peso:req.body.peso,
      altura:req.body.altura
    
    });


    //AGREGANDO FOTO DE USUARIO
    if(req.files?.image){
      const resultado= await uploadImage(req.files.image.tempFilePath)
      usuarioNuevo.imagen={
        public_id: resultado.public_id,
        secure_url: resultado.secure_url
      }

    }
    
  
    usuarioNuevo.save()
      .then(
        function(result) {
          res.json(result);
        }
      );
  });


  router.put("/modificar", async (req, res) => {
    const usuario=req.body
    const usuarioActual= await Usuario.findOneAndUpdate(
      {correo:usuario.correo}, 
      usuario, 
      {new:true}
    )
    return res.json(usuarioActual);
  })
  
  module.exports = router;
