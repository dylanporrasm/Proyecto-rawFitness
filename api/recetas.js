const express = require('express');
const router = express.Router();
const Receta = require('../schemas/receta.js');
const uploadImage = require('../utils/cloudinary.js');

router.get('/', async function (req, res) {
    const recetas = await Receta.find().exec();
    return res.json(recetas);
});
  router.get('/:correo', async function (req, res) {
    const { correo } = req.params;
    const receta = await Receta.findOne({ correo });
    if (!receta) return res.json({ mensaje: 'Receta no encontrada en la base de datos.'});
    return res.json(receta);
  })
  router.put("/modificar", async (req, res) => {
    const receta = req.body
    console.log(req.files);
    try {
      if(req.files?.foto_receta) {
        const resultado = await uploadImage(req.files.foto_receta.tempFilePath);
        receta.foto_receta = {
          public_id: resultado.public_id,
          secure_url: resultado.secure_url
        }
      }
      const recetaActual= await Receta.findOneAndUpdate(
        { correo: receta.correo },
        receta,
        { new: true }
      )
      return res.json(recetaActual);
    } catch (error) {
      console.error(error);
      return res.json({ mensaje: 'Error al tratar de actualizar la receta'});
    }
  });

   module.exports = router;