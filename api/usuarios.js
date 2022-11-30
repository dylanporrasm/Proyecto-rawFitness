
const express = require('express');
const router = express.Router();
const Usuario = require('../schemas/usuario.js');
const uploadImage = require('../utils/cloudinary.js');

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

router.put("/modificar", async (req, res) => {
  const usuario = req.body
  try {
    if(req.files?.foto_usuario) {
      const resultado = await uploadImage(req.files.foto_usuario.tempFilePath);
      usuario.foto = {
        public_id: resultado.public_id,
        secure_url: resultado.secure_url
      }
    }

    const usuarioActual= await Usuario.findOneAndUpdate(
      { correo: usuario.correo },
      usuario,
      { new: true }
    )
    return res.json(usuarioActual);
  } catch (error) {
    console.error(error);
    return res.json({ mensaje: 'Error al tratar de actualizar el usuario'});
  }
});

module.exports = router;
