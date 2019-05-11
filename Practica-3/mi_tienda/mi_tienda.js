var http = require('http');
var url  = require('url');
var fs   = require('fs');

const PORT = 8080;

console.log("Local-server listening at port" + PORT + "...");

//--Configuration and lunch the server
http.createServer((req, res) => {

    //-- Show the requested resource
    var ruta = url.parse(req.url, true);

    //-- Obtain the 'file.html'
    var recurso  = "." + ruta.pathname;
    //-- Obtain the extension: {.html, .jpg, .png, .css}
    var extension = recurso.split(".")[2];
    //-- Fix default mime type
    var mime = "text/html"
    //-- Obtain cookies. Default = null.
    var cookie = req.headers.cookie;

/*
        -- HANDLER RESOURCES --
*/

        //-- Homepage
    if (recurso == "./") {
        //-- if not registered
        if (!cookie) {
            //-- user can't buy: need login as random nikname: 'usuario' in this case
            //-- that page cointain a link to register
            recurso = "./login.html"

        } else {
            //-- when the user has registered, he can buy in mi_tienda
            recurso = "./mi_tienda.html"
        }

        console.log("server: user acceding to " + recurso);

        fs.readFile(recurso, function (err, data) {

            if (extension == "css") {
                mime = "text/css";
            }

            //-- Response message
            res.writeHead(200, {'Content-Type': mime});
            res.write(data);
            res.end();
        });

        //-- when the user click in login link, he automatically be registered
    } else if (recurso == "./login") {

        recurso = "./mi_tienda.html"

        console.log("server: user acceding to " + recurso);
        fs.readFile(recurso, function (err, data) {

            if (extension == "css") {
                mime = "text/css";
            }

            //-- Cookie: user registered as 'usuario'
            res.setHeader('Set-Cookie', 'user=usuario');
            console.log("server: user registered as 'usuario'");

            //-- Response message
            res.writeHead(200, {'Content-Type': mime});
            res.write(data);
            res.end();
        });

        //-- Acceding to other resources: {jupiter.html, quark.html, ...}
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
