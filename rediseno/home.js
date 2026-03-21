// Variable compartida
let slidesData = null;

// Carga el script UNA sola vez y ejecuta callback cuando esté listo
function cargarRevistas(callback) {
    if (slidesData) {
        // Ya está cargado, ejecutar directo
        callback(slidesData);
        return;
    }

    // Verificar si el script ya fue inyectado (está cargando)
    if (document.querySelector('script[src*="revistas.js"]')) {
        // Esperar a que termine de cargar
        document.querySelector('script[src*="revistas.js"]')
            .addEventListener('load', () => callback(slidesData));
        return;
    }

    const script = document.createElement('script');
    script.src = 'https://vzheaders.netlify.app/rediseno/revistas.js';
    script.onload = function () {
        slidesData = window.slidesData; // captura del scope global
        callback(slidesData);
    };
    script.onerror = () => console.error('No se pudo cargar revistas.js');
    document.head.appendChild(script);
}

/* ── Función 1: apertura (primer elemento) ── */
function aperturaRevista() {
    const track = document.getElementById('track');
    cargarRevistas(function (data) {
        const item = data[0];
        track.innerHTML = `
            <div class="slide">
                <div class="cover">
                    <img class="cover-img" src="${item.img}" alt="${item.title}">
                </div>
                <div class="slide-info">
                    <div class="slide-title">${item.title}</div>
                    <div class="slide-edition">${item.edition}</div>
                    <hr/>
                    <a href="${item.link}" class="slide-btn">${item.price}</a>
                </div>
            </div>
        `;
    });
}

/* ── Función 2: swiper completo ── */
function initRevistasSwiper() {
    const wrapper = document.getElementById('revistas-wrapper');
    cargarRevistas(function (data) {
        wrapper.innerHTML = data.map(item => `
            <div class="swiper-slide revista-card">
                <div class="revista-badge">${item.badge ?? item.title}</div>
                <div class="revista-cover">
                    <img width="100%" src="${item.img}" alt="${item.title}">
                </div>
                <div class="revista-body">
                    <p class="revista-edition">${item.edition}</p>
                    <h3 class="revista-title">${item.title}</h3>
                    ${item.description ? `<p class="revista-desc">${item.description}</p>` : ''}
                    <details class="revista-accordion">
                        <summary>¿QUÉ VAS A ENCONTRAR?</summary>
                        <p>${item.content ?? ''}</p>
                    </details>
                    <div class="revista-footer">
                        <span class="revista-price-label">Suscríbete por:</span>
                        <span class="revista-price">${item.price}</span>
                        <a href="${item.link}" class="revista-btn">Suscríbete ahora</a>
                    </div>
                </div>
            </div>
        `).join('');

        new Swiper('.swiper-revistas', {
            slidesPerView: 1,
            spaceBetween: 16,
            pagination: {
                el: '.swiper-revistas-pagination',
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
            }
        });
    });
}

/* ── Init ── */
setTimeout(() => aperturaRevista(), 500);

// Carga Swiper CSS + JS solo al hacer scroll
(function () {
    let loaded = false;
    function loadSwiperAndInit() {
        if (loaded) return;
        loaded = true;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js';
        script.onload = () => initRevistasSwiper();
        document.head.appendChild(script);
    }
    window.addEventListener('scroll', loadSwiperAndInit, { once: true, passive: true });
})();