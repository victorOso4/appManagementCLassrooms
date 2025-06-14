const UserDto = require('../dto/user.dto');

// Middleware for validating user data against DTO schema
// Middleware para validar datos de usuario contra el esquema DTO
const validateRegister = (req, res, next) => {
    try {
        // Validate request body against DTO schema
        // Validar el cuerpo de la solicitud contra el esquema DTO
        const validatedData = UserDto.validate(req.body);
        
        // Replace request body with validated data
        // Reemplazar el cuerpo de la solicitud con los datos validados
        req.body = validatedData;
        next();
    } catch (error) {
        // Return validation error if data doesn't match schema
        // Retornar error de validación si los datos no coinciden con el esquema
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    validateRegister
};