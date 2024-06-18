document.addEventListener("DOMContentLoaded", function() {
    // Obtener todas las etiquetas <a> dentro de la clase .menuIcon
    var links = document.querySelectorAll('.menuIcon a');
    
    // Cambiar el href de la primera etiqueta <a>
    if (links.length > 0) {
        links[0].href = "https://www.instagram.com/mascotasdigital";
    }
    
    // Cambiar el href de la segunda etiqueta <a>
    if (links.length > 1) {
        links[1].href = "https://www.tiktok.com/@mascotasdigital.ec";
    }
});

