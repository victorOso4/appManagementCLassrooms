const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Estudiante = sequelize.define('estudiante', {

    id_estudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_gmail: {
        type: DataTypes.TEXT,
        unique: true,
    }
}, {
    tableName: 'estudiante',
    schema: 'proyecto',
    timestamps: false,
});

Estudiante.associate = (models) => {

    Estudiante.belongsTo(models.usuario, {
        foreignKey : 'id_gmail',
        as         : 'usuario',
        targetKey  : 'id_gmail'
    });
    Estudiante.hasMany(models.asignatura, {
        foreignKey : 'id_estudiante',
        as         : 'asignaturas',
        sourceKey  : 'id_estudiante'
    });
};

module.exports = Estudiante;
