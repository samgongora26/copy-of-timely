async function enviar_datos(url, datos) {
    try {
      const res = await fetch(url, { method: "POST", body: datos });
      const data = await res.json();
      return data;
    } catch (error) {
      //console.log(error);
    }
}

export async function existe_cuenta() {
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