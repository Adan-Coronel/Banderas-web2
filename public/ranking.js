document.addEventListener('DOMContentLoaded', function() {
  const elementoCargando = document.getElementById('cargando');
  const elementoLista = document.getElementById('lista');
  const elementoUl = document.getElementById('listRanking');
  const botonJugar = document.getElementById('jugarOtraVez');
  const botonInicio = document.getElementById('inicio');
  elementoLista.style.display = 'none';
  fetch('/ranking')
  .then(res => res.json())
  .then(ranking => {
    elementoCargando.style.display = 'none';
    elementoLista.style.display = 'block';
    elementoUl.innerHTML = '';
 


    ranking.forEach((jugador, idx) => {
      const li = document.createElement('li');
      const minutos = Math.floor(jugador.tiempoTotal / 60)
        .toString().padStart(2, '0');
      const segundos = (jugador.tiempoTotal % 60)
        .toString().padStart(2, '0');


        const spanPos = document.createElement('span');
        spanPos.className = 'posicion';
        spanPos.textContent = `${idx + 1}`;
        
        const spanNombre = document.createElement('span');
        spanNombre.className = 'nombre';
        spanNombre.textContent = jugador.nombre;
        
        const spanTiempo = document.createElement('span');
        spanTiempo.className = 'tiempo';
        spanTiempo.textContent = `${minutos}:${segundos}`;
        
        const spanPuntos = document.createElement('span');
        spanPuntos.className = 'puntos';
        spanPuntos.textContent = `${jugador.puntaje} pts`;  
        li.appendChild(spanPos);
        li.appendChild(spanNombre);
        li.appendChild(spanTiempo);
        li.appendChild(spanPuntos);
        
        elementoUl.appendChild(li);

        
    });
    if (ranking.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No hay datos de ranking disponibles';
      li.style.textAlign = 'center';
      li.style.gridColumn = '1 / span 4';
      elementoUl.appendChild(li);}
  })
  .catch(err => {
    console.error('Error cargando ranking:', err);
      elementoCargando.style.display = 'none';
      
      const mensajeError = document.createElement('div');
      mensajeError.className = 'mensaje-error';
      mensajeError.textContent = 'Error al cargar el ranking. Intenta de nuevo más tarde.';
      
      elementoLista.parentNode.insertBefore(mensajeError, elementoLista);
  });
  if (botonJugar) {
    botonJugar.addEventListener('click', function() {
      window.location.href = 'juegos.html';
    });
  }
  
  if (botonInicio) {
    botonInicio.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  }
})