// Variable compartida
let _revistasData = null;
let _revistasPromise = null;
const REVISTAS_DATA_URL = 'https://vzheaders.netlify.app/rediseno/revistas.json';
const REVISTAS_STORAGE_KEY = 'revistasDataCache';
const REVISTAS_STORAGE_HASH_KEY = 'revistasDataCacheHash';
const REVISTAS_STORAGE_SYNC_KEY = 'revistasDataCacheLastSync';
const REVISTAS_SYNC_INTERVAL_MS = 10 * 60 * 1000;
let _syncInProgress = false;

function hashString(value) {
    let hash = 5381;
    for (let i = 0; i < value.length; i++) {
        hash = (hash * 33) ^ value.charCodeAt(i);
    }
    return (hash >>> 0).toString(16);
}

function shouldSyncCache() {
    try {
        const lastSync = Number(localStorage.getItem(REVISTAS_STORAGE_SYNC_KEY) || 0);
        return Date.now() - lastSync > REVISTAS_SYNC_INTERVAL_MS;
    } catch (_) {
        return true;
    }
}

function markCacheSync() {
    try {
        localStorage.setItem(REVISTAS_STORAGE_SYNC_KEY, String(Date.now()));
    } catch (_) {
        // Ignora errores de almacenamiento (modo privado/cuota)
    }
}

function getRevistasFromStorage() {
    try {
        const cached = localStorage.getItem(REVISTAS_STORAGE_KEY);
        if (!cached) return null;
        const parsed = JSON.parse(cached);
        return Array.isArray(parsed) ? parsed : null;
    } catch (_) {
        return null;
    }
}

function setRevistasToStorage(data) {
    try {
        localStorage.setItem(REVISTAS_STORAGE_KEY, JSON.stringify(data));
        markCacheSync();
    } catch (_) {
        // Ignora errores de almacenamiento (modo privado/cuota)
    }
}

function normalizeRevistasPayload(payload) {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.data)) return payload.data;
    return [];
}

function fetchRevistasData() {
    if (_revistasPromise) return _revistasPromise;

    _revistasPromise = fetch(REVISTAS_DATA_URL)
        .then(r => r.text())
        .then(rawText => {
            const payload = JSON.parse(rawText);
            const freshData = normalizeRevistasPayload(payload);
            const nextHash = hashString(rawText);
            const prevHash = localStorage.getItem(REVISTAS_STORAGE_HASH_KEY);

            _revistasData = freshData;
            if (nextHash !== prevHash || !getRevistasFromStorage()) {
                setRevistasToStorage(freshData);
                localStorage.setItem(REVISTAS_STORAGE_HASH_KEY, nextHash);
            } else {
                markCacheSync();
            }

            return freshData;
        })
        .catch(err => {
            console.error('Error cargando revistas:', err);
            return getRevistasFromStorage() || [];
        })
        .finally(() => {
            _revistasPromise = null;
        });

    return _revistasPromise;
}

function syncRevistasInBackground() {
    if (_syncInProgress || !shouldSyncCache()) return;
    _syncInProgress = true;
    fetchRevistasData().finally(() => {
        _syncInProgress = false;
    });
}

// Carga el script UNA sola vez y ejecuta callback cuando esté listo
function cargarRevistas(callback) {
    if (_revistasData) {
        callback(_revistasData);
        syncRevistasInBackground();
        return;
    }

    const storageData = getRevistasFromStorage();
    if (storageData) {
        _revistasData = storageData;
        callback(_revistasData);
        syncRevistasInBackground();
        return;
    }

    if (_revistasPromise) {
        _revistasPromise.then(callback);
        return;
    }

    fetchRevistasData().then(data => {
        callback(data || []);
    });
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
                   <!-- <div class="slide-title">${item.title}</div> -->
                    <!-- <div class="slide-edition">${item.edition}</div> -->
                    <hr/>
                   <!-- <a href="${item.link}" class="slide-btn">${item.price}</a> -->
                    <a href="${item.link}" class="slide-btn">Suscribirse ahora</a>

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
                <div class="revista-badge">
                    <span class="revista-categoria">${item.badge ?? item.categoria}</span>
                </div>
                <div class="revista-cover">
                    <img width="100%" src="${item.img}" alt="${item.title}">
                </div>
                <div class="revista-body">
                     <!-- <p class="revista-edition">${item.edition}</p> -->
                    <!-- <h3 class="revista-title">${item.title}</h3> -->
                    ${item.description ? `<p class="revista-desc">${item.description}</p>` : ''}
                    <!-- <details class="revista-accordion">
                        <summary>¿QUÉ VAS A ENCONTRAR?</summary>
                        <p>${item.content ?? ''}</p>
                    </details> -->
                    <div class="revista-footer">
                        <div class="revista-price">
                            <span class="price-label">Suscríbete por:</span>
                            <span class="price-value"> ${item.price}</span>
                       </div>
                        <a href="${item.link}" class="revista-btn">Suscribirse ahora</a>
                    </div>
                </div>
            </div>
        `).join('');

        new Swiper('.swiper-revistas', {
            slidesPerView: 1,
            spaceBetween: 16,
            observer: true,          // 👈 recalcula si el DOM cambia
            observeParents: true,    // 👈 recalcula si el padre cambia
            observeSlideChildren: true,
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
        document.body.appendChild(script);
    }
    window.addEventListener('scroll', loadSwiperAndInit, { once: true, passive: true });
})();