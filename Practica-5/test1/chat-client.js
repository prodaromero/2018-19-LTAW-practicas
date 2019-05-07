const io = require('socket.io-client');
const socket = io('http://localhost:3000');

function main() {
  console.log("Estoy en app.js...")

/*

  //-- Obtener los elementos del interfaz, del DOM
  let button = document.getElementById('button')
  let display = document.getElementById('display')
*/
  //-- Crear un socket.io. Se establece la conexion
  //-- con el servidor
  var socket = io();


  //-- Parrafo para mostrar mensajes recibidos
  var display = document.getElementById('display')

  //-- Boton de envio del mensaje
  var send = document.getElementById('send')

  //-- caja con el mensjae a enviar
  var msg = document.getElementById('msg')

  //-- Cuando se aprieta el btón de enviar...
  send.onclick = () => {

      //-- Envair el mensaje, con el evento "new_message"
      socket.emit('new_message', msg.value);

      //-- Lo notificamos en la consola del navgador
      console.log("Mensaje emitido");
  }

      //-- Cuando se reciba un mensaje del servidor, se muestra
      //-- en el párrafo
      socket.on('new_message', msg => {
          display.innerHTML += msg + '<br>';
      });
/*
  //-- Cuando se aprieta el botón...
  button.onclick = () => {

    //-- Sacar un mensaje en la consola
    console.log("click!")

    //-- Añadir la cadena al párrafo
    display.innerHTML += "holi "
  }
 */
}
