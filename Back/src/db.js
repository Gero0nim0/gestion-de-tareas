const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB conectado correctamente.");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1); 
    }
};

module.exports = connectDB;
