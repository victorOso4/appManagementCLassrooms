'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crear tabla estudiante
    await queryInterface.createTable('estudiante', {
      id_estudiante: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_gmail: {
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
          model: { tableName: 'usuario', schema: 'proyecto' },
          key: 'id_gmail'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    }, {
      schema: 'proyecto',
      timestamps: false
    });

    // Crear tabla docente
    await queryInterface.createTable('docente', {
      id_docente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_gmail: {
        type: Sequelize.TEXT,
        allowNull: false,
        references: {
          model: { tableName: 'usuario', schema: 'proyecto' },
          key: 'id_gmail'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    }, {
      schema: 'proyecto',
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({ tableName: 'docente', schema: 'proyecto' });
    await queryInterface.dropTable({ tableName: 'estudiante', schema: 'proyecto' });
  }
};