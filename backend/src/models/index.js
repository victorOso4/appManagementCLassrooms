const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');

const models = {};

// Lee todos los archivos .js en el directorio actual
fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== 'index.js' &&
            file.slice(-3) === '.js'
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file));
        models[model.name] = model;
    });

// Establece las asociaciones si existen
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
module.exports = models;