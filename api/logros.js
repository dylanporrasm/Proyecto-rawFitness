
const router = require('express').Router();
const Logro = require('../schemas/logro.js');

router.get('/', async function (_, res) {
    const usuarios =  await Logro.find();
    return res.json(usuarios);
});

module.exports = router;
