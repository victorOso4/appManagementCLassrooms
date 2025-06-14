/**
 * Google Sign-In credential response handler
 * Manejador de respuesta de credenciales para inicio de sesión con Google
 * @param {Object} response - Google Sign-In response object
 */
function handleCredentialResponse(response) {
    // Validate credential exists in response
    // Validar que exista la credencial en la respuesta
    if (!response.credential) {
        console.error('No se recibió credential en la respuesta');
        return;
    }

    // Send authentication request to backend
    // Enviar solicitud de autenticación al backend
    fetch('/api/login-google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ credential: response.credential })
    })
    .then(response => {
        // Validate response status
        // Validar estado de la respuesta
        if (!response.ok) {
            throw new Error('Error en la autenticación');
        }
        return response.json();
    })
    .then(data => {
        // Handle successful authentication
        // Manejar autenticación exitosa
        if (data.token) {
            // Store user data in localStorage
            // Almacenar datos del usuario en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Redirect based on user role (1 = admin)
            // Redireccionar según el rol del usuario (1 = admin)
            const redirectUrl = data.user.id_rol === 1 ? '/admin.html' : '/dashboard.html';
            window.location.href = redirectUrl;
        }
    })
    .catch(error => {
        // Handle authentication errors
        // Manejar errores de autenticación
        console.error('Error:', error);
        alert('Error en la autenticación. Por favor intente nuevamente.');
    });
}

document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Previene el envío tradicional del formulario
console.log('Formulario de inicio de sesión enviado');

  const form = e.target;

  // Captura los datos del formulario
  const id_gmail = form.id_gmail.value;
  const password = form.password.value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_gmail, password })
    });

    const result = await response.json();

    if (result.success) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      // Redirigir según el rol
      const redirectUrl = result.user.id_rol === 3 ? '/admin/admin.html' : '/dashboard.html';
      window.location.href = redirectUrl;
      alert('Inicio de sesión exitoso');

    } else {
      alert(result.message || 'Error en el inicio de sesión');
    }

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    alert('Error de red o servidor');
  }
});