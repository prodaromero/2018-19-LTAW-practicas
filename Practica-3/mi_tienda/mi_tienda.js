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

var pagar = 0;
var list = "";

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

function Obtain_Products(p) {
    var c = p.split('=');
    var t = c.toString();
    c = t.split("|");
    t = c.toString();
    c = t.split(",");

    return c;
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

        //-- Get the price of the product
        var price = Search_Product(productos, params.producto);

        //-- create a temporary variable to add to cookies
        var c = '|product=' + params.producto + ',price=' + price;

        //-- Add to cookies
        cookie += c;

        //-- Get the total products and price.
        var t = Obtain_Products(cookie);
        pagar = pagar + parseInt(t[t.length-1]);
        list += t[t.length-3] + " | ";

        //-- Cookie: user adding product to cookie
        res.setHeader('Set-Cookie', cookie);
        console.log("server: adding product " + params.producto + " for " + price + "$ to the shopping cart.");

        //-- Cookie save
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end();
        //-- Acceding to other resources: {jupiter.html, quark.html, ...}
    } else if (recurso == "./buyform") {

        var content = `
              <!DOCTYPE html>
              <html lang="es">
                <head>
                  <meta charset="utf-8">
                  <title>FORM 1</title>
                  <link rel="stylesheet" href="form.css">
                  <script type="text/javascript" src="client.js" ></script>
                </head>
                <body>
                    <h1>Formulario de compra </h1>
                    <p>Usted está a punto de comprar: </p>
                    <br>
            `

        content += list;

        content += `
                    <p>Por un precio total de:
                    `

        content += pagar;

        content +=  `
                $</p>
                    <form class="modal-content" action="/mi_tienda.html">
                        <div class="container">

                            <label for="nombre"><b>Nombre y apellidos</b></label><br>
                            <input type="text" placeholder="Introducir Nombre y apellidos" name="nombre" required>
                            <br><br>
                            <label for="email"><b>Email</b></label><br>
                            <input type="text" placeholder="Introducir Email" name="email" required>
                            <br><br>
                            <label for="cuenta"><b>Numero de cuenta bancaria</b></label><br>
                            <input type="text" placeholder="Introducir numero de cuenta" name="cuenta" required>
                            <br><br>
                            <label for="CVC"><b>CVC</b></label><br>
                            <input type="text" placeholder="Introducir CVC" name="CVC" required>
                            <br><br>
                            <div class="clearfix">
                              <button type="button" onclick="Comprar()" class="buybtn" id="cancel">Comprar</button>
                            </div>
                            <div>
                               <a href="mi_tienda.html">Página principal</a>
                           </div>
                          </div>
                        </form>
                  </div>
            </body>
          </html>
                    `

            //-- Response message
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html')
            res.write(content);
            res.end();

    } else if (recurso == "./comprar") {


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
