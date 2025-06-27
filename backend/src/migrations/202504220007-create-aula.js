'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('aula', {
      id_aula: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      id_ubicacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'ubicacion', schema: 'proyecto' },
          key: 'id_ubicacion'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_asignatura: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: 'asignatura', schema: 'proyecto' },
          key: 'id_asignatura'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      codigo_qr: {
        type: Sequelize.TEXT, 
        allowNull: true 
      },
      capacidad_foro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0 
      }
    }, {
      schema: 'proyecto',
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable({ tableName: 'aula', schema: 'proyecto' });
  }
};
