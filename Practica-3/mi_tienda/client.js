function main() {

    var comprar = document.getElementById('comprar');

    comprar.onclick = () => {

        //-- Generate AJAX request
        m = new XMLHttpRequest();

        var p = document.getElementById("producto").textContent;

        //-- Configure request
        m.open("GET","http://localhost:8080/myquery?producto=" + p, true);

        //-- Send request
        m.send();
    }
}

function Comprar() {

    alert("¡Enhorabuena! Ya lo has comprado");
}
