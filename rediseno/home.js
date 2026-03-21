/* ═══════════════════════════════════════════
   CARGA DE DATA (compartida entre funciones)
═══════════════════════════════════════════ */
let _revistasData = null;

function cargarRevistas(callback) {
    if (_revistasData) { callback(_revistasData); return; }
    fetch('https://vzheaders.netlify.app/rediseno/revistas.js')
        .then(r => r.text())
        .then(jsText => {
            const fn = new Function(`
                ${jsText.replace('const slidesData', 'var slidesData')}
                return slidesData;
            `);
            _revistasData = fn();
            callback(_revistasData);
        })
        .catch(err => console.error('Error cargando revistas:', err));
}

/* ═══════════════════════════════════════════
   CAROUSEL PROPIO (sin librerías externas)
   Uso:
   createCarousel(wrapperEl, slides, {
       perView: { mobile: 1, tablet: 2, desktop: 4 },
       gap: 16
   })
═══════════════════════════════════════════ */
function createCarousel(container, slides, options) {
    const cfg = Object.assign({ perView: { mobile: 1, tablet: 2, desktop: 4 }, gap: 16 }, options || {});

    function getSlidesPerView() {
        const w = window.innerWidth;
        if (w >= 1024) return cfg.perView.desktop;
        if (w >= 640)  return cfg.perView.tablet;
        return cfg.perView.mobile;
    }

    let current = 0;
    let total   = slides.length;
    let perView = getSlidesPerView();
    let maxIdx  = () => Math.max(0, total - perView);

    /* ── estructura DOM ── */
    container.style.cssText = 'position:relative;overflow:hidden;width:100%;';

    const track = document.createElement('div');
    track.style.cssText = `display:flex;will-change:transform;transition:transform .35s cubic-bezier(.4,0,.2,1);gap:${cfg.gap}px;`;

    slides.forEach(slideEl => {
        slideEl.style.cssText = `flex:0 0 auto;box-sizing:border-box;`;
        track.appendChild(slideEl);
    });
    container.appendChild(track);

    /* ── paginación ── */
    const pagination = document.createElement('div');
    pagination.style.cssText = 'display:flex;justify-content:center;gap:8px;margin-top:20px;';

    function buildDots() {
        pagination.innerHTML = '';
        const dotCount = maxIdx() + 1;
        for (let i = 0; i < dotCount; i++) {
            const btn = document.createElement('button');
            btn.setAttribute('aria-label', `Ir a slide ${i + 1}`);
            btn.style.cssText = `width:8px;height:8px;border-radius:50%;border:none;cursor:pointer;padding:0;transition:all .2s;background:${i === current ? '#d0021b' : '#ccc'};transform:${i === current ? 'scale(1.3)' : 'scale(1)'};`;
            btn.addEventListener('click', () => goTo(i));
            pagination.appendChild(btn);
        }
    }

    container.parentNode && container.parentNode.insertBefore(pagination, container.nextSibling);

    /* ── lógica de posición ── */
    function setSlideWidths() {
        perView = getSlidesPerView();
        const totalGap = cfg.gap * (perView - 1);
        const slideW   = (container.offsetWidth - totalGap) / perView;
        slides.forEach(s => { s.style.width = slideW + 'px'; });
    }

    function goTo(idx, animate = true) {
        current = Math.max(0, Math.min(idx, maxIdx()));
        const slideW   = slides[0] ? slides[0].offsetWidth : 0;
        const offset   = current * (slideW + cfg.gap);
        track.style.transition = animate ? 'transform .35s cubic-bezier(.4,0,.2,1)' : 'none';
        track.style.transform  = `translateX(-${offset}px)`;
        /* actualizar dots */
        Array.from(pagination.children).forEach((d, i) => {
            d.style.background = i === current ? '#d0021b' : '#ccc';
            d.style.transform  = i === current ? 'scale(1.3)' : 'scale(1)';
        });
    }

    function init() {
        setSlideWidths();
        buildDots();
        goTo(0, false);
    }

    /* ── resize ── */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const oldPerView = perView;
            setSlideWidths();
            buildDots();
            if (current > maxIdx()) current = maxIdx();
            goTo(current, false);
        }, 120);
    });

    /* ── drag / swipe ── */
    let startX = 0, startY = 0, dragX = 0, dragging = false, isHoriz = null;
    const THRESHOLD = 40;
    const RESIST    = 0.25;

    function dragStart(x, y) {
        startX = x; startY = y; dragX = 0;
        dragging = true; isHoriz = null;
        track.style.transition = 'none';
    }

    function dragMove(x, y) {
        if (!dragging) return;
        dragX     = x - startX;
        const dy  = y - startY;
        if (isHoriz === null && (Math.abs(dragX) > 6 || Math.abs(dy) > 6)) {
            isHoriz = Math.abs(dragX) >= Math.abs(dy);
        }
        if (!isHoriz) return;
        const slideW   = slides[0] ? slides[0].offsetWidth : 0;
        const base     = -current * (slideW + cfg.gap);
        const atStart  = current === 0 && dragX > 0;
        const atEnd    = current === maxIdx() && dragX < 0;
        const delta    = (atStart || atEnd) ? dragX * RESIST : dragX;
        track.style.transform = `translateX(${base + delta}px)`;
    }

    function dragEnd() {
        if (!dragging) return;
        dragging = false;
        if (!isHoriz) return;
        goTo(Math.abs(dragX) > THRESHOLD ? current + (dragX < 0 ? 1 : -1) : current);
    }

    /* mouse */
    container.addEventListener('mousedown', e => { e.preventDefault(); dragStart(e.clientX, e.clientY); });
    window.addEventListener('mousemove',    e => dragMove(e.clientX, e.clientY));
    window.addEventListener('mouseup',      dragEnd);

    /* touch */
    container.addEventListener('touchstart', e => dragStart(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
    container.addEventListener('touchmove',  e => {
        if (isHoriz === false) return;
        if (isHoriz === true) e.preventDefault();
        dragMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    container.addEventListener('touchend', dragEnd, { passive: true });

    init();
    return { goTo, refresh: init };
}

/* ═══════════════════════════════════════════
   FUNCIÓN 1 — apertura (NO TOCAR)
═══════════════════════════════════════════ */
function aperturaRevista() {
    const track  = document.getElementById('track');
    const dotsEl = document.getElementById('dots');
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
            </div>`;
    });
}

/* ═══════════════════════════════════════════
   FUNCIÓN 2 — swiper de revistas
═══════════════════════════════════════════ */
function initRevistasSwiper() {
    const wrapper = document.getElementById('revistas-wrapper');
    if (!wrapper) return;

    cargarRevistas(function (data) {
        const slideEls = data.map(item => {
            const div = document.createElement('div');
            div.className = 'revista-card';
            div.innerHTML = `
                <div class="revista-badge">
                    <span class="revista-categoria">${item.badge ?? item.categoria ?? item.title}</span>
                </div>
                <div class="revista-cover">
                    <img src="${item.img}" alt="${item.title}" loading="lazy" width="100%">
                </div>
                <div class="revista-body">
                    ${item.description ? `<p class="revista-desc">${item.description}</p>` : ''}
                    <div class="revista-footer">
                        <span class="revista-price">${item.price}</span>
                        <a href="${item.link}" class="revista-btn">Suscríbete ahora</a>
                    </div>
                </div>`;
            return div;
        });

        createCarousel(wrapper, slideEls, {
            perView: { mobile: 1, tablet: 2, desktop: 4 },
            gap: 20
        });
    });
}

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
setTimeout(() => aperturaRevista(), 500);

(function () {
    let loaded = false;
    function onScroll() {
        if (loaded) return;
        loaded = true;
        initRevistasSwiper();
    }
    window.addEventListener('scroll', onScroll, { once: true, passive: true });
})();