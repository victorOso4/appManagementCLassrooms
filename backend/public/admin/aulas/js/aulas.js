function initModule() {
  cargarAsignaturas();
  cargarUbicaciones();
  listarAulas();

  document.getElementById('aulaForm').addEventListener('submit', guardarAula);
}

async function guardarAula(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());

  const method = data.id_aula ? 'PUT' : 'POST';
  const url = data.id_aula ? `/api/aulas/${data.id_aula}` : '/api/aulas';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      alert(`Aula ${data.id_aula ? 'actualizada' : 'creada'} correctamente`);
      form.reset();
      document.getElementById('id_aula').value = '';
      listarAulas();
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    console.error('Error al guardar aula:', error);
    alert('Error al guardar aula');
  }
}

async function listarAulas() {
  try {
    const res = await fetch('/api/aulas');
    const result = await res.json();

    const tbody = document.getElementById('aulasTableBody');
    tbody.innerHTML = '';

    result.data.forEach(aula => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${aula.id_aula}</td>
        <td>${aula.nombre}</td>
        <td>${aula.asignatura?.nombre || 'N/A'}</td>
        <td>${aula.ubicacion?.nombre || 'N/A'}</td>
         <td>${aula.capacidad_foro}</td>
        <td>
          ${aula.codigo_qr 
            ? `<img src="/qrs/${aula.codigo_qr}" alt="QR ${aula.nombre}" width="80">` 
            : 'Sin QR'}
        </td>
        <td>
          <button onclick="editarAula(${aula.id_aula}, '${aula.nombre}', '${aula.id_asignatura}', '${aula.id_ubicacion}', '${aula.capacidad_foro}')">Editar</button>
          <button onclick="eliminarAula(${aula.id_aula})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al listar aulas:', error);
  }
}


function editarAula(id, nombre, id_asignatura, id_ubicacion,capacidad_foro) {
  document.getElementById('id_aula').value = id;
  document.getElementById('nombre').value = nombre;
  document.getElementById('id_asignatura').value = id_asignatura;
  document.getElementById('id_ubicacion').value = id_ubicacion;
  document.getElementById('capacidad_foro').value = capacidad_foro;
  document.getElementById('formTitle').textContent = 'Editar Aula';
}

async function eliminarAula(id) {
  if (!confirm('¿Estás seguro de eliminar esta aula?')) return;

  try {
    const res = await fetch(`/api/aulas/${id}`, { method: 'DELETE' });
    const result = await res.json();

    if (result.success) {
      alert('Aula eliminada correctamente');
      listarAulas();
    } else {
      alert('Error al eliminar: ' + result.message);
    }
  } catch (error) {
    console.error('Error al eliminar aula:', error);
  }
}

async function cargarAsignaturas() {
  try {
    const res = await fetch('/api/asignaturas');
    const result = await res.json();
    const select = document.getElementById('id_asignatura');
    select.innerHTML = '<option value="">Seleccione una asignatura</option>';

    result.data.forEach(asignatura => {
      const option = document.createElement('option');
      option.value = asignatura.id_asignatura;
      option.textContent = asignatura.nombre;
      
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar asignaturas:', error);
  }
}

async function cargarUbicaciones() {
  try {
    const res = await fetch('/api/ubicacion');
    const result = await res.json();
    const select = document.getElementById('id_ubicacion');
    select.innerHTML = '<option value="">Seleccione una ubicación</option>';

    result.data.forEach(ubicacion => {
      const option = document.createElement('option');
      option.value = ubicacion.id_ubicacion;
      option.textContent = ubicacion.nombre;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar ubicaciones:', error);
  }
}
