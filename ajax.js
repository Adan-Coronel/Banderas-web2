const url = 'https://restcountries.com/v3.1/all' //url del api con banderas
const preguntas = ['¿Cual es el país de la siguiente ciudad capital?',
    'El país xx esta representado por la siguiente bandera ¿?',
    '¿Cuantos países limítrofes tiene el siguiente país?'] // array con las preguntas por los puntos
const card = document.getElementById('card') // card donde se agregaran las banderas y la pregunta

fetch(url)
    .then(res => res.json())
    .then(data => {
        const randomPais = Math.floor(Math.random() * data.length);
        const pais = data[randomPais]; // constante para usar en funciones da el arreglo del paise correcto
        const pregIndex = Math.floor(Math.random() * preguntas.length)              
        let $h2 = document.createElement("h2"); // para agregar la pregunta al html
        let $h4 = document.createElement('h4');// para agregar si es correcta la respuesta al html
        let puntaje = { valor: 0 };
        $h2.innerHTML = `${preguntas[pregIndex]} <br>`;
        card.appendChild($h2);
        console.log(data)
        switch (pregIndex) {
            case 0://completo

                const capital = pais.capital // capital a encontrar el pais
                $h2.innerText += ` ${capital}`
                card.appendChild($h2)
                paisCapital(pais, data, $h4, puntaje)
                break;

            case 1://completo

                preguntaBandera(pais, data, $h4, puntaje);
                break;

            case 2: //completo
                console.log(randomPais)
                const nacion = pais.name.official // capital a encontrar el pais

                $h2.innerText += `${nacion} `;
                card.appendChild($h2)
                paisLimitrofe(pais, $h4, puntaje)
                break;



        }
    })
    .catch((error) => {
        console.log(error)
    }).finally(() => {

    }
    )


function preguntaBandera(pais, data, $h4, puntaje) {//funcion finalizada para agregar banderas
    const banderaUrl = pais.flags.png
    let nombreOficial = pais.name.official
    let respuestaCorrecta = nombreOficial
    $img = document.createElement("img")
    $img.src = banderaUrl;
    $img.alt = `ya quisieras el nombre`

    card.appendChild($img) // agregando la imagen bandera

    let opciones = [nombreOficial]
    console.log(opciones)
    crearOpciones(opciones, data, card, $h4, puntaje, pais => pais.name.official)

}

function paisCapital(pais, data, $h4, puntaje) {
    const respuestaCorrecta = pais.name.official;
    crearOpciones(respuestaCorrecta, data, card, $h4, puntaje, pais => pais.name.official)
}

function paisLimitrofe(pais, $h4, puntaje) {
    const limite = pais.borders || [];
    const respuestaCorrecta = limite.length.toString(); // cantidad de paises limitrofes
    console.log(respuestaCorrecta)
    const posibles = new Set([respuestaCorrecta]);
    while (posibles.size < 4) {
        posibles.add(Math.floor(Math.random() * 10).toString());
    }
    const opciones = Array.from(posibles).sort(() => Math.random() - 0.5);
    opciones.forEach(opcion => {
        const $btn = document.createElement('button');
        $btn.textContent = opcion;
        $btn.addEventListener('click', () => {
            if (opcion === respuestaCorrecta) {
                puntaje.valor += 5;
                $h4.innerText = `¡Correcto! Puntaje: ${puntaje.valor}`;
            } else {
                $h4.innerText = `Incorrecto. Tenía ${respuestaCorrecta} fronteras.`;
            }
            card.appendChild($h4);
        });
        card.appendChild($btn);
    });
}

function crearOpciones(respuestaCorrecta, data, card, $h4, puntaje, getOpcion) { // funcion para agregar botones con opciones y evento al selecionar una opcion
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
            if (opcion === respuestaCorrecta) {
                puntaje.valor += 5;
                $h4.innerText = `¡Correcto! Puntaje: ${puntaje.valor}`;
            } else {
                $h4.innerText = `Incorrecto. La respuesta era: ${respuestaCorrecta}`;
            }
            card.appendChild($h4);
        });
        card.appendChild($btn);
    });
}