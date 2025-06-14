const Aula = require('../models/classroom');
const Ubicacion = require('../models/location');
const Asignatura = require('../models/subject');

class AulaController {
 async createAula(req, res) {
  try {
    const { nombre, id_asignatura, id_ubicacion } = req.body;

    if (!nombre || !id_asignatura || !id_ubicacion) {
      return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
    }

    // Verificar si ya existe un aula con el mismo nombre, asignatura y ubicación
    const aulaExistente = await Aula.findOne({
      where: {
        nombre,
        id_asignatura,
        id_ubicacion
      }
    });

    if (aulaExistente) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un aula con el mismo nombre, asignatura y ubicación'
      });
    }

    // Crear el aula si no existe
    const nuevaAula = await Aula.create({ nombre, id_asignatura, id_ubicacion });

    res.status(201).json({
      success: true,
      message: 'Aula creada correctamente',
      data: nuevaAula
    });
  } catch (error) {
    console.error('Error al crear aula:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno al crear aula',
      error: error.message
    });
  }
}
  // Listar todas las aulas
  async getAulas(req, res) {
    try {
      const aulas = await Aula.findAll({
        include: [
          { model: Asignatura, as: 'asignatura', attributes: ['id_asignatura', 'nombre'] },
          { model: Ubicacion, as: 'ubicacion', attributes: ['id_ubicacion', 'nombre'] }
        ]
      });

      res.status(200).json({ success: true, data: aulas });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener aulas', error: error.message });
    }
  }

  // Editar aula
  async updateAula(req, res) {
    try {
      const { id_aula } = req.params;
      const { id_asignatura, id_ubicacion, capacidad } = req.body;

      const aula = await Aula.findByPk(id_aula);
      if (!aula) {
        return res.status(404).json({ success: false, message: 'Aula no encontrada' });
      }

      await aula.update({ id_asignatura, id_ubicacion, capacidad });

      res.status(200).json({ success: true, message: 'Aula actualizada', data: aula });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar aula', error: error.message });
    }
  }

  // Eliminar aula
  async deleteAula(req, res) {
    try {
      const { id_aula } = req.params;

      const aula = await Aula.findByPk(id_aula);
      if (!aula) {
        return res.status(404).json({ success: false, message: 'Aula no encontrada' });
      }

      await aula.destroy();

      res.status(200).json({ success: true, message: 'Aula eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar aula', error: error.message });
    }
  }

  // Obtener ubicaciones para el desplegable
  async getUbicaciones(req, res) {
    try {
      const ubicaciones = await Ubicacion.findAll({ attributes: ['id_ubicacion', 'nombre'] });

      res.status(200).json({ success: true, data: ubicaciones });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener ubicaciones', error: error.message });
    }
  }
}

module.exports = new AulaController();
