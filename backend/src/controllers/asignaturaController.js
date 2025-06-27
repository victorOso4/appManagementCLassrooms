const asignaturaService = require('../services/asignaturaService');

class AsignaturaController {
  async createAsignatura(req, res) {
    try {
      const data = await asignaturaService.crearAsignatura(req.body);
      res.status(201).json({ success: true, message: 'Asignatura creada exitosamente', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAsignaturas(req, res) {
    try {
      const data = await asignaturaService.obtenerTodasAsignaturas();
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateAsignatura(req, res) {
    try {
      const id = req.params.id_asignatura;
      const data = await asignaturaService.actualizarAsignatura(id, req.body);
      res.status(200).json({ success: true, message: 'Asignatura actualizada', data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async deleteAsignatura(req, res) {
    try {
      await asignaturaService.eliminarAsignatura(req.params.id_asignatura);
      res.status(200).json({ success: true, message: 'Asignatura eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getDocentesEstudiantes(req, res) {
    try {
      const data = await asignaturaService.obtenerDocentesYEstudiantes();
      res.status(200).json({ success: true, ...data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new AsignaturaController();
