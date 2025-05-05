const $btn = document.createElement('button');
let contenedor = document.getElementById(`centro`)
const $casilla = Object.assign(document.createElement(`input`), {
    type: `text`,
    id: `nomJugador`,
    placeholder: `Ingrese su nombre`,
    maxLength: 30
})


const $mensajeError = document.createElement('p');
$mensajeError.className = 'mensaje-error';
$mensajeError.style.color = '#a05a5a';
$mensajeError.style.fontSize = '0.9rem';
$mensajeError.style.marginTop = '5px';
$mensajeError.style.display = 'none';


//div contendor 
contenedor.appendChild($casilla)
contenedor.appendChild($mensajeError);
$btn.textContent = `Iniciar juego!!!`
contenedor.appendChild($btn)
const $h4 = document.createElement(`h4`)
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    
    if (nombre.length < 2) {
        return {
            valido: false,
            mensaje: 'El nombre debe tener al menos 2 caracteres'
        };
    }
    
    if (!regex.test(nombre)) {
        return {
            valido: false,
            mensaje: 'El nombre solo puede contener letras, espacios, apóstrofes y guiones'
        };
    }
    if (nombre.trim().length === 0) {
        return {
            valido: false,
            mensaje: 'El nombre no puede estar vacío'
        };
    }
    return {
        valido: true,
        mensaje: ''
    };
}

$casilla.addEventListener('input', () => {
    const nombre = $casilla.value.trim();
    if (nombre === '') {
        $mensajeError.style.display = 'none';
        return;
    }
    const validacion = validarNombre(nombre);
    
    if (!validacion.valido) {
        $mensajeError.textContent = validacion.mensaje;
        $mensajeError.style.display = 'block';
    } else {
        $mensajeError.style.display = 'none';
    }
});
$btn.addEventListener(`click`, () => {
    const nombre = $casilla.value.trim();
    const validacion = validarNombre(nombre);
    if (validacion.valido) {
        localStorage.setItem(`nombreDelJugador`, nombre)
        window.location = `juegos.html`
    } else {
        $mensajeError.textContent = validacion.mensaje;
        $mensajeError.style.display = 'block';
        $h4.innerText = `Por favor ingrese su nombre,
         muchas gracias 😃 `
        contenedor.appendChild($h4)
    }

})