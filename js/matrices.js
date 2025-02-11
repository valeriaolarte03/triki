const modojuego = document.querySelector(".notificacion"); //sirve para seleccionar un elemento en HTML.

const movimientos = ["", "", "", "", "", "", "", "", ""];
const ganador = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]];

const mensajeGanador = () => "El jugador de la " + numJugador + " ha ganado"; // se crea constantes con funciones ya que tiene una variable cambiante
const mensajEmpate = () => "El juego ha quedado en empate";
const turnoJugador = () => "Turno de " + numJugador;

let turno = true; //cuando el juego no ha terminado o empezado.
let numJugador = "X";

function inicioJuego() {
  estadoJuego(turnoJugador()); //sirve para mostrar que jugador empieza, si gano, perdío o empata el juego
  resultadoJuego(); //notifica el resultado del juego.
}
inicioJuego(); //se llama la función para que imprima los datos del juego.

function estadoJuego(mensaje) {
  modojuego.innerHTML = mensaje;
}

function verificarCasillas(interaccion) {
  const casilla = interaccion.target; //almacena el objeto HTML.

  if (casilla.classList.contains("bordes")) { //el contains es para verificar si el elemento contiene la clase.
    const index = Array.from(casilla.parentNode.children).indexOf(casilla); //sirve para llamar a la casilla que se ha seleccionado, es decir se llama al padre y se busca el hijo. t crear un array de los hijos y buscar el index del hijo seleccionado.

    if (movimientos[index] !== "" || !turno) {
      return;
    } // si la casilla no está vacía o no es el turno del jugador, no se puede seleccionar.
    casillajugadores(casilla, index);
    verificarjuego();
  }
}

function casillajugadores(casilla, index) {
  movimientos[index] = numJugador; //almacena el dato del jugador en la casilla que da click.
  casilla.innerText = numJugador; //buscar para que sirve el innerText
}

let marcadorx = 0; //se colocan fuera de la funcion para evitar el reinicio del marcador cada vez que se juega
let marcadoro = 0;

let posicion1 = ""; //sirve para comparar los datos del arreglo movimientos con las condiciones de ganar.
let posicion2 = "";
let posicion3 = "";

const imagenJ1 = document.getElementById("cambiarImg1");
const imagenJ2 = document.getElementById("cambiarImg2");
const puntaje = document.getElementById("tipoLetra1");

const reiniciar = document.querySelector(".reiniciar");

const ganadorJuego = document.getElementById("ganador");
let mostrarGanador = document.querySelectorAll(".modalJ")[0];
let modalConteiner = document.querySelectorAll(".animacion")[0];
const cerrarModal = document.getElementById("cerrarJ");

function verificarjuego() {
  let juegoG = false; //se coloca para cuando el jugador gane.

  for (let i = 0; i < ganador.length; i++) { //sirve para recorrer cada una de las condiciones para ganar
    const condicion = ganador[i]; //selecciona cada una de las condiciones de ganar [0,1,2], luego[3,4,5] etc.

    posicion1 = movimientos[condicion[0]]; //sirve para comparar los datos del arreglo movimientos con las condiciones de ganar.
    posicion2 = movimientos[condicion[1]]; // cuando a la condicion se le agrega un indice, selecciona la celda de dicho indice, por ejemplo condicion[2]=2 en filas, en columnas es condicion[1] la columna es [0,3,6] el resultado es=movimientos[3] y luego busca el valor del arreglo movimientos en ese indice
    posicion3 = movimientos[condicion[2]];

    console.log([condicion[0]]);

    if (posicion1 === "" || posicion2 === "" || posicion3 === "") {
      continue; //sirve para que continue con las condiciones de la matriz    
    } //si no hay datos en las casillas, no se cumple la condición de ganar

    if (posicion1 === posicion2 && posicion2 === posicion3) {
      juegoG = true; // hace que salga del ciclo

      condicion.forEach(index => {
        const casillaGanadora = document.querySelectorAll(".bordes")[index];
        casillaGanadora.classList.add("verde");
      });
      // Cambiar el color de las demás casillas
      document.querySelectorAll(".bordes").forEach((casilla, index) => {
        if (!condicion.includes(index)) {
          casilla.classList.add("rojo");
        }
      });

      const punto1 = document.getElementById("puntosj1");
      const punto2 = document.getElementById("puntosj2");

      if (posicion1 === "X") {
        marcadorx++;
        punto1.innerText = marcadorx;

        imagenJ1.src = "./img/win.png";
        imagenJ1.classList.add("win");
        puntaje.classList.add("puntajeArreglar");
        cambioLetras1.classList.remove("cambioLetra");

        imagenJ2.src = "./img/lose.png";
        imagenJ2.classList.remove("win");
        cambioLetras2.classList.remove("cambioLetra");
        puntaje.classList.remove("puntajeArreglar");
        reiniciar.disabled = false;

      } else {
        if (posicion1 === "O") {
          marcadoro++;
          punto2.innerText = marcadoro;

          imagenJ2.src = "./img/win.png";
          imagenJ2.classList.add("win");
          puntaje.classList.add("puntajeArreglar");
          cambioLetras2.classList.remove("cambioLetra");

          imagenJ1.src = "./img/lose.png";
          imagenJ1.classList.remove("wait");
          cambioLetras1.classList.remove("cambioLetra");
          puntaje.classList.remove("puntajeArreglar");
          reiniciar.disabled = false;
        }
      }
    }
  }

  if (juegoG) { //si es positiva, se muestra el mensaje del ganador.
    estadoJuego(mensajeGanador());
    turno = false;

    if (marcadorx === 2) {  //intetar cambiar el marcador con un input desde HTML, desde el iniciar. En ambos marcadores.
      ganadorJuego.innerText = "Ganador: el jugador de la letra " + numJugador + " con " + marcadorx + " puntos.";
      mostrarModal();
      cerrarModal.onclick = () => {
        ocultarModal();
      };
      reiniciar.disabled = true;
    } else {
      if (marcadoro === 2) {
        ganadorJuego.innerText = "Ganador: el jugador de la letra " + numJugador + " con " + marcadoro + " puntos. ";
        mostrarModal();
        cerrarModal.onclick = () => {
          ocultarModal();
        reiniciar.disabled = true;
      };
    };
    };
    return;
  }

  let casillasVacias = !movimientos.includes(""); //sirve para contar las casillas vacías, si es true es porque tiene un valor, si es false es que está vacio. 

  if (casillasVacias) {
    estadoJuego(mensajEmpate()); //cuando no hay casillas vacías, se muestra el mensaje de empate, porque no cumplió con las condiciones para ganar.
    turno = false;
    reiniciar.disabled = false;
    return;
  }
  oponente();
}

function mostrarModal() {
  modalConteiner.classList.add("modalResponsive");
  mostrarGanador.classList.toggle("modalGanador");
};

function ocultarModal() {
  mostrarGanador.classList.toggle("modalGanador");
  setTimeout(
    function () {
      modalConteiner.classList.add("ocultarModal");
      modalConteiner.classList.remove("modalResponsive");
    }, 1000);
};

const cambioLetras1 = document.getElementById("tipoLetra1");
const cambioLetras2 = document.getElementById("tipoLetra2");

function oponente() {
  numJugador = (numJugador === "X") ? numJugador = "O" : numJugador = "X";
  estadoJuego(turnoJugador());

  if (numJugador === "X") {
    imagenJ2.src = "./img/wait.png";
    imagenJ2.classList.add("wait");
    cambioLetras2.classList.add("cambioLetra");

    imagenJ1.src = "./img/play.png";
    imagenJ1.classList.remove("wait");
    cambioLetras1.classList.remove("cambioLetra");

    reiniciar.disabled = true;

  } else {
    imagenJ1.src = "./img/wait.png";
    imagenJ1.classList.add("wait");
    cambioLetras1.classList.add("cambioLetra");

    imagenJ2.src = "./img/play.png";
    imagenJ2.classList.remove("wait");
    cambioLetras2.classList.remove("cambioLetra");
    reiniciar.disabled = true;
  }
}

function resultadoJuego() {
  const prueba = document.querySelector(".juego");
  prueba.addEventListener("click", verificarCasillas);

  const reiniciar = document.querySelector(".reiniciar");
  reiniciar.addEventListener("click", reiniciarJuego);

  const nuevojuego = document.querySelector(".nuevoJuego");
  nuevojuego.addEventListener("click", nuevoJuego);
}

function reiniciarJuego() {
  turno = true;
  if (numJugador == "X") {
    numJugador = "O";
  } else {
    if (numJugador == "O") {
      numJugador = "X";
    }
  }
  reiniciarJ();
  estadoJuego(turnoJugador());

  const reincioJuego = document.querySelectorAll(".bordes"); //selecciona todos los elementos con la clase "bordes"
  reincioJuego.forEach(casilla => {
    casilla.innerText = ""; //elimina el texto de cada casilla
    casilla.classList.remove("verde", "rojo"); //elimina las clases "verde" y "rojo"
  });
  reiniciar.disabled = false;
};

function reiniciarJ() {
  let i = movimientos.length;
  while (i--) { movimientos[i] = ""; } //se crea un bucle que se repite hasta que se vacíe el array movimientosn. Cuando detecta números negativos sale del bucle.

  if (numJugador === "X") {
    imagenJ2.src = "./img/wait.png";
    imagenJ2.classList.add("wait");
    cambioLetras2.classList.add("cambioLetra");
    imagenJ2.classList.remove("win");

    imagenJ1.src = "./img/play.png";
    imagenJ1.classList.remove("wait");
    cambioLetras1.classList.remove("cambioLetra");
    imagenJ1.classList.remove("win");
  } else {
    imagenJ1.src = "./img/wait.png";
    imagenJ1.classList.add("wait");
    cambioLetras1.classList.add("cambioLetra");
    imagenJ1.classList.remove("win");

    imagenJ2.src = "./img/play.png";
    imagenJ2.classList.remove("wait");
    cambioLetras2.classList.remove("cambioLetra");
    imagenJ2.classList.remove("win");
  };
};

function nuevoJuego() {
  reiniciarJ();
  reiniciarJuego();
  
  const reinicioPuntos1 = document.getElementById("puntosj1");
  const reinicioPuntos2 = document.getElementById("puntosj2");
  marcadoro = 0;
  marcadorx = 0;
  reinicioPuntos1.innerText = 0;
  reinicioPuntos2.innerText = 0;
 
  // Asegurarse de que se elimine la clase ocultarModal
  modalConteiner.classList.remove("ocultarModal");

  if (numJugador === "X") {
    imagenJ2.src = "./img/wait.png";
    imagenJ2.classList.add("wait");
    cambioLetras2.classList.add("cambioLetra");
    imagenJ2.classList.remove("win");

    imagenJ1.src = "./img/play.png";
    imagenJ1.classList.remove("wait");
    cambioLetras1.classList.remove("cambioLetra");
    imagenJ1.classList.remove("win");
  } else {
    cambioLetras1.classList.add("cambioLetra");
    imagenJ1.classList.remove("win");

    imagenJ2.src = "./img/play.png";
    imagenJ2.classList.remove("wait");
  };
  };
