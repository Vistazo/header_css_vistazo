(function () {
      const slider = document.getElementById('team-slider');
      if (!slider) return;

      const track = slider.querySelector('[data-slider-track]');
      const slides = track.querySelectorAll('.slider__slide');
      const dotsContainer = document.querySelector('[data-slider-dots]');
      const dots = dotsContainer.querySelectorAll('.dots__item');

      let currentIndex = 0;
      const totalSlides = slides.length;

      function goTo(index) {
        // Circular: permite wrap-around con teclado
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;

        currentIndex = index;
        track.style.transform = `translateX(-${index * 100}%)`;

        // Actualiza ARIA en diapositivas
        slides.forEach((slide, i) => {
          slide.setAttribute('aria-hidden', i !== index);
        });

        // Actualiza puntos
        dots.forEach((dot, i) => {
          dot.setAttribute('aria-selected', i === index);
        });
      }

      // Click en puntos
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goTo(i));
      });

      // Navegación por teclado (flechas ← →) cuando el slider tiene foco
      slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          goTo(currentIndex + 1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goTo(currentIndex - 1);
        }
      });

      // Soporte táctil básico (swipe)
      let touchStartX = 0;
      let touchEndX = 0;

      track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {           // umbral mínimo
          if (diff > 0) goTo(currentIndex + 1);
          else          goTo(currentIndex - 1);
        }
      }, { passive: true });
    })();