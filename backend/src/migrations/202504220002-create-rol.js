'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rol', {
      id_rol: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, Infinity]
        }
      }
    }, { 
      schema: 'proyecto',
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({ tableName: 'rol', schema: 'proyecto' });
  }
};