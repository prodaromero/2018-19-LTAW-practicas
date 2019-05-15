function main() {

    const socket = io.connect('http://localhost:3000');

    var display = document.getElementById('display')

    //-- Boton de envio del mensaje
    var send = document.getElementById('send')

    //-- caja con el mensjae a enviar
    var msg = document.getElementById('msg')

    //-- Cuando se aprieta el btón de enviar...

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

}
