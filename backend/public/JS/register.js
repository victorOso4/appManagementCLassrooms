/**
 * Register form submission handler
 * Manejador del envío del formulario de registro
 */

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get error message element and hide it initially
    // Obtener el elemento de mensaje de error y ocultarlo inicialmente
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'none';

    // Get password values from form fields
    // Obtener los valores de contraseña de los campos del formulario
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate password match
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Las contraseñas no coinciden';
        errorMessage.style.display = 'block';
        return;
    }

    // Create user data object from form fields
    // Crear objeto con datos del usuario desde los campos del formulario
    const formData = {
        id_gmail: document.getElementById('email').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        id_rol: parseInt(document.getElementById('rol').value),
        password: password
    };

    try {
        // Send POST request to register endpoint
        // Enviar petición POST al endpoint de registro
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        // Handle response based on status
        // Manejar respuesta según el estado
        if (response.ok) {
            alert('Registro exitoso');
            window.location.href = '/login.html';
        } else {
            errorMessage.textContent = data.message;
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        // Handle connection errors
        // Manejar errores de conexión
        console.error('Error:', error);
        errorMessage.textContent = 'Error de conexión';
        errorMessage.style.display = 'block';
    }
});