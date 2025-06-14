  cargarUbicaciones();

  document.getElementById('ubicacionForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id_ubicacion').value;
    if (id) {
      await actualizarUbicacion(id);
    } else {
      await crearUbicacion();
    }
  });


async function crearUbicacion() {
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;

  const datos = { nombre, descripcion };

  try {
    const res = await fetch('/api/ubicacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al crear');
    }

    alert('Ubicación creada correctamente');
    document.getElementById('ubicacionForm').reset();
    await cargarUbicaciones();
  } catch (error) {
    console.error('Error al crear ubicación:', error);
    alert('Error al crear ubicación: ' + error.message);
  }
}

async function actualizarUbicacion(id) {
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;

  const datos = { nombre, descripcion };

  try {
    const res = await fetch(`/api/ubicacion/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al actualizar');
    }

    alert('Ubicación actualizada correctamente');
    document.getElementById('ubicacionForm').reset();
    document.getElementById('id_ubicacion').value = '';
    await cargarUbicaciones();
  } catch (error) {
    console.error('Error al actualizar ubicación:', error);
    alert('Error al actualizar ubicación: ' + error.message);
  }
}

async function cargarUbicaciones() {
  try {
    const res = await fetch('/api/ubicacion');
    const result = await res.json();
    const tbody = document.getElementById('ubicacionesTableBody');
    tbody.innerHTML = '';

    result.data.forEach(ubicacion => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${ubicacion.id_ubicacion}</td>
        <td>${ubicacion.nombre}</td>
        <td>${ubicacion.descripcion || ''}</td>
        <td>
          <button onclick="editarUbicacion(${ubicacion.id_ubicacion}, '${ubicacion.nombre}', \`${ubicacion.descripcion || ''}\`)">Editar</button>
          <button onclick="eliminarUbicacion(${ubicacion.id_ubicacion})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al cargar ubicaciones:', error);
  }
}

async function eliminarUbicacion(id) {
  if (!confirm('¿Seguro que deseas eliminar esta ubicación?')) return;

  try {
    const res = await fetch(`/api/ubicacion/${id}`, { method: 'DELETE' });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al eliminar');
    }

    alert('Ubicación eliminada');
    await cargarUbicaciones();
  } catch (error) {
    console.error('Error al eliminar ubicación:', error);
    alert('Error al eliminar ubicación: ' + error.message);
  }
}

function editarUbicacion(id, nombre, descripcion) {
  document.getElementById('id_ubicacion').value = id;
  document.getElementById('nombre').value = nombre;
  document.getElementById('descripcion').value = descripcion;
}