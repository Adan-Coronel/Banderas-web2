fetch('/ranking')
  .then(res => res.json())
  .then(ranking => {
    const ul = document.getElementById('listRanking');
    ranking.forEach((jugador, idx) => {
      const li = document.createElement('li');
      const minutos = Math.floor(jugador.tiempoTotal / 60)
        .toString().padStart(2, '0');
      const segundos = (jugador.tiempoTotal % 60)
        .toString().padStart(2, '0');
      li.textContent = `${idx + 1}. ${jugador.nombre} – ${minutos}:${segundos} – ${jugador.puntaje} pts`;
      ul.appendChild(li);
    });
  })
  .catch(err => {
    console.error('Error cargando ranking:', err);
  });