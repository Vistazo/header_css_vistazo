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
