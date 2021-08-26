//variables del dom
const btn_search_movie = document.querySelector("#btn_search_movie");
const movies_list = document.querySelector("#movies_list");
btn_search_movie.addEventListener("click", busca_peliculas);
const movie_txt = document.querySelector('#movie');

async function enviar_datos(url) {
    try {
      const res = await fetch(url, { method: "POST", body: "" });
      const data = await res.json();
      return data;
    } catch (error) {
      //console.log(error);
    }
}

async function busca_peliculas(e) {
    e.preventDefault();
    movies_list.innerHTML="";
    let movies = movie_txt.value;
    console.log("pelicula " + movies);
    const url = 'https://www.omdbapi.com/?s='+movies+'&apikey=thewdb';
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
                    <button type="button" onclick="busca_pelicula('${Title}');" class="buy-now">Elegir pelicula<i class="fa fa-check"></i></button>
                </a>
            </li>
                    `;
    });
}

async function busca_pelicula(movie) {
    movies_list.innerHTML="";
    console.log("pelicula" + movie);
    const url = 'https://www.omdbapi.com/?t='+movie+'&apikey=thewdb';
    const res = await enviar_datos(url);
    console.log(res);
    res.length != 0 ? llenado_contenedor_html_especifico(res) : alert("no se ha encontrado tu pelicula :("); 
}

async function llenado_contenedor_html_especifico(res){
    movies_list.innerHTML += `
            <li class="card">
                <a class="card-image">
                    <img src="${res.Poster}"/>
                </a>
                <a class="card-description">
                    <h2>${res.Title}</h2>
                    <small>${res.Year}</small> <small>${res.Released}</small>
                    <p>${res.Type}</p> <small> ${res.Genre} </small>
                    <p>${res.Rated}</p>
                    <p>Director: ${res.Director}</p>
                    <small>${res.Plot}</small>
                    <br>
                    <br>
                    <button onclick="elegir_pelicula(${res.Title})"; class="buy-now">Elegir pelicula<i class="fa fa-check"></i></button>
                </a>
            </li>
                    `;
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

