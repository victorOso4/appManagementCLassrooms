'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {
      id_gmail: {
        type: Sequelize.TEXT,
        primaryKey: true
      },
      id_rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'rol', schema: 'proyecto' },
          key: 'id_rol'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      nombre: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      apellido: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    }, {
      schema: 'proyecto',
      timestamps: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable({ tableName: 'usuario', schema: 'proyecto' });
  }
};
