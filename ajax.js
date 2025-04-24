const url = 'https://restcountries.com/v3.1/all' //url del api con banderas
const preguntas = ['¿Cual es el país de la siguiente ciudad capital?',
    'El país xx esta representado por la siguiente bandera ¿?',
    '¿Cuantos países limítrofes tiene el siguiente país?'] // array con las preguntas por los puntos
    const card = document.getElementById('card') // card donde se agregaran las banderas y la pregunta

fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const randomIndex = Math.floor(Math.random() * data.length);
        console.log(randomIndex);
        const banderaUrl = data[randomIndex].flags.png

        const pregIndex = Math.floor(Math.random() * preguntas.length)
        let $h2 = document.createElement("h2")
        $h2.innerHTML = preguntas[pregIndex];
       
        card.appendChild($h2)
        $img = document.createElement("img")
        $img.src = banderaUrl;
        $img.alt = `ya quisieras el nombre`

        card.appendChild($img)

    })
    .catch((error) => {
        console.log(error)
    }).finally(() => {
        console.log(preguntas)
    }
    )