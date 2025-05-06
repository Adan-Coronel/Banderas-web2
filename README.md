Juego de geografia 

Descripcion

es un juego de preguntas y respuestas utilizando la API rest Countries que se utiliza para obtener la informacion
de los paises sobre los cuales se haran las preguntas, tiene tres tipos de preguntas

1- ¿Cuantos países limítrofes tiene el siguiente país?
2- ¿Cual es el país de la siguiente ciudad capital?
3- Que pais es el de la siguiente bandera?

cada una de ellas tiene 4 posibles respuestas
con la posibilidad de acumular puntos y guardar sus records en un ranking de los 20 mejores jugadores

Tecnologías utilizadas

Frontend

- HTML5
- CSS3
- JavaScript

Backend
- node.js
- Express.js
- fs-extra

API Externa
REST Countries https://restcountries.com/

Versiones con las que se desarrollo el proyecto
Node.js (v22.15.0)
npm (10.9.2)

Almacenamiento de datos

los resultados se almacenaran en un archivo JSON (server/ranking.json)
el ranking se ordena por puntuacion y el tiempo de finalizacion del juego.

Control del tiempo

el juego tiene un cronometro que se muestra al iniciar la partida en un formato de minutos y segundos MM:SS.

Deploy

el juego se encuentra en https://banderas-web2.vercel.app/