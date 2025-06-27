'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('asignatura', {
      id_asignatura: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      cantidad_estudiantes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      id_docente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'docente', schema: 'proyecto' },
          key: 'id_docente'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_estudiante: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'estudiante', schema: 'proyecto' },
          key: 'id_estudiante'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    }, {
      schema: 'proyecto',
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({ tableName: 'asignatura', schema: 'proyecto' });
  }
};