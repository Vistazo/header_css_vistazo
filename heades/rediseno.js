document.addEventListener("DOMContentLoaded", function() {

    document.querySelector('.nav-links').addEventListener('mouseover', function(event) {
        if (event.target.classList && event.target.classList.length >= 2) {
            const classList = event.target.classList[1]
            if(classList == 'actualidad_link') {
                MostrarSubMenu('actualidad_submenu');
            }else if(classList == 'politica_link') {
                MostrarSubMenu('politica_submenu');
            }else if(classList == 'estilo_link') {
                MostrarSubMenu('estilo_vida_submenu');
            }else if(classList == 'estadio_link') {
                MostrarSubMenu('estadio_submenu');
            }else if(classList == 'portafolio_link') {
                MostrarSubMenu('portafolio_submenu');
            }else if(classList == 'hogar_link' || classList == 'opinion_link' || classList == 'hogar_link') {
                LimpiaHoverMenu();
            }
        }
    });

    // Selecciona todos los enlaces con submenús
    const menuItems = document.querySelectorAll('.movil_nav-links li a.has-submenu');

    // Itera sobre cada elemento que tiene submenú y agrega el evento de clic
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
            const submenu = this.nextElementSibling;
            // Alternar la visibilidad del submenú
            if (submenu.style.display === 'block') {
                submenu.style.display = 'none';
            } else {
                submenu.style.display = 'block';
            }
        });
    });

    // si el tamaño de la pantalla es menor o igual a 768px
    if (window.innerWidth <= 768) {
        document.querySelector('.hamburg_bm').style.display = 'none';
        document.querySelector('.hamburg_bm_movil').style.display = 'block';
    }
        

});

function MostrarSubMenu(classList) {
    LimpiaHoverMenu();
    document.querySelector('.subnav').style.display = 'block';
    document.querySelector('.'+classList).style.display = 'block';
}

function LimpiaHoverMenu() {
    document.querySelector('.subnav').style.display = 'none';
    document.querySelector(".actualidad_submenu").style.display = "none";
    document.querySelector(".politica_submenu").style.display = "none";
    document.querySelector(".estilo_vida_submenu").style.display = "none";
    document.querySelector(".estadio_submenu").style.display = "none";
    document.querySelector(".portafolio_submenu").style.display = "none";
    document.querySelector('.basic_search_bm').style.display = 'none';
    document.querySelector('.menu_burguer_bm').style.display = 'none';
}


function openSearch() {
    // Función para abrir un cuadro de búsqueda
    alert('Abrir cuadro de búsqueda');
}

function toggleMenu() {
    const menu = document.querySelector('.menu_burguer_bm');
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

function toggleSearch() {
    const searchBox = document.querySelector('.basic_search_bm');
    searchBox.style.display = (searchBox.style.display === 'none' || searchBox.style.display === '') ? 'block' : 'none';
}

function toggleMenuMovil() {
    const menu = document.querySelector('.menu_movil');
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
}

