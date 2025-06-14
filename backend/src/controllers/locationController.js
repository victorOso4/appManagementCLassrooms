const Ubicacion = require('../models/location');

class UbicacionController {
  /**
   * Crear una nueva ubicación
   */
  async createUbicacion(req, res) {
    try {
      console.log(req.body);
      
      const { nombre, descripcion } = req.body;

      if (!nombre) {
        return res.status(400).json({
          success: false,
          message: 'Faltan campos requeridos (nombre)'
        });
      }

    const ubicacionExistente = await Ubicacion.findOne({
        where: {
          nombre
        }
      });

      if (ubicacionExistente) {
        return res.status(409).json({
          success: false,
          message: 'Ya existe una ubicación registrada con ese nombre'
        });
      }

      const nuevaUbicacion = await Ubicacion.create({
        nombre,
        descripcion
      });

      res.status(201).json({
        success: true,
        message: 'Ubicación creada exitosamente',
        data: nuevaUbicacion
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al crear la ubicación',
        error: error.message
      });
    }
  }

  /**
   * Obtener todas las ubicaciones
   */
  async getUbicaciones(req, res) {
    try {
      const ubicaciones = await Ubicacion.findAll();
      res.status(200).json({
        success: true,
        data: ubicaciones
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener ubicaciones',
        error: error.message
      });
    }
  }

  /**
   * Actualizar una ubicación
   */
  async updateUbicacion(req, res) {
    try {
      const { id_ubicacion } = req.params;
      const { nombre, descripcion } = req.body;

      const ubicacion = await Ubicacion.findByPk(id_ubicacion);
      if (!ubicacion) {
        return res.status(404).json({
          success: false,
          message: 'Ubicación no encontrada'
        });
      }

      await ubicacion.update({ nombre, descripcion });

      res.status(200).json({
        success: true,
        message: 'Ubicación actualizada',
        data: ubicacion
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar ubicación',
        error: error.message
      });
    }
  }

  /**
   * Eliminar una ubicación
   */
  async deleteUbicacion(req, res) {
    try {
      const { id_ubicacion } = req.params;

      const ubicacion = await Ubicacion.findByPk(id_ubicacion);
      if (!ubicacion) {
        return res.status(404).json({
          success: false,
          message: 'Ubicación no encontrada'
        });
      }

      await ubicacion.destroy();

      res.status(200).json({
        success: true,
        message: 'Ubicación eliminada correctamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error al eliminar ubicación',
        error: error.message
      });
    }
  }
}

module.exports = new UbicacionController();
