const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Usuario = sequelize.define('usuario', {

  id_gmail: {
    type: DataTypes.TEXT,
    primaryKey: true,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  apellido: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'usuario',
  schema: 'proyecto',
  timestamps: false,
});

Usuario.associate = (models) => {

  Usuario.belongsTo(models.rol, {
    foreignKey: 'id_rol',
    as: 'rol',
    targetKey: 'id_rol',
  });
  Usuario.hasOne(models.estudiante, {
    foreignKey: 'id_gmail',
    as: 'estudiante',
    sourceKey: 'id_gmail'
  });
  Usuario.hasOne(models.docente, {
    foreignKey: 'id_gmail',
    as: 'docente',
    sourceKey: 'id_gmail'
  });
}

module.exports = Usuario;