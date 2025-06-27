const Asignatura = require('../models/subject');
const Docente = require('../models/teacher');
const Estudiante = require('../models/students');

class AsignaturaService {
  async crearAsignatura({ nombre, id_docente, id_estudiante, cantidad_estudiantes }) {
    if (!nombre || !id_docente || !id_estudiante) {
      throw new Error('Faltan campos requeridos (nombre, id_docente, id_estudiante)');
    }

    const existente = await Asignatura.findOne({
      where: { nombre, id_docente, id_estudiante }
    });

    if (existente) {
      throw new Error('Ya existe una asignatura registrada para este docente y estudiante');
    }

    return await Asignatura.create({ nombre, id_docente, id_estudiante, cantidad_estudiantes });
  }

  async obtenerTodasAsignaturas() {
    return await Asignatura.findAll({
      include: [
        { model: Docente, as: 'docente', attributes: ['id_docente', 'id_gmail'] },
        { model: Estudiante, as: 'estudiante', attributes: ['id_estudiante', 'id_gmail'] }
      ]
    });
  }

  async actualizarAsignatura(id, { nombre, id_docente, id_estudiante, cantidad_estudiantes }) {
    const asignatura = await Asignatura.findByPk(id);
    if (!asignatura) throw new Error('Asignatura no encontrada');

    const duplicada = await Asignatura.findOne({
      where: { nombre, id_docente, id_estudiante }
    });

    if (duplicada && duplicada.id_asignatura !== parseInt(id)) {
      throw new Error('Ya existe una asignatura con esos datos');
    }

    return await asignatura.update({ nombre, id_docente, id_estudiante, cantidad_estudiantes });
  }

  async eliminarAsignatura(id) {
    const asignatura = await Asignatura.findByPk(id);
    if (!asignatura) throw new Error('Asignatura no encontrada');
    await asignatura.destroy();
  }

  async obtenerDocentesYEstudiantes() {
    const [docentes, estudiantes] = await Promise.all([
      Docente.findAll({ attributes: ['id_docente', 'id_gmail'] }),
      Estudiante.findAll({ attributes: ['id_estudiante', 'id_gmail'] })
    ]);
    return { docentes, estudiantes };
  }
}

module.exports = new AsignaturaService();