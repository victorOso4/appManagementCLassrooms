/**
 * Authentication Controller
 * Controlador de Autenticación
 * Handles user authentication, registration and token verification
 * Maneja autenticación de usuarios, registro y verificación de tokens
 */

const { googleAuth } = require('../services/googleAuthService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserFactory = require('../utils/userFactory');
const userRepo = require('../repositories/userRepository');

// Autenticación con Google
exports.loginWithGoogle = googleAuth;

/**
 * Normal login with email and password
 * Login normal con email y contraseña
 */
exports.login = async (req, res) => {
  try {
    const { id_gmail, password } = req.body;

    // Verificar si el usuario existe
    const user = await userRepo.findUserById(id_gmail);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña incorrecta'
      });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id_gmail: user.id_gmail,
        id_rol: user.id_rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar respuesta
    res.status(200).json({
      success: true,
      token,
      user: {
        id_gmail: user.id_gmail,
        nombre: user.nombre,
        apellido: user.apellido,
        id_rol: user.id_rol
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

/**
 * User registration handler
 * Manejador de registro de usuarios
 */
exports.register = async (req, res) => {
  try {
    const { id_gmail, nombre, apellido, password, id_rol } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await userRepo.findUserById(id_gmail);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario usando Factory
    const userData = {
      id_gmail,
      nombre,
      apellido,
      password: hashedPassword,
      id_rol: id_rol || 2
    };

    const newUser = UserFactory.createUser(userData);
    const savedUser = await userRepo.createUser(newUser);

    // Generar token JWT
    const token = jwt.sign(
      {
        id_gmail: savedUser.id_gmail,
        id_rol: savedUser.id_rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      token,
      user: {
        id_gmail: savedUser.id_gmail,
        nombre: savedUser.nombre,
        apellido: savedUser.apellido,
        id_rol: savedUser.id_rol
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar usuario'
    });
  }
};

/**
 * JWT Token verification
 * Verificación de token JWT
 */
exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepo.findUserById(decoded.id_gmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id_gmail: user.id_gmail,
        nombre: user.nombre,
        apellido: user.apellido,
        id_rol: user.id_rol
      }
    });

  } catch (error) {
    console.error('Error en verificación de token:', error);
    res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }
};