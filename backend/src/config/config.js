/**
 * Database configuration for different environments
 * Configuración de la base de datos para diferentes entornos
 */
require('dotenv').config();

module.exports = {
    // Development environment configuration
    // Configuración del entorno de desarrollo
    development: {
        username : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        host     : process.env.DB_HOST,
        dialect  : 'postgres',
        migrationStorageTableSchema: 'public', // Importante: usar schema public para las migraciones
        seederStorageTableSchema: 'public'  
    },
    
    // Test environment configuration
    // Configuración del entorno de pruebas
    test: {
        username : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        host     : process.env.DB_HOST,
        dialect  : 'postgres',
        schema   : 'proyecto'
    },
    
    // Production environment configuration
    // Configuración del entorno de producción
    production: {
        username : process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        host     : process.env.DB_HOST,
        dialect  : 'postgres',
        schema   : 'proyecto'
    }
};