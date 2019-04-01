var http = require('http');
var url  = require('url');
var fs   = require('fs');


console.log("Local-server listening at port 8080...");

//-- Configuration and lunch the server.
http.createServer((req, res) => {

    var ruta = url.parse(req.url, true);

    var recurso = "";

    if (ruta.pathname == "/") {
        recurso += "mi_tienda.html";
    } else {
        recurso = "." + ruta.pathname;
    }

    var extension = recurso.split(".")[2];

    fs.readFile(recurso, function(err, data) {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        }

        //-- Tipo mime por defecto: html
        var mime = "text/html"

        if (extension == "css") {
            mime = "text/css";
        }

        //-- Generar el mensaje de respuesta
        res.writeHead(200, {'Content-Type': mime});
        res.write(data);
        res.end();
    });
}).listen(8080);
