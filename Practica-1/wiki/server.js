var http = require('http');

console.log("Arrancando servidor...");

server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
    console.log("---> Petición recibida");
    console.log("--> Cabecera de la solicitud: ");
    //console.log(req.headers);
    console.log("HOST:\n" + "-- " + req.headers.host);
    console.log("CONNECTION:\n" + "-- " + req.headers.connection);
    console.log("USER AGENT:\n" + "-- " + req.headers['user-agent']);
    console.log("Recurso solicitado (URL):\n" + "-- " + req.url);
    console.log("Cabecera completa de solicitud:");
    console.log(req.headers);
}).listen(8080);
