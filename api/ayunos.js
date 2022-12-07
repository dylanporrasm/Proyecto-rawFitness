const express = require('express');
const router = express.Router();
const Ayuno = require('../schemas/ayuno.js');

router.get('/', async function (_, res) {
    const Ayunos = await Ayuno.find().exec();
    return res.json(Ayunos);
});






router.get('/:correo', async function (req, res) {
  const { correo } = req.params;
  const ayuno = await Ayuno.findOne({ correo });
  if (!ayuno) return res.json({ mensaje: 'Ayuno no encontrado en la base de datos.'});
  return res.json(ayuno);
})


router.put("/modificar", async (req, res) => {
  const ayuno = req.body
    const ayunoActual= await ayuno.findOneAndUpdate(
      { correo: ayuno.correo },
      ayuno,
      { new: true }
    )
    return res.json(ayunoActual);
  
});

module.exports = router;
