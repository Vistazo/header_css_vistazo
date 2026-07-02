(function () {
    var ARROW_PREV =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
    var ARROW_NEXT =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

    function perView() {
        return window.innerWidth >= 768 ? 3 : 1;
    }

    function initCarousel(portlet) {
        var section = portlet.querySelector('.noticias');
        if (!section) return;

        var articles = Array.from(section.querySelectorAll('article'));
        if (articles.length <= perView()) return;

        // Envolver en contenedor con overflow hidden
        var wrapper = document.createElement('div');
        wrapper.className = 'carousel-wrapper';
        section.parentNode.insertBefore(wrapper, section);
        wrapper.appendChild(section);

        // Crear botones
        var controls = document.createElement('div');
        controls.className = 'carousel-controls';

        var prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn';
        prevBtn.setAttribute('aria-label', 'Anterior');
        prevBtn.innerHTML = ARROW_PREV;

        var nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn';
        nextBtn.setAttribute('aria-label', 'Siguiente');
        nextBtn.innerHTML = ARROW_NEXT;

        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
        wrapper.insertAdjacentElement('afterend', controls);

        var current = 0;

        function gap() {
            return 24;
        }

        function slideWidth() {
            return articles[0] ? articles[0].offsetWidth + gap() : 0;
        }

        function maxIndex() {
            return Math.max(0, articles.length - perView());
        }

        function update() {
            section.style.transform = 'translateX(-' + (current * slideWidth()) + 'px)';
            prevBtn.disabled = current <= 0;
            nextBtn.disabled = current >= maxIndex();
        }

        prevBtn.addEventListener('click', function () {
            if (current > 0) { current--; update(); }
        });

        nextBtn.addEventListener('click', function () {
            if (current < maxIndex()) { current++; update(); }
        });

        window.addEventListener('resize', function () {
            current = Math.min(current, maxIndex());
            update();
        });

        update();
    }

    function init() {
        document.querySelectorAll('.listado-seis-notas').forEach(initCarousel);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
