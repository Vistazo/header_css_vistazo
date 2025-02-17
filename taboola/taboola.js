document.addEventListener("DOMContentLoaded", function() {
    function isLikelyBot() {
        return /bot|crawl|slurp|spider/i.test(navigator.userAgent) || !('onscroll' in window) || /HeadlessChrome/.test(navigator.userAgent);
    }
    
    if (!isLikelyBot()) {
        let taboolaLoaded = false;
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !taboolaLoaded) {
                    taboolaLoaded = true; // Marca como cargado
                    // Insertar el script de Taboola
                    let script1 = document.createElement("script");
                    script1.type = "text/javascript";
                    script1.async = true;
                    script1.src = "//cdn.taboola.com/libtrc/unip/12345/tfa.js"; // Asegúrate de usar la URL correcta
                    document.body.appendChild(script1);

                    let script2 = document.createElement("script");
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

                    // Dejar de observar después de la carga
                    observer.disconnect();
                }
            });
        }, { rootMargin: "100px 0px", threshold: 0.5 });

        let taboolaDiv = document.getElementById("taboola-below-article-thumbnails");
        if (taboolaDiv) {
            observer.observe(taboolaDiv);
        }
    }
});
