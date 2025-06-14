const express = require('express');
const router = express.Router();
const { consultarUbicacionGemini } = require('../controllers/ubicacionController');

router.post('/ubicacion-aula', async (req, res) => {
  try {
    const { pregunta } = req.body;

    if (!pregunta) {
      return res.status(400).json({ error: 'La pregunta es obligatoria' });
    }

    const respuesta = await consultarUbicacionGemini(pregunta);
    res.json({ respuesta });
  } catch (error) {
    console.error('Error con Gemini:', error);
    res.status(500).json({ error: 'Error al consultar Gemini' });
  }
});

module.exports = router;
