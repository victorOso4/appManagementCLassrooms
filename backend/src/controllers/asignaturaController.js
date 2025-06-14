const Asignatura = require('../models/subject');
const Docente = require('../models/teacher');
const Estudiante = require('../models/students');

class AsignaturaController {
  /**
   * Crear una nueva asignatura
   */
  async createAsignatura(req, res) {
    try {
      console.log(req.body);
      
      const { nombre, id_docente, id_estudiante } = req.body;

      if (!nombre || !id_docente || !id_estudiante) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos requeridos (nombre, id_docente, id_estudiante)'
        });
      }

      const asignaturaExistente = await Asignatura.findOne({
        where: {
          nombre,
          id_docente,
          id_estudiante
        }
      });

      if (asignaturaExistente) {
        return res.status(409).json({
          success: false,
          message: 'Ya existe una asignatura registrada para este docente y estudiante'
        });
      }

      const nuevaAsignatura = await Asignatura.create({
        nombre,
        id_docente,
        id_estudiante
      });

      res.status(201).json({
        success: true,
        message: 'Asignatura creada exitosamente',
        data: nuevaAsignatura
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la asignatura',
        error: error.message
      });
    }
  }

  /**
   * Obtener todas las asignaturas
   */
  async getAsignaturas(req, res) {
    try {
      const asignaturas = await Asignatura.findAll({
        include: [
          { model: Docente, as: 'docente', attributes: ['id_docente', 'id_gmail'] },
          { model: Estudiante, as: 'estudiante', attributes: ['id_estudiante', 'id_gmail'] }
        ]
      });

      res.status(200).json({
        success: true,
        data: asignaturas
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener asignaturas',
        error: error.message
      });
    }
  }

  /**
   * Editar una asignatura por ID
   */
  async updateAsignatura(req, res) {
    try {
      const id = req.params.id_asignatura;
      const { nombre, id_docente, id_estudiante } = req.body;

      const asignatura = await Asignatura.findByPk(id);
      if (!asignatura) {
        return res.status(404).json({
          success: false,
          message: 'Asignatura no encontrada'
        });
      }

      // Validar duplicado en nueva combinación
      const asignaturaExistente = await Asignatura.findOne({
        where: {
          nombre,
          id_docente,
          id_estudiante
        }
      });

      if (asignaturaExistente && asignaturaExistente.id_asignatura !== parseInt(id)) {
        return res.status(409).json({
          success: false,
          message: 'Ya existe una asignatura con esos datos'
        });
      }

      await asignatura.update({ nombre, id_docente, id_estudiante });

      res.status(200).json({
        success: true,
        message: 'Asignatura actualizada',
        data: asignatura
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar asignatura',
        error: error.message
      });
    }
  }

  /**
   * Eliminar una asignatura por ID
   */
  async deleteAsignatura(req, res) {
    try {
      const id = req.params.id_asignatura;

      const asignatura = await Asignatura.findByPk(id);
      if (!asignatura) {
        return res.status(404).json({
          success: false,
          message: 'Asignatura no encontrada'
        });
      }

      await asignatura.destroy();

      res.status(200).json({
        success: true,
        message: 'Asignatura eliminada correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar asignatura',
        error: error.message
      });
    }
  }

  /**
   * Obtener docentes y estudiantes para los desplegables
   */
  async getDocentesEstudiantes(req, res) {
    try {
      const [docentesDisponibles, estudiantesDisponibles] = await Promise.all([
        Docente.findAll({ attributes: ['id_docente', 'id_gmail'] }),
        Estudiante.findAll({ attributes: ['id_estudiante', 'id_gmail'] })
      ]);
      res.status(200).json({
        success: true,
        docentes: docentesDisponibles,
        estudiantes: estudiantesDisponibles
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener docentes y estudiantes',
        error: error.message
      });
    }
  }
  
}

module.exports = new AsignaturaController();
