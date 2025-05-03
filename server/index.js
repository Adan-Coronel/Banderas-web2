const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require(`path`)
const fs = require(`fs`)

app.use(express.static('public'));
app.use(express.json());

const RANKING = path.join(__dirname, `ranking.json`)
let resultados
if (fs.existsSync(RANKING)) {
  const contenido = fs.readFileSync(RANKING, `utf-8`)
  resultados = JSON.parse(contenido)
} else {
  resultados = []
  fs.writeFileSync(RANKING, JSON.stringify(resultados, null, 2))
}

app.post('/guardar-resultado', (req, res) => {
  const resultado = req.body
  resultados.push(resultado)
  try {
    fs.writeFileSync(
      RANKING,
      JSON.stringify(resultados, null, 2),
      'utf-8')
    res.json({ success: true })
  }
  catch (error) {
    console.error('Error guardando ranking:', err);
    +    res.status(500).json({
      success: false, error: 'No se pudo guardar'
    })
  }
})

app.get('/ranking', (req, res) => {
  const top20 = resultados
    .sort((a, b) => {
      if (b.puntaje !== a.puntaje) return b.puntaje - a.puntaje
      if (b.correctas !== a.correctas) return b.correctas - a.correctas
      return a.tiempoTotal - b.tiempoTotal
    })
    .slice(0, 20)

  res.json(top20)
});

app.listen(PORT, () => {
  console.log(`url del servidor http://localhost:${PORT}`);
});
