const aulaService = require('../services/aulaService');

class AulaController {
  async createAula(req, res) {
    try {
      const aula = await aulaService.createAula(req.body);
      res.status(201).json({ success: true, message: 'Aula creada correctamente', data: aula });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getAulas(req, res) {
    try {
      const aulas = await aulaService.getAulas();
      res.status(200).json({ success: true, data: aulas });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async updateAula(req, res) {
    try {
      const aula = await aulaService.updateAula(req.params.id_aula, req.body);
      res.status(200).json({ success: true, message: 'Aula actualizada', data: aula });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteAula(req, res) {
    try {
      await aulaService.deleteAula(req.params.id_aula);
      res.status(200).json({ success: true, message: 'Aula eliminada correctamente' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getUbicaciones(req, res) {
    try {
      const ubicaciones = await aulaService.getUbicaciones();
      res.status(200).json({ success: true, data: ubicaciones });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  async getCuposDisponibles(req, res) {
    try {
      const cupoDiponibles = await aulaService.getCuposDisponibles(req.params.id_aula);
      res.status(200).json({ success: true, data: cupoDiponibles });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new AulaController();
