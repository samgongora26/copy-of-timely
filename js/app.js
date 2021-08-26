//variables del dom
const btn_search_movie = document.querySelector("#btn_search_movie");
const movies_list = document.querySelector("#movies_list");
const movie_txt = document.querySelector('#movie');
const form_data = document.querySelector('#form_movie');

const names = document.querySelector("#name");
const email = document.querySelector("#email");
const paquete = document.querySelector("#paquete");
const cost = document.querySelector("#cost");

//Event listener
paquete.addEventListener("change" ,calcular_precio);
btn_search_movie.addEventListener("click", busca_peliculas);
form_data.addEventListener("submit", guardar_datos);

async function peticion_api(url) {
    try {
      const res = await fetch(url, { method: "POST", body: "" });
      const data = await res.json();
      return data;
    } catch (error) {
    }
}

async function enviar_datos(url, datos) {
    try {
      const res = await fetch(url, { method: "POST", body: datos });
      const data = await res.json();
      return data;
    } catch (error) {
    }
  }

async function busca_peliculas(e) {
    e.preventDefault();
    movies_list.innerHTML="";
    let movies = movie_txt.value;
    const url = 'https://www.omdbapi.com/?s='+movies+'&apikey=thewdb';
    const res = await peticion_api(url);
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
    const url = 'https://www.omdbapi.com/?t='+movie+'&apikey=thewdb';
    const res = await peticion_api(url);
    res.length != 0 ? llenado_contenedor_html_especifico(res) : alert("no se ha encontrado tu pelicula :("); 
}

async function llenado_contenedor_html_especifico(res){
    movie_txt.value = res.Title;
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

async function guardar_datos(e) {
    e.preventDefault();
    let txt_name = names.value;
    let txt_email = email.value;
    let txt_costo = cost.value;
    let txt_movie = movie_txt.value;

    var selected = paquete.options[paquete.selectedIndex].text;

    if (txt_name != "" && txt_email != "" && selected != "" && txt_costo != "" && txt_movie != ""){

        //Almacenando los datos en un JSON
        var Datos_form = [];

        var NuevoForm = {
            nombre: txt_name,
            email: txt_email,
            paquete: selected,
            precio : txt_costo,
            pelicula : txt_movie
        };
        console.log("Json creado:")
        console.log(NuevoForm); 
        Datos_form.push(NuevoForm);

        //ENVIANDO LOS DATOS AL BACKEND PARA GENERAR EL CORREO

        const url_1 = "php/enviar_correo.php";
        const datos = new FormData();
        datos.append("nombre", txt_name);
        datos.append("email", txt_email);
        datos.append("paquete", selected);
        datos.append("precio", txt_costo);
        datos.append("pelicula", txt_movie);
    
        let del_back = await enviar_datos(url_1, datos);
        console.log("Respuesta del backend al validar los datos");
        console.log(del_back);
        
    }
    else{
        alert("Verifica que hayas llenado el formulario");
    }
    
}

function calcular_precio(){
    //costo inicial
    const costo_inicial = 100;
    var precio = 0;
    var precio = costo_inicial + parseInt(paquete.value);
        cost.value = "$" + precio; 
}

