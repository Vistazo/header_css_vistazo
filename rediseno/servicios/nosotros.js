(function initTeamSlider() {
  'use strict';

  // Espera a que el DOM esté listo (evita null si el script
  // se carga antes del HTML del slider)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  function setup() {
    const slider = document.getElementById('team-slider');
    if (!slider) return;

    const track         = slider.querySelector('[data-slider-track]');
    const dotsContainer = document.querySelector('[data-slider-dots]');

    // Null-checks defensivos: si falta alguna pieza, no rompe la página
    if (!track || !dotsContainer) return;

    const slides = track.querySelectorAll('.slider__slide');
    const dots   = dotsContainer.querySelectorAll('.dots__item');

    if (!slides.length || !dots.length) return;

    const totalSlides = slides.length;
    let currentIndex  = 0;

    function goTo(index) {
      // Circular
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;

      currentIndex = index;
      track.style.transform = `translateX(-${index * 100}%)`;

      // Sincroniza ARIA
      slides.forEach((slide, i) => {
        slide.setAttribute('aria-hidden', String(i !== index));
      });
      dots.forEach((dot, i) => {
        dot.setAttribute('aria-selected', String(i === index));
      });
    }

    // --- Click en puntos ---
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    // --- Teclado (← →) ---
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(currentIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(currentIndex - 1);
      }
    });

    // --- Swipe táctil con discriminación H/V ---
    // Evita que un scroll vertical con leve desvío lateral dispare el slide.
    const SWIPE_THRESHOLD = 50;   // px mínimos para considerar swipe
    const DIRECTION_LOCK  = 1.2;  // |dx| debe ser > |dy| * este factor

    let touchStartX = 0;
    let touchStartY = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const dx = touchStartX - e.changedTouches[0].screenX;
      const dy = touchStartY - e.changedTouches[0].screenY;

      // Solo actúa si fue gesto claramente horizontal
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * DIRECTION_LOCK) {
        goTo(dx > 0 ? currentIndex + 1 : currentIndex - 1);
      }
    }, { passive: true });
  }
})();
