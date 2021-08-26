async function enviar_datos(url) {
    try {
      const res = await fetch(url, { method: "POST", body: "" });
      const data = await res.json();
      return data;
    } catch (error) {
      //console.log(error);
    }
}

//variables del dom
const btn_search_movie = document.querySelector("#btn_search_movie");
const movies_list = document.querySelector("#movies_list");
btn_search_movie.addEventListener("click", busca_pelicula);

async function busca_pelicula(e) {
    e.preventDefault();
    movies_list.innerHTML="";
    let movie = document.querySelector('#movie').value;
    console.log("pelicula" + movie);
    const url = 'https://www.omdbapi.com/?s='+movie+'&apikey=thewdb';
    const res = await enviar_datos(url);
    console.log(res);
    res.length != 0 ? llenado_contenedor_html(res) : alert("no se ha encontrado tu pelicula :("); 
}

async function llenado_contenedor_html(res){
    res.Search.forEach((peli) => {
        const { Title, Year, Type, Poster } = peli;
        movies_list.innerHTML += `
            <li class="card">
                <a class="card-image">
                    <img src="${Poster}"/>
                </a>
                <a class="card-description">
                    <h2>${Title}</h2>
                    <small>${Year}</small>
                    <p>${Type}</p>
                    <br>
                </a>
            </li>
                    `;
    });
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