const url = 'https://restcountries.com/v3.1/all' //url del api con banderas
const preguntas = ['¿Cual es el país de la siguiente ciudad capital?',
    'El país xx esta representado por la siguiente bandera ¿?',
    '¿Cuantos países limítrofes tiene el siguiente país?'] // array con las preguntas por los puntos
const card = document.getElementById('card') // card donde se agregaran las banderas y la pregunta

fetch(url)
    .then(res => res.json())
    .then(data => {
        const randomPais = Math.floor(Math.random() * data.length);
        // const pregIndex = Math.floor(Math.random() * preguntas.length)           descomentar despues de probar indexs
        const pregIndex = 1
        let $h2 = document.createElement("h2")
        $h2.innerHTML = preguntas[pregIndex];
        card.appendChild($h2)
        let $h4 = document.createElement('h4')
        let puntaje = 0
        switch (pregIndex) {
            case 0:


                puntaje += 3
                break;

            case 1:
                let nombreOficial = data[randomPais].name.official
                const banderaUrl = data[randomPais].flags.png
                let respuestaCorrecta= nombreOficial
                $img = document.createElement("img")
                $img.src = banderaUrl;
                $img.alt = `ya quisieras el nombre`

                card.appendChild($img)

                let opciones = [nombreOficial]

                while (opciones.length < 4) {
                    let index = Math.floor(Math.random() * data.length);
                    let nombre = data[index].name.official;
                    if (!opciones.includes(nombre)) {
                        opciones.push(nombre);
                    }
                    opciones.sort(() => Math.random() - 0.5)
                }

                opciones.forEach((opcion) => {
                    let $btn = document.createElement('button')

                    $btn.textContent = opcion


                    $btn.addEventListener('click', () => {
                        if (opcion === respuestaCorrecta) {
                            puntaje += 5;
                            $h4.innerText = 'respuesta correcta ' + puntaje;
                     
                            card.appendChild($h4)
                        } else {
                            $h4.innerText = 'respuesta incorrecta';
                            card.appendChild($h4)
                        }
                    });
                    console.log(respuestaCorrecta)
                    card.appendChild($btn)
                });



                break;

            case 2:

                puntaje += 3
                break;



        }




    })
    .catch((error) => {
        console.log(error)
    }).finally(() => {
        console.log(preguntas)
    }
    )