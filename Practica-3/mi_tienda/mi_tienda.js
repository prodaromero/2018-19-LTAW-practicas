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
    var extension = recurso.split(".")[2];
    //-- Tipo mime por defecto: html
    var mime = "text/html"

    //-- Show cookies
    var cookie = req.headers.cookie;

    if (recurso == "./") {
        if (!cookie) {
            recurso = "./login.html"
        } else {
            recurso = "./mi_tienda.html"
        }
        console.log("server: user acceding to " + recurso);

        fs.readFile(recurso, function (err, data) {

            if (extension == "css") {
                mime = "text/css";
            }

            //-- Generar el mensaje de respuesta
            res.writeHead(200, {'Content-Type': mime});
            res.write(data);
            res.end();
        });

    } else if (recurso == "./login") {
        //-- ESTABLECER LA COOKIE!!
        console.log("hola");
        recurso = "./mi_tienda.html"

        fs.readFile(recurso, function (err, data) {

            if (extension == "css") {
                mime = "text/css";
            }

            res.setHeader('Set-Cookie', 'user=usuario');
            //-- Generar el mensaje de respuesta
            res.writeHead(200, {'Content-Type': mime});
            res.write(data);
            res.end();
        });
    } else {
        fs.readFile(recurso, function(err, data) {
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'});
              return res.end("404 Not Found");
            }


            if (extension == "css") {
                mime = "text/css";
            }

            //-- Generar el mensaje de respuesta
            res.writeHead(200, {'Content-Type': mime});
            res.write(data);
            res.end();
        });
    }
}).listen(PORT);
