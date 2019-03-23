var http = require('http');
var url  = require('url');
var fs   = require('fs');


console.log("Local-server listening at port 8080...");

//-- Configuration and lunch the server.
http.createServer((req, res) => {

    console.log("---> Reques recived");
    console.log("Requested resource (URL): " + req.url);

    var q = url.parse(req.url, true);

    console.log("URL parseada: ");
    console.log("Host: " + q.host);
    console.log("Pathname: " + q.pathname);

    //-- Obtain the file.

    var filename = "";

    if (q.pathname == "/") {
        filename += "/index.html";
    }else {
        filename = q.pathname;
    }

    //-- Obtain the second file
    tipo = filename.split(".")[1];

    //-- Get the filename form the requested resource
    filename = "." + filename;

    console.log("Filename: " + filename);
    console.log("Tipo: " + tipo);

    fs.readFile(filename, function(error, data) {
        if (error) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }

        var mime = "text/html";

        if (['png','jpg'].includes(tipo)) {
            console.log("IMAGEN!!!!");
            mime = "image/" + tipo;
        }

        if (tipo == "css") {
            mime = "text/css";
        }

        //-- Request message
        res.writeHead(200, {'Content-Type':mime});
        res-write(data);
        res.end();
    });
    
}).listen(8080);
