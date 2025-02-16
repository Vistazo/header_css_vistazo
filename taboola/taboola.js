document.addEventListener("DOMContentLoaded", function() {
    function isLikelyBot() {
        return /bot|crawl|slurp|spider/i.test(navigator.userAgent) || !('onscroll' in window) || /HeadlessChrome/.test(navigator.userAgent);
    }
    
    if (!isLikelyBot()) {
        let taboolaLoaded = false;
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !taboolaLoaded) {
                    // Establecer un retraso antes de cargar los scripts
                    // setTimeout(() => {
                        if (!taboolaLoaded) { // Revisa de nuevo por si la interacción del usuario ya inició la carga
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
                        }
                    // }, 2000); // Retraso de 2 segundos
                }
            });
        }, { rootMargin: "100px 0px", threshold: 0.5 });

        let taboolaDiv = document.getElementById("taboola-below-article-thumbnails");
        if (taboolaDiv) {
            observer.observe(taboolaDiv);
        }

        // Evento para cargar Taboola en la primera interacción
        function handleFirstInteraction() {
            if (!taboolaLoaded) {
                taboolaLoaded = true;
                document.querySelectorAll('script[type="text/taboola"]').forEach(script => {
                    eval(script.innerHTML);
                });
                // Elimina los manejadores de eventos para no cargar Taboola más de una vez
                document.removeEventListener('click', handleFirstInteraction);
                document.removeEventListener('scroll', handleFirstInteraction);
            }
        }

        // Añadir manejadores de eventos para las primeras interacciones del usuario
        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('scroll', handleFirstInteraction, { passive: true });
    }
});
