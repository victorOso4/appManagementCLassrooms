require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeDatabase } = require('./config/database');
const db = require('./models/index');
const authRoutes = require('./routes/authroutes');
const subjectRoutes = require('./routes/adminRoutes');
const proxyAuth  = require('./middlewares/proxyAuth');
const userRoutes = require('./routes/user.routes');
const ubicacionRoutes = require('./routes/ubicacionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Verificamos la conexión
    await initializeDatabase();
    console.log('✅ Conexión a la base de datos establecida.');

    // configuración de CORS
    app.use(cors({
      origin:['http://localhost:3000', 'http://localhost'],
      credentials: true,
    }));

    // Configuración básica de Express
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/qrs', express.static(path.join(__dirname, 'public', 'qrs')));

    // Rutas básicas
    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/Login.html'));
    });
    app.use('/api', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/ubicacion', ubicacionRoutes);
    app.use('/api', subjectRoutes);


    // Iniciamos el servidor
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al inicializar la aplicación:', error);
    process.exit(1);
  }
}

startServer();