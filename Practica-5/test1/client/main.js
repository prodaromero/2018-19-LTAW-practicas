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

    //-- Cerrar app.
    win.on('close', function() { //   <---- Catch close event
        console.log("Closing electron...")
        win.removeAllListeners('close');
     });

    //-- webContents es el responsable de renderizar y controlar la pagina web y
    //-- es una propiedad del objeto BrowserWindow.
    win.webContents.once('dom-ready', () => {

        socket.on('new_message', msg => {

            console.log(msg);
            win.webContents.send('new_message',msg);
        });

        ipcMain.on('new_message', (event, msg) => {
            socket.emit('new_message', msg);
            console.log(msg);
        });
    });

});
