(function initContactoFaq() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }

  function setup() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item) => {
      const question = item.querySelector('.faq-question');
      const answer   = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      // Estado inicial accesible
      question.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');

      question.addEventListener('click', () => {
        const willOpen = !item.classList.contains('active');

        // Acordeón: cierra los demás (quita esta línea si quieres permitir varios abiertos)
        items.forEach((other) => {
          if (other !== item) {
            other.classList.remove('active');
            const q = other.querySelector('.faq-question');
            if (q) q.setAttribute('aria-expanded', 'false');
          }
        });

        item.classList.toggle('active', willOpen);
        question.setAttribute('aria-expanded', String(willOpen));
      });
    });
  }
})();
