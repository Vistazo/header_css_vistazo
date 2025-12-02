document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".slider_opinion_home_bm");

  sliders.forEach((root) => {
    const viewport = root.querySelector(".bx-viewport");
    const track = root.querySelector(".parent-nav.lst");
    const items = track ? Array.from(track.querySelectorAll(".lst-item")) : [];
    if (!viewport || !track || items.length === 0) return;

    // No volver a inicializar el mismo slider
    if (root.dataset.bmSliderInit === "1") return;
    root.dataset.bmSliderInit = "1";

    let perView = 1;
    let pageCount = 1;
    let currentPage = 0;
    let autoTimer = null;
    const AUTO_TIME = 5000; // 5s

    // Crear contenedor de puntos
    const dotsWrapper = document.createElement("div");
    dotsWrapper.className = "slider-bm-dots";
    viewport.after(dotsWrapper);

    function getPerView() {
      const w = window.innerWidth;
      if (w >= 1200) return 4; // desktop grande
      if (w >= 992) return 3;  // desktop normal
      if (w >= 768) return 2;  // tablet
      return 1;                // móvil
    }

    function buildLayout() {
      perView = getPerView();
      pageCount = Math.ceil(items.length / perView);

      // ancho de cada item según cuántos van por vista
      const basis = 100 / perView;
      items.forEach((li) => {
        li.style.flex = `0 0 ${basis}%`;
      });

      // rehacer puntos
      dotsWrapper.innerHTML = "";
      for (let i = 0; i < pageCount; i++) {
        const btn = document.createElement("button");
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => {
          currentPage = i;
          updatePosition();
          resetAuto();
        });
        dotsWrapper.appendChild(btn);
      }

      updatePosition();
    }

    function updatePosition() {
      const pageWidth = viewport.clientWidth;
      const offset = -currentPage * pageWidth;
      track.style.transform = `translateX(${offset}px)`;

      const dots = dotsWrapper.querySelectorAll("button");
      dots.forEach((d, idx) => d.classList.toggle("active", idx === currentPage));
    }

    function nextPage() {
      currentPage = (currentPage + 1) % pageCount;
      updatePosition();
    }

    function startAuto() {
      autoTimer = setInterval(nextPage, AUTO_TIME);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    // Eventos
    window.addEventListener("resize", () => {
      buildLayout();
    });

    // Pausar en hover (desktop)
    root.addEventListener("mouseenter", () => clearInterval(autoTimer));
    root.addEventListener("mouseleave", resetAuto);

    // Si quieres usar las flechas existentes de bx
    const prevBtn = root.querySelector(".bx-prev");
    const nextBtn = root.querySelector(".bx-next");
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = (currentPage - 1 + pageCount) % pageCount;
        updatePosition();
        resetAuto();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        nextPage();
        resetAuto();
      });
    }

    // Inicializar
    buildLayout();
    startAuto();
  });
});
