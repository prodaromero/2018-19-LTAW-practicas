var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = 0;

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/chat.html');
  console.log('Página principal: /')
});

//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log('Fichero js solicituado')
});

app.get('/chat-style.css', function(req, res){
  res.sendFile(__dirname + '/chat-style.css');
  console.log('Fichero css solicituado')
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('server connected, listening at port 3000...');
});

//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on ('connection', function(socket){
    console.log('New user joined the chat')

    //-- Notificar a todos que se ha unido un nuevo usuario
    io.emit('new_message', 'server: an user has connected');

    users += 1;

    //-- Detectar si el usuario se ha desconectado
    socket.on('disconnect', function(){
        console.log('User left the chat');
        io.emit('new_message', 'server: an user has desconnected');

        users -= 1;
    });

    //-- Detectar si se ha recibido un mensaje del cliente
    socket.on('new_message', msg => {

        //-- Notificarlo en la consola del servidor
        console.log('Mensaje recibido: ' + msg);

        switch (msg) {
            case '/help':
                msg = 'server: List of sopported commands:' + "<br>" +
                    '   /list -> List of the number of connected users' + "<br>" +
                    '   /hello -> The server will return a greeting' + "<br>" +
                    '   /date -> Know the date';


                io.emit('new_message', msg);
                break;

            case '/list':
                msg = 'Connected users: ' + users;

                io.emit('new_message', msg);
                break;

            case '/hello':

                msg =  'server: welcome to the chat';
                io.emit('new_message', msg);
                break;

            case '/date':
                var d = new Date();
                var yy = d.getFullYear();
                var mm = d.getMonth();
                var dd = d.getDate();

                msg = 'server: ' + dd + '/' + mm + '/' + yy;
                io.emit('new_message', msg);
                break;

            default:
                var d = new Date();
                var h = d.getHours();
                var m = d.getMinutes();
                var s = d.getSeconds();
                var time = '[' + h + ':' + m + ':' + s + ']'
                io.emit('new_message', time + 'user: ' + msg);
        }
    });
});
