// Middleware for validating user registration data
// Middleware para validar datos de registro de usuario

const validateRegister = (req, res, next) => {
    // Extract user data from request body
    // Extraer datos del usuario del cuerpo de la solicitud
    const { id_gmail, nombre, apellido, id_rol, password } = req.body;

    // Validate email format
    // Validar formato de correo electrónico
    if (!id_gmail || !id_gmail.includes('@')) {
        return res.status(400).json({ message: 'Email inválido' });
    }

    // Validate name length (minimum 2 characters)
    // Validar longitud del nombre (mínimo 2 caracteres)
    if (!nombre || nombre.trim().length < 2) {
        return res.status(400).json({ message: 'Nombre inválido' });
    }

    // Validate surname length (minimum 2 characters)
    // Validar longitud del apellido (mínimo 2 caracteres)
    if (!apellido || apellido.trim().length < 2) {
        return res.status(400).json({ message: 'Apellido inválido' });
    }

    // Validate role ID (must be 1 or 2)
    // Validar ID de rol (debe ser 1 o 2)
    if (!id_rol || ![1, 2].includes(parseInt(id_rol))) {
        return res.status(400).json({ message: 'Rol inválido' });
    }

    // Validate password length (minimum 6 characters)
    // Validar longitud de contraseña (mínimo 6 caracteres)
    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    next();
};

module.exports = {
    validateRegister
};