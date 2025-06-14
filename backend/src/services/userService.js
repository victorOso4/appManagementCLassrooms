const Usuario = require('../models/user');
const Docente = require('../models/teacher');
const Estudiante = require('../models/students');


class UserService {
  async registerUser(userData) {
    const transaction = await Usuario.sequelize.transaction();

    try {
      // Validar si ya existe un usuario con ese correo
      const existingUser = await Usuario.findOne({
        where: { id_gmail: userData.id_gmail }
      });

      if (existingUser) {
        throw new Error('El correo electrónico ya está registrado');
      }

      // Crear el usuario
      const newUser = await Usuario.create(userData, { transaction });

      // Insertar en la tabla correspondiente según el rol
      switch (userData.id_rol) {
        case 1: // Estudiante
          await Estudiante.create(
            { id_gmail: userData.id_gmail },
            { transaction }
          );
          break;
        case 2: // Docente
          await Docente.create(
            { id_gmail: userData.id_gmail },
            { transaction }
          );
          break;
        case 3: // Administrador
          // No se crea en otra tabla
          break;
        default:
          throw new Error('Rol no válido');
      }

      await transaction.commit();
      return newUser;

    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}


module.exports = new UserService();