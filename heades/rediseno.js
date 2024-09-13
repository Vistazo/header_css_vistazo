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

