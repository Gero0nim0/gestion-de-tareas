const mongoose = require('mongoose');

const tareasSchema = new mongoose.Schema({
    titulo: { type: String, required: true, },
    descripcion: { type: String, required: true, },
    estado: { type: String, enum:["Pendiente", "En progreso", "Completada"], default: "Pendiente", },
    fechaDeCreacion: {type: Date, deafault:Date.now,},
    fechaLimite: {type:Date,},
});

module.exports = mongoose.model('Tarea', tareasSchema);
