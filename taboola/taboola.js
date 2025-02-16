
  document.addEventListener("DOMContentLoaded", function() {
      let taboolaLoaded = false; // Para asegurarnos de que solo se carga una vez
      let observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
              if (entry.isIntersecting && !taboolaLoaded) {
                  taboolaLoaded = true;
                  // Insertar el script de Taboola cuando el usuario ve el div
                  let script1 = document.createElement("script");
                  script1.type = "text/javascript";
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
                  script2.innerHTML = `
                    window._taboola = window._taboola || [];
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
  });