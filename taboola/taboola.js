document.addEventListener("DOMContentLoaded", function() {
    let taboolaLoaded = false; // Flag para asegurar una carga única
    const taboolaDiv = document.getElementById("taboola-below-article-thumbnails");

    if (taboolaDiv) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !taboolaLoaded) {
                    taboolaLoaded = true; // Marcar como cargado
                    loadTaboolaScripts(); // Llamar a la función para cargar los scripts
                    observer.disconnect(); // Desconectar el observador
                }
            });
        }, {
            rootMargin: "100px 0px",
            threshold: 0.5
        });

        observer.observe(taboolaDiv); // Comenzar a observar
    }

    function loadTaboolaScripts() {
        const script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.async = true;
        script1.src = "//cdn.taboola.com/libtrc/unip/12345/tfa.js"; // URL del script de Taboola
        document.body.appendChild(script1);

        const script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.async = true;
        script2.innerHTML = `
            window._taboola = window._taboola || [];
            _taboola.push({
                mode: 'thumbnails-a',
                container: 'taboola-below-article-thumbnails',
                placement: 'Below Article Thumbnails',
                target_type: 'mix'
            });
            _taboola.push({flush: true});
        `;
        document.body.appendChild(script2);
    }
});
// document.addEventListener("DOMContentLoaded", function() {
//     // Solo ejecutar este código si la pantalla es más ancha que 1024px, común para escritorios
//     if (window.matchMedia("(min-width: 1024px)").matches) {
//         const observer = new IntersectionObserver((entries, observer) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     var taboolaDiv = document.getElementById("taboola-right-rail-thumbnails-scroll");
//                     if (taboolaDiv) {
//                         // Recuperar la URL canónica
//                         var canonicalUrl_art = taboolaDiv.closest(".template-infinity").find('.headline.artit').attr("canonicalurl");

//                         // Renombrar el ID del div de Taboola
//                         var taboolaId = "taboola-right-rail-thumbnails-scroll-" + id_art_infinity;
//                         taboolaDiv.id = taboolaId;

//                         // Configurar e inicializar Taboola
//                         window._taboola = window._taboola || [];
//                         _taboola.push({
//                             mode: 'thumbnails-a',
//                             container: taboolaId,
//                             placement: 'Below Article Thumbnails Widget',
//                             target_type: 'mix'
//                         });
//                         _taboola.push({
//                             article: 'auto',
//                             url: canonicalUrl_art
//                         });

//                         console.log("Taboola initialized for desktop");

//                         // Dejar de observar después de la carga
//                         observer.disconnect();
//                     }
//                 }
//             });
//         }, { threshold: [0.5] });

//         const targetDiv = document.getElementById("taboola-right-rail-thumbnails-scroll");
//         if (targetDiv) {
//             observer.observe(targetDiv);
//         }
//     }
// });

function loadTaboola() {
    window._taboola = window._taboola || [];
    _taboola.push({
        mode: 'alternating-thumbnails-a',
        container: 'taboola-below-article-thumbnails',
        placement: 'Below Article Thumbnails',
        target_type: 'mix'
    });
    _taboola.push({flush: true});
}
function handleFirstInteraction() {
    loadTaboola(); // Llama a la función que carga Taboola
    // Remueve el event listener para asegurar que el script solo se carga una vez
    document.removeEventListener('click', handleFirstInteraction);
}
// Añade el event listener al documento que escucha el primer clic
document.addEventListener('click', handleFirstInteraction);

