const connectDB = require('./src/db');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

dotenv.config();

// Middleware
app.use(express.json()); // Para parsear JSON en las solicitudes
const corsOptions = {
   origin: '*', // Reemplaza con el dominio que quieres permitir
   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
   allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], // Headers permitidos

 }; 
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors(corsOptions)); // Para permitir acceso desde el frontend
// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(error => console.error('Error al conectar a MongoDB:', error));

// Rutas
app.use('/api/tareas', require('./src/routes/tareasRoutes')); // Rutas para las tareas
app.use('/api/usuarios', require('./src/routes/usuariosRoutes')); // Rutas para los usuarios

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
