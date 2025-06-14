const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserFactory = require('../utils/userFactory');
const userRepo = require('../repositories/userRepository');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleAuth(req, res) {
  const { credential } = req.body;

  try {
    // Verificar el token con Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    // Buscar si el usuario ya existe
    let user = await userRepo.findUserById(payload.email);

    if (!user) {
      // Si no existe, crear un nuevo usuario
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const userData = {
        id_gmail: payload.email,
        nombre: payload.given_name,
        apellido: payload.family_name,
        id_rol: 2,
        password: hashedPassword
      };

      const newUser = UserFactory.createUser(userData);
      user = await userRepo.createUser(newUser);

      console.log('Nuevo usuario creado:', user.id_gmail);
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

    res.status(200).json({
      token,
      user: {
        id_gmail: user.id_gmail,
        nombre: user.nombre,
        apellido: user.apellido,
        id_rol: user.id_rol
      }
    });

  } catch (error) {
    console.error('Error en autenticación Google:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Error en la autenticación con Google'
    });
  }
}

module.exports = { googleAuth };