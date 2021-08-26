document.getElementById("btn_menu").addEventListener("click", mostrar_menu);

menu = document.getElementById("header");
body = document.getElementById("container_all");
nav = document.getElementById("nav");

function mostrar_menu(){
    
    menu.classList.toggle('move_content');
    body.classList.toggle('move_content');
    nav.classList.toggle('move_nav');
}

window.addEventListener("resize", function(){

    if(window.innerWidth > 760){

    
    nav.classList.remove('move_nav');
    }

})