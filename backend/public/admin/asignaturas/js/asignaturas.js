
function initModule() {
  cargarOpciones();
  listarAsignaturas();

  document.getElementById('asignaturaForm').addEventListener('submit', guardarAsignatura);
}

async function cargarOpciones() {
  try {
    const res = await fetch('/api/asignaturas/opciones');
    const data = await res.json();

    const docenteSelect = document.getElementById('docente');
    const estudianteSelect = document.getElementById('estudiante');

    data.docentes.forEach(doc => {
      const opt = new Option(doc.id_gmail, doc.id_docente);
      docenteSelect.appendChild(opt);
    });

    data.estudiantes.forEach(est => {
      const opt = new Option(est.id_gmail, est.id_estudiante);
      estudianteSelect.appendChild(opt);
    });
  } catch (error) {
    console.error('Error cargando opciones:', error);
  }
}

async function guardarAsignatura(e) {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());

  const method = data.id_asignatura ? 'PUT' : 'POST';
  const url = data.id_asignatura
    ? `/api/asignaturas/${data.id_asignatura}`
    : '/api/asignaturas';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.success) {
      alert('Asignatura guardada');
      form.reset();
      listarAsignaturas();
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    console.error('Error al guardar asignatura:', error);
  }
}

async function listarAsignaturas() {
  try {
    const res = await fetch('/api/asignaturas');
    const data = await res.json();

    const tbody = document.querySelector('#tablaAsignaturas tbody');
    tbody.innerHTML = '';

    data.data.forEach(asig => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${asig.id_asignatura}</td>
        <td>${asig.nombre}</td>
        <td>${asig.docente?.id_gmail || 'N/A'}</td>
        <td>${asig.estudiante?.id_gmail || 'N/A'}</td>
        <td>
          <button onclick="editarAsignatura(${asig.id_asignatura}, '${asig.nombre}', '${asig.id_docente}', '${asig.id_estudiante}')">Editar</button>
          <button onclick="eliminarAsignatura(${asig.id_asignatura})">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al listar asignaturas:', error);
  }
}


function editarAsignatura(id, nombre, docente, estudiante) {
    document.getElementById('id_asignatura').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('estudiante').value = estudiante;
    document.getElementById('docente').value = docente;
    document.getElementById('formTitle').textContent = 'Editar Asignatura';

}

async function eliminarAsignatura(id) {
  if (!confirm('¿Está seguro de eliminar esta asignatura?')) return;

  try {
    const res = await fetch(`/api/asignaturas/${id}`, { method: 'DELETE' });
    const result = await res.json();

    if (result.success) {
      alert('Asignatura eliminada');
      listarAsignaturas();
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    console.error('Error al eliminar asignatura:', error);
  }
}
