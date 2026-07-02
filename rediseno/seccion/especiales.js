(function () {
    function perView() {
        return window.innerWidth >= 768 ? 3 : 1;
    }

    function initCarousel(portlet) {
        var track = portlet.querySelector('.noticias');
        if (!track) return;

        var articles = Array.from(track.querySelectorAll('article'));
        var total = articles.length;
        if (total <= 1) return;

        var stops = Math.max(1, total - perView() + 1);

        // Contenedor de puntitos
        var dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';

        var dots = [];
        for (var i = 0; i < stops; i++) {
            var dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Ir a nota ' + (i + 1));
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }

        track.insertAdjacentElement('afterend', dotsContainer);

        function slideWidth() {
            return articles[0] ? articles[0].offsetWidth + 24 : 300;
        }

        function currentIndex() {
            return Math.round(track.scrollLeft / slideWidth());
        }

        function updateDots() {
            var idx = Math.min(currentIndex(), dots.length - 1);
            dots.forEach(function (d, i) {
                d.classList.toggle('active', i === idx);
            });
        }

        // Clic en punto navega a esa posición
        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                track.scrollTo({ left: i * slideWidth(), behavior: 'smooth' });
            });
        });

        track.addEventListener('scroll', updateDots, { passive: true });

        window.addEventListener('resize', function () {
            var newStops = Math.max(1, total - perView() + 1);
            // Reconstruir dots si cambia el número de stops
            if (newStops !== dots.length) {
                dotsContainer.innerHTML = '';
                dots = [];
                for (var i = 0; i < newStops; i++) {
                    var d = document.createElement('button');
                    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                    d.setAttribute('aria-label', 'Ir a nota ' + (i + 1));
                    (function(idx){ d.addEventListener('click', function () {
                        track.scrollTo({ left: idx * slideWidth(), behavior: 'smooth' });
                    }); })(i);
                    dotsContainer.appendChild(d);
                    dots.push(d);
                }
            }
            updateDots();
        });

        updateDots();
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
