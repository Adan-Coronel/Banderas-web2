const $btn = document.createElement('button');
let contenedor= document.getElementById(`centro`)
const $casilla = Object.assign(document.createElement(`input`),{
    type:`Texte`,
    id: `nomJugador`,
    placeholder: `Ingrese Su Nombre`
})

//div contendor 
contenedor.appendChild($casilla)
$btn.textContent = `Iniciar Juego!!!`
contenedor.appendChild($btn)


