require('dotenv').config();
const { consultarUbicacionGemini } = require('./controllers/ubicacionController');

consultarUbicacionGemini("¿Dónde queda la sala J?")
  .then(res => console.log("✅ Respuesta de Gemini:", res))
  .catch(err => console.error("❌ Error:", err));
