var http = require('http');

console.log("Arrancando servidor...");

server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
    console.log("---> Petición recibida");
    console.log("--> Cabecera de la solicitud: ");
    //console.log(req.headers);
    console.log("HOST: " + req.headers.host);
    console.log("CONNECTION: " + req.headers.connection);
    console.log("USER AGENT: " + req.headers['user-agent']);
    console.log("Recurso solicitado (URL): " + req.url);
}).listen(8080);
