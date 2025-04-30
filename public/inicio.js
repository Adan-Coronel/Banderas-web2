const $btn = document.createElement('button');
let contenedor = document.getElementById(`centro`)
const $casilla = Object.assign(document.createElement(`input`), {
    type: `Texte`,
    id: `nomJugador`,
    placeholder: `Ingrese Su Nombre`
})

//div contendor 
contenedor.appendChild($casilla)
$btn.textContent = `Iniciar Juego!!!`
contenedor.appendChild($btn)
const $h4 = document.createElement(`h4`)

$btn.addEventListener(`click`, () => {
    const nombre = $casilla.value.trim();
    if (nombre !== '') {
        localStorage.setItem(`nombreDelJugador`, nombre)
        window.location = `juego.html`
    } else {
        $h4.innerText = `Por favor Ingrese su nombre,
         Muchas Gracias!!`
        contenedor.appendChild($h4)
    }

})