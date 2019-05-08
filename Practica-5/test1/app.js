

function main() {
    
    const socket = io('http://localhost:3000');

    var display = document.getElementById('display')

    //-- Boton de envio del mensaje
    var send = document.getElementById('send')

    //-- caja con el mensjae a enviar
    var msg = document.getElementById('msg')

    //-- Cuando se aprieta el btón de enviar...

    send.addEventListener( "click", envío  => {
           console.log( "I was clicked." );
           socket.send( "new_message", msg );
    });
      /*
        //-- Envair el mensaje, con el evento "new_message"
        socket.emit('new_message', msg.value);

        send.onclick = () => {

              console.log( "I was clicked." );
              ipcRenderer.send( "new_message", msg.value);
       */
}
