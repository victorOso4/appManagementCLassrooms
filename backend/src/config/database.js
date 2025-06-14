/**
 * Database connection and initialization configuration
 * Configuración de conexión e inicialización de la base de datos
 */
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      schema: 'proyecto'
    },
    logging: false
  }
);

/**
 * Initialize database and create schema if not exists
 * Inicializa la base de datos y crea el schema si no existe
 * @returns {Promise<Sequelize>} Sequelize instance
 */
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    // Crear el schema si no existe
    await sequelize.query('CREATE SCHEMA IF NOT EXISTS proyecto;');
    console.log('✅ Conexión establecida y schema creado correctamente');
    return sequelize;
  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error);
    throw error;
  }
};

module.exports = { 
  sequelize,
  initializeDatabase 
};