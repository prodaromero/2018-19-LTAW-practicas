const express = require ('express')
const app     = express()
const http    = require('http').Server(app);

//-- Puerto donde lanzar el servidor
const PORT = 3000

/*
-- Puerto de entrada principal
    -- configuramos la funcion de retrollamada para que se ejecute cada vez que
    -- alguien se conecte

app.get('/', (req, res) => {
    res.send('Probando express...¡¡¡Qué facil!!!');
    console.log('Acceso a /');
});
*/

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log('Acceso a /');
});

app.get('/woala', (req, res) => {
    res.send('Woala!! Chuck norris approved');
    console.log("Acceso a /woala");
});

//-- Lanzar servidor
http.listen(PORT, function(){
    console.log('Servidor lanzado en el puerto ' + PORT);
});
