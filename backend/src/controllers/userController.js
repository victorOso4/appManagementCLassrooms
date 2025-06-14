/**
 * User Controller
 * Controlador de Usuarios
 * Handles user-related operations
 * Maneja operaciones relacionadas con usuarios
 */

const bcrypt = require('bcryptjs');
const userService = require('../services/userService');

class UserController {
    /**
     * Register new user
     * Registrar nuevo usuario
     * @param {Request} req - Express request object
     * @param {Response} res - Express response object
     */
    async register(req, res) {
        try {
            const userData = {
                ...req.body,
                password: await bcrypt.hash(req.body.password, 10)
            };

            const newUser = await userService.registerUser(userData);
            
            res.status(201).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                data: {
                    id_gmail: newUser.id_gmail,
                    nombre: newUser.nombre,
                    apellido: newUser.apellido,
                    id_rol: newUser.id_rol
                }
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new UserController();