
// Esperar a que el contenido de la página esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el contenedor por su ID
    var container = document.getElementById('1828323451');
    // Seleccionar todas las imágenes dentro del contenedor
    var images = container.getElementsByTagName('img');
    // Crear un array para almacenar las URLs
    var urls = [];

    // Iterar sobre cada imagen para extraer la URL y almacenarla en el array
    for (var i = 0; i < images.length; i++) {
        urls.push(images[i].src); // Añadir la URL al array
    }
    container.innerHTML = '';
    // Imprimir todas las URLs
    console.log(urls);
    setImagenes(urls);
});

function setImagenes(urls) {
    var carouselInner = document.querySelector('#carouselExampleIndicators .carousel-inner');
    var carouselIndicators = document.querySelector('#carouselExampleIndicators .carousel-indicators');

    // Limpiar el contenido existente
    carouselInner.innerHTML = '';
    carouselIndicators.innerHTML = '';

    // Añadir nuevas imágenes e indicadores
    urls.forEach(function(url, index) {
        // Crear elemento para la imagen del carrusel
        var carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item' + (index === 0 ? ' active' : '');
        var img = document.createElement('img');
        img.className = 'd-block w-100';
        img.alt = 'Slide ' + (index + 1);
        img.src = url;

        // Añadir imagen al div.carousel-item
        carouselItem.appendChild(img);
        
        // Añadir carousel-item al carrusel
        carouselInner.appendChild(carouselItem);

        // Crear y añadir indicadores
        var indicator = document.createElement('button');
        indicator.setAttribute('type', 'button');
        indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
        indicator.setAttribute('data-bs-slide-to', index);
        indicator.className = index === 0 ? 'active' : '';
        indicator.setAttribute('aria-label', 'Slide ' + (index + 1));

        // Añadir indicador a la lista de indicadores
        carouselIndicators.appendChild(indicator);
    });
}
