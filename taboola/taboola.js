document.addEventListener("DOMContentLoaded", function() {
    // Detecta si la página está siendo cargada por un bot común o headless browser
    function isLikelyBot() {
        return /bot|crawl|slurp|spider/i.test(navigator.userAgent) || !('onscroll' in window) || /HeadlessChrome/.test(navigator.userAgent);
    }
    if (!isLikelyBot()) return;
        console.log("Bot detectado, no se cargará Taboola");
    let taboolaLoaded = false;
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !taboolaLoaded) {
                // Establecer un retraso antes de cargar los scripts
                setTimeout(() => {
                    taboolaLoaded = true;
                    // Insertar el script de Taboola
                    let script1 = document.createElement("script");
                    script1.type = "text/javascript";
                    script1.async = true;
                    script1.innerHTML = `
                      window._taboola = window._taboola || [];
                      _taboola.push({
                        mode: 'alternating-thumbnails-a',
                        container: 'taboola-below-article-thumbnails',
                        placement: 'Below Article Thumbnails',
                        target_type: 'mix'
                      });
                    `;
                    document.body.appendChild(script1);

                    let script2 = document.createElement("script");
                    script2.type = "text/javascript";
                    script2.async = true;
                    script2.innerHTML = `
                      window._taboola = window._taboola || [];
                      _taboola.push({flush: true});
                    `;
                    document.body.appendChild(script2);

                    // Dejar de observar después de la carga
                    observer.disconnect();
                }, 2000); // Retraso de 2 segundos
            }
        });
    }, { rootMargin: "100px 0px", threshold: 0.5 });

    let taboolaDiv = document.getElementById("taboola-below-article-thumbnails");
    if (taboolaDiv) {
        observer.observe(taboolaDiv);
    }
});
