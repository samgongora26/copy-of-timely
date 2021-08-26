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

$(document).ready(function(){
    var $cabecera = $('#header');
    var $logo = $('#logo');
    var previousScroll = 0;
    $(window).scroll(function(event){
       var scroll = $(this).scrollTop();
       if (scroll > previousScroll && scroll > 200){
           $cabecera.addClass('bgcolor');
       } else {
           $cabecera.removeClass('bgcolor');
       }
       previousScroll = scroll;    });
 
  });