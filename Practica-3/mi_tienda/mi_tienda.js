var http = require('http');
var url  = require('url');
var fs   = require('fs');

const PORT = 8080;

var productos =
[
    {"name":"Marte", "price": 37000000000},
    {"name":"Jupiter", "price": 65000000000},
    {"name":"Saturno", "price": 80000000000},
    {"name":"Andromeda", "price": 80000000000000},
    {"name":"Centaurus A", "price": 100000000000000},
    {"name":"Ojo negro", "price": 90000000000000},
    {"name":"Foton de luz", "price": 100},
    {"name":"Quark", "price": 5000},
    {"name":"Antimateria", "price": 62500000000}
];

//-- Searh price of the product by name
function Search_Product(p, nombre) {

    var n = 0;
    for (var i = 0; i < p.length; i++) {

        if (p[i].name == nombre) {
            n = p[i].price;
        }
    }
    return n;
}

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

    //-- Leer los parámetros recibidos en la peticion
    var params = ruta.query;

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

        console.log("server: user acceding to " + recurso + ".");

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

        console.log("server: user acceding to " + recurso + ".");
        fs.readFile(recurso, function (err, data) {

            if (extension == "css") {
                mime = "text/css";
            }

            //-- Cookie: user registered as 'usuario'
            res.setHeader('Set-Cookie', 'user=usuario');
            console.log("server: user registered as 'usuario'.");

            //-- Response message
            res.writeHead(200, {'Content-Type': mime});
            res.write(data);
            res.end();
        });

    } else if (recurso == "./client.js") {

        fs.readFile("./client.js", function(err, data) {
            //-- Generate the response
            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.write(data);
            res.end();
            return
        });

    } else if (recurso == "./myquery") {

        console.log("Running ./myquery.");


        console.log("Parametros: " + params.producto);

        //-- Get the price of the product
        var price = Search_Product(productos, params.producto);

        //-- create a temporary variable to add to cookies
        var c = 'product=' + params.producto + ',price=' + price;

        //-- Add to cookies
        cookie += c;

        //-- Cookie: user adding product to cookie
        res.setHeader('Set-Cookie', cookie);
        console.log("server: adding product " + params.producto + " for " + price + "$ to the shopping cart.");

        //-- Cookie save
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end();
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
