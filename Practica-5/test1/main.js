const electron = require('electron')
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

const ipcMain = electron.ipcMain;


console.log("Arrancando electron...")

//-- Punto de entrada. En cuanto electron está listo
//-- ejecita esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra Interfaz Gráfica
    win = new electron.BrowserWindow({
        width: 800,
        height: 400
    });

    //-- En la parte superior se nos ha creado el menu
    //-- por defecto
    //-- Si lo queremos quitar, hay que añadir esta línea

//    win.setMenuBarVisibility(false)

    //-- Cargar la intefaz Gráfica
    win.loadFile('chat.html')

    ipcMain.on('new_message', (envio, msg) => {
        console.log(msg);
        socket.emit('new_message', msg);
        console.log(msg);
    })

});
