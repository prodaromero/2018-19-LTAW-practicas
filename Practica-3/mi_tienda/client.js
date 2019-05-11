function main() {

    console.log("Hola");

    var comprar = document.getElementById('comprar');

    comprar.onclick = () => {

        //-- Generate AJAX request
        m = new XMLHttpRequest();

        var p = document.getElementById("producto").textContent;

        //-- Configure request
        m.open("GET","http://localhost:8080/myquery?producto=" + p, true);

        console.log(p);

        //-- Send request
        m.send();
    }
}
