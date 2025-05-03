const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs-extra');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const RANKING_PATH = path.join(__dirname, 'ranking.json');

let resultados = [];
try {
  if (fs.existsSync(RANKING_PATH)) {
    const contenido = fs.readFileSync(RANKING_PATH, 'utf-8');
    resultados = JSON.parse(contenido);
  }
} catch (error) {
  console.error('Error al cargar el ranking:', error);
  resultados = [];
}

app.post('/guardar-resultado', (req, res) => {
  const resultado = req.body;
  resultados.push(resultado);
  
  try {
    fs.writeFileSync(
      RANKING_PATH,
      JSON.stringify(resultados, null, 2),
      'utf-8'
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Error guardando ranking:', error);

    res.json({ success: true, warning: 'Datos guardados solo en memoria' });
  }
});

app.get('/ranking', (req, res) => {
  const top20 = resultados
    .sort((a, b) => {
      if (b.puntaje !== a.puntaje) return b.puntaje - a.puntaje;
      if (b.correctas !== a.correctas) return b.correctas - a.correctas;
      return a.tiempoTotal - b.tiempoTotal;
    })
    .slice(0, 20);

  res.json(top20);
});

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
}

module.exports = app;