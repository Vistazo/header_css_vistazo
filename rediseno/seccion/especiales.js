(function () {
    var ARROW_PREV =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
    var ARROW_NEXT =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

    function initCarousel(portlet) {
        var track = portlet.querySelector('.noticias');
        if (!track) return;

        var articles = track.querySelectorAll('article');
        if (articles.length <= 1) return;

        // Botones
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
        track.insertAdjacentElement('afterend', controls);

        function slideWidth() {
            var first = track.querySelector('article');
            return first ? first.offsetWidth + 24 : 300;
        }

        function updateBtns() {
            prevBtn.disabled = track.scrollLeft <= 4;
            nextBtn.disabled = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 4;
        }

        prevBtn.addEventListener('click', function () {
            track.scrollBy({ left: -slideWidth(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', function () {
            track.scrollBy({ left: slideWidth(), behavior: 'smooth' });
        });

        track.addEventListener('scroll', updateBtns, { passive: true });
        window.addEventListener('resize', updateBtns);
        updateBtns();
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
