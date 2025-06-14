const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Rol = sequelize.define('rol', {
    id_rol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            len: [4],
        },
    },
}, {
    tableName: 'rol',
    schema: 'proyecto',
    timestamps: false,
});

Rol.associate = (models) => {

    Rol.hasMany(models.usuario, {
        foreignKey : 'id_rol',
        as         : 'usuarios',
        sourceKey  : 'id_rol'
    });
};

module.exports = Rol;
