const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');

router.post('/', tareasController.crearTarea);
router.put('/:id', tareasController.editarTarea);
router.delete('/:id', tareasController.eliminarTarea);
router.get('/', tareasController.obtenerTareas); // Nueva ruta para obtener todas las tareas.

module.exports = router;
