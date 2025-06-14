/*** Factory Method
 * Encapsula la lógica de creación de objetos de usuario
 * Proporciona una interfaz común para crear objetos
 * Establece vaores por defecto rol_id = 2
 * Se utiliza en authController y googleAuthservice
 */
class UserFactory {
  static createUser( userData ) {
    return {
      id_gmail : userData.id_gmail,
      id_rol   : userData.id_rol || 2,
      nombre   : userData.nombre,
      apellido : userData.apellido,
      password : userData.password
    };
  }
}

module.exports = UserFactory;
