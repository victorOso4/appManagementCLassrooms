const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Asignatura = sequelize.define('asignatura', {

    id_asignatura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_docente: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [6],
        },
    },
}, {
    tableName: 'asignatura',
    schema: 'proyecto',
    timestamps: false,
});

Asignatura.associate = (models) => {

    Asignatura.belongsTo(models.estudiante,{
        foreignKey : 'id_estudiante',
        as         : 'estudiante',
        targetKey  : 'id_estudiante'
    });
    Asignatura.belongsTo(models.docente, {
        foreignKey : 'id_docente',
        as         : 'docente',
        targetKey  : 'id_docente'
    });
    Asignatura.hasMany(models.aula, {
        foreignKey : 'id_asignatura',
        as         : 'aulas',
        sourceKey  : 'id_asignatura'
    });
};

module.exports = Asignatura;