var http = require('http');
var url  = require('url');
var fs   = require('fs');

const PORT = 8080;

console.log("Local-server listening at port" + PORT + "...");

//--Configuration and lunch the server
http.createServer((req, res) => {

    //-- Show the requested resource
    var ruta = url.parse(req.url, true);

    var recurso  = "." + ruta.pathname;
//    console.log("Request: " + recurso);
    //-- Show cookies
    var cookie = req.headers.cookie;

    if (recurso == "./") {
        recurso += "mi_tienda.html";
        if (!cookie) {
            console.log("caca");
        }else {
            console.log("cece");
        }
    } else if (recurso == "./form.html") {
        //--
        recurso = "form.html";
        console.log("hola");
        //req.on('data', chunk => {
        //    data = chunk.toString();
            console.log("Datos recibidos: " );
            res.statusCode = 200;
        //});

        //    var user = data.split("=")[2];
            res.setHeader('Set-Cookie', 'user=caca' );
        //    console.log(data);

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

}).listen(PORT);
