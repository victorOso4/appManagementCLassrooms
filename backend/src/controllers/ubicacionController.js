const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require('dotenv').config();

async function consultarUbicacionGemini(pregunta) {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("API KEY:", apiKey);

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const body = {
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Eres un asistente que responde preguntas sobre la ubicación de aulas en la Universidad de Caldas.

Aquí tienes el mapa base:
- Sala A: Bloque Administrativo, primer piso.
- Sala B: Bloque Administrativo, primer piso.
- Sala C: Bloque Administrativo, segundo piso.
- Sala H1: Bloque Orlando Sierra, tercer piso.
- Sala H2: Bloque Orlando Sierra, tercer piso.
- Sala I: Bloque Orlando Sierra, tercer piso.
- Sala J: Bloque Orlando Sierra, tercer piso.
- Sala M: Bloque Orlando Sierra, tercer piso.
- Aula 218: Bloque Parque, segundo piso.
- Aula 301: Bloque C, tercer piso.

Responde en máximo 2 líneas. Pregunta del estudiante: ${pregunta}`
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("👉 Respuesta de Gemini API:", data);

    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo obtener respuesta';
  } catch (error) {
    console.error("❌ Error en la llamada a Gemini:", error);
    return 'No se pudo obtener respuesta';
  }
}

module.exports = { consultarUbicacionGemini };
