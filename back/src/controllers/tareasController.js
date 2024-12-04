const Tarea = require('../models/tareas.js');

// Crear una nueva tarea
exports.crearTarea = async (req, res) => {
    const nuevaTarea = new Tarea(req.body);
    try {
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ message: "Error al crear tarea" });
    }
};

// Editar una tarea
exports.editarTarea = async (req, res) => {
    try {
        const tareaEditada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(tareaEditada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tarea" });
    }
};


// Eliminar una tarea
exports.eliminarTarea = async (req, res) => {
    console.log({req});
    try {
        console.log("req", req.params.id);
        await Tarea.findByIdAndDelete(req.params.id);
        res.json({ message: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tarea" });
    }
};

// Obtener todas las tareas
exports.obtenerTareas = async (req, res) => {
    console.log("Entrega al obtener tareas");
    try {
      const tareas = await Tarea.find();
      console.log("Se cumplio el await de tareas", tareas); // Obtén todas las tareas desde la base de datos.
      res.json(tareas); // Devuelve las tareas como respuesta JSON.
    } catch (error) {
      res.status(500).json({ message: "Error al obtener tareas" });
    }
  };
  

