(function () {
  "use strict";

  const LOG = false;
  const TARGET_CLASS = "IMG_INF1_INF2_TIT_CARRUSEL";
  const AUTOPLAY_MS = 4000;
  const MAX_WAIT_MS = 3000;
  const RETRY_INTERVAL = 150;
  const LAZY_THRESHOLD = 0.35;

  function debug(...a) {
    if (LOG) console.log("[bmc-carousel]", ...a);
  }

  function lazyActivateMedia(root) {
    if (!root) return;
    root.querySelectorAll("img").forEach((img) => {
      if (img.dataset._lazyLoaded === "1") return;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
        img.removeAttribute("data-srcset");
      }
      if (img.dataset.sizes) {
        img.sizes = img.dataset.sizes;
        img.removeAttribute("data-sizes");
      }
      img.dataset._lazyLoaded = "1";
    });

    root.querySelectorAll("source").forEach((s) => {
      if (s.dataset._lazyLoaded === "1") return;
      if (s.dataset.srcset) {
        s.srcset = s.dataset.srcset;
        s.removeAttribute("data-srcset");
      }
      s.dataset._lazyLoaded = "1";
    });
  }

  function createLazyObserver() {
    return new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= LAZY_THRESHOLD
          ) {
            lazyActivateMedia(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: [LAZY_THRESHOLD] }
    );
  }

  function findItems() {
    return Array.from(document.querySelectorAll("." + TARGET_CLASS));
  }

  // Buscar el contenedor que tiene TODOS los items
  function findCommonHost(items) {
    if (!items || items.length === 0) return null;

    let host = items[0].parentElement;

    while (host && host !== document.body) {
      const count = host.querySelectorAll("." + TARGET_CLASS).length;
      if (count === items.length) {
        return host;
      }
      host = host.parentElement;
    }

    return items[0].parentElement || document.body;
  }

  function createCarousel(items) {
    if (!items || items.length === 0) return;
    if (document.querySelector(".bmc-carousel-wrapper")) return;

    const host = findCommonHost(items) || document.body;

    const wrapper = document.createElement("div");
    wrapper.className = "bmc-carousel-wrapper";

    // NAV (flechas) – se ocultan por CSS, pero se dejan por compatibilidad
    const nav = document.createElement("div");
    nav.className = "bmc-carousel-nav";

    const prevWrap = document.createElement("div");
    const nextWrap = document.createElement("div");
    prevWrap.className = "bmc-prev-wrap";
    nextWrap.className = "bmc-next-wrap";

    const btnPrev = document.createElement("button");
    const btnNext = document.createElement("button");
    btnPrev.innerHTML = "‹";
    btnNext.innerHTML = "›";
    prevWrap.appendChild(btnPrev);
    nextWrap.appendChild(btnNext);
    nav.appendChild(prevWrap);
    nav.appendChild(nextWrap);

    const track = document.createElement("div");
    track.className = "bmc-carousel-track";

    wrapper.appendChild(nav);
    wrapper.appendChild(track);

    host.insertBefore(wrapper, items[0].parentElement);

    const lazyObserver = createLazyObserver();

    items.forEach((item) => {
      item.classList.add("bmc-carousel-item");
      track.appendChild(item);
      lazyObserver.observe(item);
    });

    // Dots de paginación
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "bmc-carousel-dots";
    const dots = [];

    items.forEach((item, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "bmc-dot";
      if (index === 0) dot.classList.add("is-active");

      dot.addEventListener("click", () => {
        const firstItem = track.querySelector(".bmc-carousel-item");
        if (!firstItem) return;
        const gap = parseInt(getComputedStyle(track).gap || 18, 10);
        const width = firstItem.getBoundingClientRect().width + gap;
        currentIndex = index; // sincronizar índice
        const targetLeft = currentIndex * width;
        track.scrollTo({ left: targetLeft, behavior: "smooth" });
        setActiveDot(currentIndex);
      });

      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    wrapper.appendChild(dotsContainer);

    let currentIndex = 0; // 👉 índice del ítem “principal”

    function setActiveDot(idx) {
      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === idx);
      });
    }

    function getCurrentIndex() {
      const firstItem = track.querySelector(".bmc-carousel-item");
      if (!firstItem) return 0;
      const gap = parseInt(getComputedStyle(track).gap || 18, 10);
      const width = firstItem.getBoundingClientRect().width + gap;
      if (width <= 0) return 0;
      return Math.round(track.scrollLeft / width);
    }

    // Actualizar índice y dots cuando hay scroll manual
    track.addEventListener("scroll", () => {
      const idx = getCurrentIndex();
      currentIndex = idx;
      setActiveDot(idx);
    });

    // Scroll controlado por índice (loop perfecto)
    function scrollByStep(dir = 1) {
      const firstItem = track.querySelector(".bmc-carousel-item");
      if (!firstItem) return;

      const gap = parseInt(getComputedStyle(track).gap || 18, 10);
      const width = firstItem.getBoundingClientRect().width + gap;

      currentIndex += dir;
      if (currentIndex >= items.length) currentIndex = 0;
      if (currentIndex < 0) currentIndex = items.length - 1;

      const targetLeft = currentIndex * width;
      track.scrollTo({ left: targetLeft, behavior: "smooth" });
      setActiveDot(currentIndex);
    }

    btnPrev.onclick = () => scrollByStep(-1);
    btnNext.onclick = () => scrollByStep(1);

    // Autoplay en loop (usa el currentIndex, así pasa por TODOS los items)
    let autoplay = setInterval(() => scrollByStep(1), AUTOPLAY_MS);
    wrapper.addEventListener("mouseenter", () => clearInterval(autoplay));
    wrapper.addEventListener(
      "mouseleave",
      () => (autoplay = setInterval(() => scrollByStep(1), AUTOPLAY_MS))
    );

    return wrapper;
  }

  (function init() {
    const start = Date.now();
    function retry() {
      const nodes = findItems();
      if (nodes.length > 0) {
        createCarousel(nodes);
        return;
      }

      if (Date.now() - start > MAX_WAIT_MS) {
        const obs = new MutationObserver((m, o) => {
          const found = findItems();
          if (found.length > 0) {
            o.disconnect();
            createCarousel(found);
          }
        });
        obs.observe(document.body, { childList: true, subtree: true });
        return;
      }

      setTimeout(retry, RETRY_INTERVAL);
    }
    retry();
  })();
})();

/** limpiar duplicados dentro del article */
(function () {
  const TARGET_CLASS = "IMG_INF1_INF2_TIT_CARRUSEL";
  document.querySelectorAll("article").forEach((article) => {
    if (article.querySelector("." + TARGET_CLASS)) {
      article.querySelectorAll("style, script").forEach((n) => {
        const t = n.innerText || "";
        if (t.includes("IMG_INF1_INF2_TIT_CARRUSEL")) n.remove();
      });
    }
  });
})();
