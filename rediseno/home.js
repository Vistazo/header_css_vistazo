
const slidesData = [
    {
        img: "https://codigomarret.online/upload/img/en_circulacion.webp",
        link: "https://suscripciones.vistazo.com/",
        edition: "Edición No.1402 · Dic 4 / 2025",
        title: "Trump Aprieta a Maduro",
        price: "Suscríbete por $5,41/mes"
    },
    {
        img: "https://codigomarret.online/upload/img/revista_2.png",
        link: "https://suscripciones.vistazo.com/",
        edition: "Edición No.1401 · Nov 20 / 2025",
        title: "La Crisis Económica que Viene",
        price: "Suscríbete por $5,41/mes"
    },
    {
        img: "https://codigomarret.online/upload/img/revista_3.png",
        link: "https://suscripciones.vistazo.com/",
        edition: "Edición No.1400 · Nov 6 / 2025",
        title: "El Poder de las Mujeres en Política",
        price: "Suscríbete por $5,41/mes"
    },
    {
        img: "https://codigomarret.online/upload/img/revista_4.png",
        link: "https://suscripciones.vistazo.com/",
        edition: "Edición No.1399 · Oct 23 / 2025",
        title: "Secretos del Narcotráfico Regional",
        price: "Suscríbete por $5,41/mes"
    },
    {
        img: "https://codigomarret.online/upload/img/revista_5.png",
        link: "https://suscripciones.vistazo.com/",
        edition: "Edición No.1398 · Oct 9 / 2025",
        title: "Tecnología e Innovación en Ecuador",
        price: "Suscríbete por $5,41/mes"
    }
];

function initCarousel(data) {
    const clip = document.getElementById('clip');
    const track = document.getElementById('track');
    const dotsEl = document.getElementById('dots');



    /* ── render slides ── */
    track.innerHTML = data.map(item => `
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
`).join('');

    const total = data.length;

    let current = 0;
    let startX = 0, startY = 0, dx = 0, active = false, isHoriz = null;

    const THRESHOLD = 40;
    const EDGE_RESIST = 0.25;

    function goTo(idx, animate = true) {
        current = Math.max(0, Math.min(idx, total - 1));
        track.style.transition = animate ? 'transform 0.38s cubic-bezier(.4,0,.2,1)' : 'none';
        track.style.transform = `translateX(${-current * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    /* dots */
    const dots = Array.from({ length: total }, (_, i) => {
        const d = document.createElement('button');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', `Edición ${i + 1}`);
        d.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(d);
        return d;
    });

    function onStart(x, y) {
        startX = x; startY = y; dx = 0;
        active = true; isHoriz = null;
        track.style.transition = 'none';
        clip.classList.add('dragging');
    }

    function onMove(x, y) {
        if (!active) return;
        dx = x - startX;
        const dy = y - startY;

        if (isHoriz === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
            isHoriz = Math.abs(dx) >= Math.abs(dy);
        }
        if (!isHoriz) return;

        const atEdge = (current === 0 && dx > 0) || (current === total - 1 && dx < 0);
        const pct = (-current * 100) + ((atEdge ? dx * EDGE_RESIST : dx) / clip.offsetWidth * 100);
        track.style.transform = `translateX(${pct}%)`;
    }

    function onEnd() {
        if (!active) return;
        active = false;
        clip.classList.remove('dragging');
        if (!isHoriz) return;
        goTo(Math.abs(dx) > THRESHOLD ? current + (dx < 0 ? 1 : -1) : current);
    }

    clip.addEventListener('mousedown', e => {
        e.preventDefault();
        onStart(e.clientX, e.clientY);
    });
    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', onEnd);

    clip.addEventListener('touchstart', e => {
        onStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    clip.addEventListener('touchmove', e => {
        if (isHoriz === false) return;
        if (isHoriz === true) e.preventDefault();
        onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    clip.addEventListener('touchend', onEnd, { passive: true });

    goTo(0, false);
}

/* init */

setTimeout(() => {
    initCarousel(slidesData);
}, 500);