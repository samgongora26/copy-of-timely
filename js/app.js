async function enviar_datos(url, datos) {
    try {
      const res = await fetch(url, { method: "POST", body: datos });
      const data = await res.json();
      return data;
    } catch (error) {
      //console.log(error);
    }
}

//variables del dom
const form_movie = document.querySelector("#form_movie_search");
form_movie.addEventListener("submit", busca_pelicula);

async function busca_pelicula(e) {
    e.preventDefault();
    let movie = document.querySelector('#movie').value;
    console.log("pelicula" + movie);
    /*
    var searchElement = 'https://www.omdbapi.com/?s='+movie+'&apikey=thewdb';
    var movieDetails = [];
    const url = "../../inc/peticiones/admin/funciones.php";
    const datos = new FormData();
    datos.append("accion", "verifica_cuenta");

    
    const res = await enviar_datos(url, datos);
    //console.log(res);
    res.length != 0 ? llenado_contenedor_html(contenido_promociones,res) : ninguna_promocion(); 
    return cuenta;
    */
}

async function guardar_datos() {
    var searchElement = 'https://www.omdbapi.com/?s='+req.query.movie+'&apikey=thewdb';
    var movieDetails = [];
    const url = "../../inc/peticiones/admin/funciones.php";
    const datos = new FormData();
    datos.append("accion", "verifica_cuenta");
  
    const res = await enviar_datos(url, datos);
    //console.log(res);
    const cuenta = res.cuenta_existente;
    return cuenta;
}