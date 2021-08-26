<?php 
//Validacion del formulario
function validaRequerido($valor){
    //Aqui validamos valores que son totalmente requeridos
    if(trim($valor) == ''){
       return false;
    }else{
       return true;
    }
}

function validaEmail($valor){
    //Aqui validamos si el correo es correcto
    if(filter_var($valor, FILTER_VALIDATE_EMAIL) === FALSE){
       return false;
    }else{
       return true;
    }
 }

function crear_mail():array{
    try {
        $nombre = $_POST["nombre"];
        $email = $_POST["email"];
        $paquete = $_POST["paquete"];
        $precio = $_POST["precio"];
        $pelicula = $_POST["pelicula"];
        if(!validaRequerido($nombre) || 
            !validaEmail($email) || 
            !validaRequerido($paquete) || 
            !validaRequerido($precio) || 
            !validaRequerido($pelicula) ){
            //si no está validado 
            $respuesta = array(
                'respuesta' => "hay datos vacios o el correo es erroneo",
                'nombre' => $nombre,
                'email' => $email,
                'paquete' => $paquete,
                'precio' => $precio,
                'pelicula' => $pelicula
            );
        }
        else{
            //si está validado 
            $respuesta = array(
                'respuesta del backend' => "ok",
                'nombre' => $nombre,
                'email' => $email,
                'paquete' => $paquete,
                'precio' => $precio,
                'pelicula' => $pelicula
            ); 

            //Preparando el correo.
            $contenido = "¡Hola ". $nombre . "!" ."\n Se ha registrado la pelicula: ".$pelicula;
            //Esta manera es en la que se puede enviar un correo por el servidor.
            //Es necesario contar con un servidor para poder usarlo
            //ds mail($email, $contenido);
        }
        
    } catch (\Throwable $th) {
        $respuesta = array(
            'respuesta' => "catch"
        );
    }
    
    
    return $respuesta;
}

$resultado = crear_mail();
echo json_encode(($resultado));

?>