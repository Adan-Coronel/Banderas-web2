const url = 'https://restcountries.com/v3.1/all' //url del api con banderas
const preguntas = ['¿Cual es el país de la siguiente ciudad capital?',
    'Que pais es el de la siguiente bandera?',
    '¿Cuantos países limítrofes tiene el siguiente país?'] // array con las preguntas por los puntos

let tiempo
let actualizarTiempo
let dataGlobal = [];
let preguntasCorrectas = 0
let preguntasIncorrectas = 0

document.addEventListener("DOMContentLoaded", () => {
    let preguntasRespondidas = 0;
    const nomJugador = document.getElementById(`nomJugador`)// contenedor para el nombre del jugador
    const nameJugador = localStorage.getItem(`nombreDelJugador`)
    let $name = document.createElement(`p`); // para agregar el nombre del jugador
    $name.textContent = nameJugador //
    nomJugador.appendChild($name)
    let puntaje = { valor: 0 };

    const card = document.getElementById('card') // card donde se agregaran las banderas y la pregunta
    const btn = document.getElementById('btn')// contenedor donde se guardan los botones
    
    
    function actualizarProgreso() {
        const total = preguntasCorrectas + preguntasIncorrectas;
        const porcentaje = (total / 10) * 100;
        const barraProgreso = document.getElementById('barra-avance');
        if (barraProgreso) {
            barraProgreso.style.width = `${porcentaje}%`;
        }
        
        const elementoCorrectas = document.getElementById('correctas');
        const elementoIncorrectas = document.getElementById('incorrectas');
        
        if (elementoCorrectas) {
            elementoCorrectas.textContent = `Correctas: ${preguntasCorrectas}`;
        }
        
        if (elementoIncorrectas) {
            elementoIncorrectas.textContent = `Incorrectas: ${preguntasIncorrectas}`;
        }
    }
    /*bloque de funciones para las preguntas*/

    function preguntaBandera(pais, data, $h4, puntaje) {//funcion finalizada para agregar banderas
        const banderaUrl = pais.flags.png
        let nombreOficial = pais.name.official
        const $img = document.createElement("img")
        $img.src = banderaUrl;
        $img.alt = `ya quisieras el nombre`

        card.appendChild($img) // agregando la imagen bandera

        let opciones = [nombreOficial]
        crearOpciones(opciones, data, btn, $h4, puntaje, pais => pais.name.official, 5)

    }

    function paisCapital(pais, data, $h4, puntaje) {
        const respuestaCorrecta = pais.name.official;
        crearOpciones(respuestaCorrecta, data, btn, $h4, puntaje, pais => pais.name.official, 3)
    }

    function paisLimitrofe(pais, $h4, puntaje) {
        const limite = pais.borders || [];
        const respuestaCorrecta = limite.length.toString(); // cantidad de paises limitrofes
        const posibles = new Set([respuestaCorrecta]);
        while (posibles.size < 4) {
            posibles.add(Math.floor(Math.random() * 10).toString());
        }
        const opciones = Array.from(posibles).sort(() => Math.random() - 0.5);
        opciones.forEach(opcion => {
            const $btn = document.createElement('button');
            $btn.textContent = opcion;
            $btn.addEventListener('click', () => {
                preguntasRespondidas++;
                if (opcion === respuestaCorrecta) {
                    puntaje.valor+=3
                    $h4.innerText = `¡Correcto! Puntaje: ${puntaje.valor}`;
                    preguntasCorrectas++
                    siguientePreg()
                } else {
                    $h4.innerText = `Incorrecto. Tenía ${respuestaCorrecta} fronteras.`;
                    preguntasIncorrectas++
                    siguientePreg()
                }
                btn.appendChild($h4);
            });
            btn.appendChild($btn);
        });
    }

    function crearOpciones(respuestaCorrecta, data, btn, $h4, puntaje, getOpcion, puntosPorRespuesta = 3) { // funcion para agregar botones con opciones y evento al selecionar una opcion
        let opciones = [respuestaCorrecta]; // se agrega la respuesta correcta a las opciones
        while (opciones.length < 4) { // agregando otras opciones al array
            const index = Math.floor(Math.random() * data.length);
            const nombre = getOpcion(data[index]);
            if (!opciones.includes(nombre)) {
                opciones.push(nombre);
            }
        }
        
        opciones.sort(() => Math.random() - 0.5); // mezclando las opciones para no aparecer siempre en el mismo lugar
        
        opciones.forEach(opcion => { // creacion de botones para elegir opciones
            const $btn = document.createElement('button');
            $btn.textContent = opcion;
            $btn.addEventListener('click', () => {
                preguntasRespondidas++;
                if (opcion === respuestaCorrecta) {

                    puntaje.valor += puntosPorRespuesta;
                    $h4.innerText = `¡Correcto! Puntaje: ${puntaje.valor}`;
                    preguntasCorrectas ++                    
                    siguientePreg()
                } else {
                    $h4.innerText = `Incorrecto. La respuesta era: ${respuestaCorrecta}`;
                    preguntasIncorrectas ++
                    siguientePreg()
                }
                btn.appendChild($h4);
            });
            btn.appendChild($btn);
        });
    }
    /*bloque de funciones para el cronometro */
    function cronometro() {
        tiempo = Date.now()
        actualizarTiempo = setInterval(actualizarCrono, 1000);
    }

    function actualizarCrono() {
        const ahora = Date.now();
        const tiempoTranscurridoMs = ahora - tiempo;
        const segundosTotales = Math.floor(tiempoTranscurridoMs / 1000);
        const minutos = Math.floor(segundosTotales / 60);
        const segundos = segundosTotales % 60;
        /*formato para que el cronometro tenga 0 a la izquierda */
        const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
        const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;

        document.getElementById(`cronometro`).textContent = `Tiempo: ${minutosFormateados}:${segundosFormateados}`;
    }

    function detenerCronometro() {
        clearInterval(actualizarTiempo);
        const totalSegs = Math.floor((Date.now() - tiempo) / 1000);

        const minutos = Math.floor(totalSegs / 60);
        const segundos = totalSegs % 60;

        const min = minutos < 10 ? `0${minutos}` : `${minutos}`;
        const seg = segundos < 10 ? `0${segundos}` : `${segundos}`;


        localStorage.setItem('tiempoFinal', `${min}:${seg}`);
        return totalSegs
    }


    function cargarPregunta(data, puntaje) {

        card.innerHTML = ``
        btn.innerHTML = ``
        const randomPais = Math.floor(Math.random() * data.length);
        const pais = data[randomPais]; // constante para usar en funciones del arreglo del pais correcto
        const pregIndex = Math.floor(Math.random() * preguntas.length)
        let $h2 = document.createElement("h2"); // para agregar la pregunta al html
        let $h3 = document.createElement("h3"); // para agregar el pais al html
        let $h4 = document.createElement('h4');// para agregar si es correcta la respuesta al html


        $h2.innerHTML = `${preguntas[pregIndex]} <br>`; // agregando la pregunta al contenedor
        card.appendChild($h2);



        switch (pregIndex) {
            case 0://completo
                const capital = pais.capital // capital a encontrar el pais
                $h3.innerText += ` ${capital}`
                card.appendChild($h3)
                paisCapital(pais, data, $h4, puntaje)
                break;
            case 1://completo
                preguntaBandera(pais, data, $h4, puntaje);
                break;
            case 2: //completo
                console.log(randomPais)
                const nacion = pais.name.official // capital a encontrar el pais
                $h3.innerText += `${nacion} `;
                card.appendChild($h3)
                paisLimitrofe(pais, $h4, puntaje)
                break;

        }
    }

    function siguientePreg() {
        btn.innerHTML = '';
        actualizarProgreso();
      
        if (preguntasRespondidas >= 10) {
            const tiempoFinal = detenerCronometro()
            guardarResultado(puntaje, tiempoFinal)

            return;
        }
        const btnSiguiente = document.createElement('button');
        btnSiguiente.textContent = 'Siguiente pregunta';
        btnSiguiente.addEventListener('click', () => {
            cargarPregunta(dataGlobal, puntaje);
        });
        btn.appendChild(btnSiguiente);
    }

    function guardarResultado(puntaje, tiempoFinal) {
        const nombre = localStorage.getItem(`nombreDelJugador`)
        const resultado = {
            nombre: nombre,
            puntaje: puntaje.valor,
            correctas: preguntasCorrectas,
            incorrectas: preguntasIncorrectas,
            tiempoTotal: tiempoFinal,
        }
        localStorage.setItem('ultimaPartida', JSON.stringify(resultado));
        fetch('/guardar-resultado', {
            method: "Post",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(resultado),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(`resultado guardado :`, data.toString());
                window.location.href = 'rankings.html?fromGame=true';
            }).catch((error) => {
                console.log(`error`, error);
                window.location.href = 'rankings.html?fromGame=true';
            })
    }

    
    fetch(url)
        .then(res => res.json())
        .then(data => {
            dataGlobal = data;
            cronometro() // inicializacion el cronometro
            cargarPregunta(data, puntaje)
        })
        .catch((error) => {
            console.log(error)
        })

})

