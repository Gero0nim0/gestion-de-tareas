const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController.js');

router.get('/', usuariosController.list)
router.post('/', usuariosController.register);
router.post('/id', usuariosController.login);

module.exports = router;