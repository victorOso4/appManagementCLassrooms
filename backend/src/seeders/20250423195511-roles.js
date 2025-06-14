'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      { tableName: 'rol', schema: 'proyecto' },
      [
        {
          id_rol: 1,
          descripcion: 'Estudiante'
        },
        {
          id_rol: 2,
          descripcion: 'Docente'
        },
        {
          id_rol: 3,
          descripcion: 'Administrador'
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      { tableName: 'rol', schema: 'proyecto' },
      null,
      {}
    );
  }
};