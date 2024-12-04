const Usuario = require('../models/usuarios'); // Importar el modelo
const bcrypt = require('bcrypt');

// Registro de usuario
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verifica si el usuario ya existe
        const userExists = await Usuario.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea un nuevo usuario
        const newUser = new Usuario({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

// Ruta para iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca al usuario en la base de datos
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

exports.list = async (req, res) => {

    try {
        // Busca al usuario en la base de datos
        const user = await Usuario.find();
        

        

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
}