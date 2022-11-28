var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


var Peso = require('../schemas/peso.js');

router.get('/:correo', async function(req, res) {
    const {correo}= req.params
    const pesos= await Peso.find({correo}).exec()
    return res.json(pesos);
});

module.exports=router;