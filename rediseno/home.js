// Variable compartida
let _revistasData = null;
let _revistasPromise = null;
const REVISTAS_DATA_URL = "https://backoffice.bmcodigo.com/api/v1/revistas";
const REVISTAS_STORAGE_KEY = "revistasDataCache";
const REVISTAS_STORAGE_HASH_KEY = "revistasDataCacheHash";
const REVISTAS_STORAGE_SYNC_KEY = "revistasDataCacheLastSync";
const REVISTAS_CACHE_TTL_MS = 1 * 60 * 1000;

// Fuerza consulta a la API en cada carga de página
try { localStorage.removeItem(REVISTAS_STORAGE_SYNC_KEY); } catch (_) {}
let _syncInProgress = false;

function hashString(value) {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

function cacheAge() {
  try {
    return Date.now() - Number(localStorage.getItem(REVISTAS_STORAGE_SYNC_KEY) || 0);
  } catch (_) {
    return Infinity;
  }
}

function shouldSyncCache() {
  return cacheAge() > REVISTAS_CACHE_TTL_MS;
}

function markCacheSync() {
  try {
    localStorage.setItem(REVISTAS_STORAGE_SYNC_KEY, String(Date.now()));
  } catch (_) {
    // Ignora errores de almacenamiento (modo privado/cuota)
  }
}

function getRevistasFromStorage() {
  try {
    if (cacheAge() > REVISTAS_CACHE_TTL_MS) return null;
    const cached = localStorage.getItem(REVISTAS_STORAGE_KEY);
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    return Array.isArray(parsed) ? parsed : null;
  } catch (_) {
    return null;
  }
}

function setRevistasToStorage(data) {
  try {
    localStorage.setItem(REVISTAS_STORAGE_KEY, JSON.stringify(data));
    markCacheSync();
  } catch (_) {
    // Ignora errores de almacenamiento (modo privado/cuota)
  }
}

function normalizeRevistasPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
}

function fetchRevistasData() {
  if (_revistasPromise) return _revistasPromise;

  _revistasPromise = fetch(REVISTAS_DATA_URL)
    .then((r) => r.text())
    .then((rawText) => {
      const payload = JSON.parse(rawText);
      const freshData = normalizeRevistasPayload(payload);
      const nextHash = hashString(rawText);
      const prevHash = localStorage.getItem(REVISTAS_STORAGE_HASH_KEY);

      _revistasData = freshData;
      if (nextHash !== prevHash || !getRevistasFromStorage()) {
        setRevistasToStorage(freshData);
        localStorage.setItem(REVISTAS_STORAGE_HASH_KEY, nextHash);
      } else {
        markCacheSync();
      }

      return freshData;
    })
    .catch((err) => {
      console.error("Error cargando revistas:", err);
      return getRevistasFromStorage() || [];
    })
    .finally(() => {
      _revistasPromise = null;
    });

  return _revistasPromise;
}

function syncRevistasInBackground() {
  if (_syncInProgress || !shouldSyncCache()) return;
  _syncInProgress = true;
  fetchRevistasData().finally(() => {
    _syncInProgress = false;
  });
}

// Carga el script UNA sola vez y ejecuta callback cuando esté listo
function cargarRevistas(callback) {
  if (_revistasData) {
    callback(_revistasData);
    syncRevistasInBackground();
    return;
  }

  const storageData = getRevistasFromStorage();
  if (storageData) {
    _revistasData = storageData;
    callback(_revistasData);
    syncRevistasInBackground();
    return;
  }

  if (_revistasPromise) {
    _revistasPromise.then(callback);
    return;
  }

  fetchRevistasData().then((data) => {
    callback(data || []);
  });
}

/* ── Función 1: apertura (primer elemento) ── */
function aperturaRevista() {
  const track = document.getElementById("track");
  cargarRevistas(function (data) {
    if (!data || data.length === 0) {
      track.innerHTML = "<p>No hay revistas disponibles.</p>";
      return;
    }

    // Construir los slides
    const slidesHTML = data
      .map(function (item) {
        const precioMensual =
          item.priceMonthly || calcularPrecioMensual(item.price);
        return `
                <div class="slide">
                    <div class="cover">
                        <img class="cover-img" src="${item.img}" alt="${item.title}">
                    </div>
                    <div class="slide-info">
                        <div class="slide-title">${item.title}</div>
                        <!-- <div class="slide-edition">${item.edition}</div> -->
                        <hr/>
                        <a href="${item.link}" class="slide-btn" target="_blank" rel="noopener noreferrer">Suscríbete ahora ${precioMensual} /anual</a>
                    </div>
                </div>
            `;
      })
      .join("");

    // Construir los dots según la cantidad real de revistas
    const dotsHTML = data
      .map(function (_, index) {
        return `<span class="dot${index === 0 ? " active" : ""}" data-index="${index}"></span>`;
      })
      .join("");

    // Insertar todo en el DOM
    track.innerHTML = slidesHTML;

    // Insertar los dots después del track (o donde corresponda en tu HTML)
    let dotsContainer = document.querySelector(".slider-wrapper .dots");
    if (!dotsContainer) {
      dotsContainer = document.createElement("div");
      dotsContainer.className = "dots";
      track.parentNode.parentNode.appendChild(dotsContainer);
    }
    dotsContainer.innerHTML = dotsHTML;

    // Inicializar el carrusel
    initCarrusel(track, dotsContainer, data.length);
  });
}

function initCarrusel(track, dotsContainer, totalSlides) {
  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let trackWidth = 0;

  const clip = track.parentNode; // .slider-clip

  function updateTrackWidth() {
    trackWidth = clip.offsetWidth;
  }

  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentIndex = index;
    track.style.transition = "transform 0.4s ease";
    track.style.transform = `translateX(${-currentIndex * 100}%)`;
    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  // Click en los dots
  dotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dot")) {
      const index = parseInt(e.target.getAttribute("data-index"), 10);
      goToSlide(index);
    }
  });

  // Soporte para drag/swipe con mouse
  clip.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = "none";
    clip.classList.add("dragging");
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    track.style.transform = `translateX(calc(${-currentIndex * 100}% + ${currentX}px))`;
  });

  document.addEventListener("mouseup", function () {
    if (!isDragging) return;
    isDragging = false;
    clip.classList.remove("dragging");
    handleDragEnd();
  });

  // Soporte para touch (móvil)
  clip.addEventListener(
    "touchstart",
    function (e) {
      isDragging = true;
      startX = e.touches[0].clientX;
      track.style.transition = "none";
    },
    { passive: true },
  );

  clip.addEventListener(
    "touchmove",
    function (e) {
      if (!isDragging) return;
      currentX = e.touches[0].clientX - startX;
      track.style.transform = `translateX(calc(${-currentIndex * 100}% + ${currentX}px))`;
    },
    { passive: true },
  );

  clip.addEventListener("touchend", function () {
    if (!isDragging) return;
    isDragging = false;
    handleDragEnd();
  });

  function handleDragEnd() {
    updateTrackWidth();
    const threshold = trackWidth * 0.2; // 20% del ancho para cambiar de slide

    if (currentX < -threshold && currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    } else if (currentX > threshold && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex);
    }
    currentX = 0;
  }

  // Actualizar al redimensionar
  window.addEventListener("resize", updateTrackWidth);
  updateTrackWidth();
}

function calcularPrecioMensual(precioAnual) {
  const match = String(precioAnual).match(/[\d.,]+/);
  if (!match) return precioAnual;
  const numero = parseFloat(match[0].replace(",", "."));
  if (isNaN(numero)) return precioAnual;
  const mensual = (numero).toFixed(2).replace(".", ",");
  return `$${mensual}`;
}

/* ── Función 2: swiper completo ── */
function initRevistasSwiper() {
  const wrapper = document.getElementById("revistas-wrapper");
  cargarRevistas(function (data) {
    wrapper.innerHTML = data
      .map(
        (item) => `
            <div class="swiper-slide revista-card">
                <div class="revista-badge">
                    <span class="revista-categoria">${item.badge ?? item.categoria}</span>
                </div>
                <div class="revista-cover">
                    <img width="100%" src="${item.img}" alt="${item.title}">
                </div>
                <div class="revista-body">
                     <!-- <p class="revista-edition">${item.edition}</p> -->
                    <!-- <h3 class="revista-title">${item.title}</h3> -->
                    ${item.description ? `<p class="revista-desc">${item.description}</p>` : ""}
                    <!-- <details class="revista-accordion">
                        <summary>¿QUÉ VAS A ENCONTRAR?</summary>
                        <p>${item.content ?? ""}</p>
                    </details> -->
                    <div class="revista-footer">
                        <div class="revista-price">
                            <span class="price-label">Suscríbete por:</span>
                            <span class="price-value"> ${item.price}</span>
                       </div>
                        <a href="${item.link}" class="revista-btn">Suscribirse ahora</a>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");

    new Swiper(".swiper-revistas", {
      slidesPerView: 1,
      spaceBetween: 16,
      observer: true, // 👈 recalcula si el DOM cambia
      observeParents: true, // 👈 recalcula si el padre cambia
      observeSlideChildren: true,
      pagination: {
        el: ".swiper-revistas-pagination",
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1280: { slidesPerView: 4, spaceBetween: 24 },
      },
    });
  });
}

/* ── Función 2: swiper completo ── */
function initVideosSwiper() {
  const playlistId = "x9si9u";
  const player = document.getElementById("mainVideoPlayer");
  const carousel = document.getElementById("videoCarousel");

  // Crear modal una sola vez
  const overlay = document.createElement("div");
  overlay.className = "video-modal-overlay";
  overlay.innerHTML = `
    <div class="video-modal-inner">
      <button class="video-modal-close" aria-label="Cerrar">&#x2715;</button>
      <iframe id="modalVideoPlayer" src="about:blank" allow="autoplay; fullscreen" allowfullscreen></iframe>
    </div>
  `;
  document.body.appendChild(overlay);

  const modalPlayer = overlay.querySelector("#modalVideoPlayer");

  function openModal(videoId) {
    modalPlayer.src = `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1`;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("active");
    modalPlayer.src = "about:blank";
    document.body.style.overflow = "";
  }

  overlay.querySelector(".video-modal-close").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  fetch(
    `https://api.dailymotion.com/playlist/${playlistId}/videos?fields=id,title,thumbnail_240_url,duration&limit=12`,
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.list || data.list.length === 0) {
        carousel.innerHTML = "<p>No hay videos disponibles.</p>";
        return;
      }

      const firstVideo = data.list[0];
      player.src = `https://www.dailymotion.com/embed/video/${firstVideo.id}?autoplay=1`;

      data.list.forEach((video) => {
        const durationMin = Math.floor(video.duration / 60);
        const durationSec = String(video.duration % 60).padStart(2, "0");

        const div = document.createElement("div");
        div.className = "video-card swiper-slide";
        div.innerHTML = `
                    <img class="video-thumbnail" src="${video.thumbnail_240_url}" alt="${video.title}">
                    <div class="title">${video.title}</div>
                    <div class="duration">
                        <img width="28" height="28" src="https://codigomarret.online/upload/img/iconplayvideo.svg" alt="Duración">
                        ${durationMin}:${durationSec}
                    </div>
                `;

        div.addEventListener("click", () => {
          openModal(video.id);
        });

        carousel.appendChild(div);
      });
    })
    .catch((err) => {
      carousel.innerHTML = "<p>Error al cargar videos.</p>";
      console.error(err);
    });

  new Swiper(".carousel-container", {
    slidesPerView: 1.5,
    spaceBetween: 16,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    pagination: {
      el: ".swiper-videos-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      640: { slidesPerView: 2.5, spaceBetween: 20 },
      1024: { slidesPerView: 6, spaceBetween: 24 },
      1280: { slidesPerView: 6, spaceBetween: 24 },
    },
  });
}

/* ── Función 3: swiper patrocinado ── */
function initPatrocinadoSwiper() {
  const patrocinadoList = document.querySelector(".patrocidado-lista");
  if (!patrocinadoList) return;

  const noticias = patrocinadoList.querySelector(".noticias");
  if (!noticias) return;

  // Evita inicializar dos veces
  if (patrocinadoList.classList.contains("swiper-initialized")) return;

  patrocinadoList.classList.add("swiper", "swiper-patrocinado");
  noticias.classList.add("swiper-wrapper");

  const articles = noticias.querySelectorAll(".article.element");
  articles.forEach((article) => article.classList.add("swiper-slide"));

  let pagination = patrocinadoList.querySelector(
    ".patrocidado-lista .swiper-pagination",
  );
  if (!pagination) {
    pagination = document.createElement("div");
    pagination.className = "swiper-pagination";
    noticias.insertAdjacentElement("afterend", pagination);
  }

  new Swiper(".swiper-patrocinado", {
    slidesPerView: 1,
    spaceBetween: 16,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    pagination: {
      el: ".patrocidado-lista .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 24 },
    },
  });
}

/* ── Función 4: swiper cartas ── */
let _cartasAuthToken = "";
let _cartasSwiperInstance = null;
const CARTAS_API_URL = "https://backoffice.bmcodigo.com/api/letters";
const CARTAS_AUTH_API_URL =
  "https://backoffice.bmcodigo.com/api/public/auth/token";
const CARTAS_AUTH_CREDENTIALS = {
  email: "eriveraec@gmail.com",
  password: "123456",
  name: "Mi Sitio Web",
};

function escapeCartasHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatCartasPublishDate(dateValue) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

async function getCartasAuthToken() {
  if (_cartasAuthToken) {
    return _cartasAuthToken;
  }

  const tokenResponse = await fetch(CARTAS_AUTH_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CARTAS_AUTH_CREDENTIALS),
  });

  const tokenResult = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenResult || !tokenResult.token) {
    const authErrorMessage =
      tokenResult && tokenResult.message
        ? tokenResult.message
        : "No se pudo obtener el token de autenticacion.";
    throw new Error(authErrorMessage);
  }

  _cartasAuthToken = `Bearer ${tokenResult.token}`;
  return _cartasAuthToken;
}

function renderCartas(letters, mountNode) {
  const approvedLetters = (letters || []).filter(function (letter) {
    return letter && letter.status === "approved";
  });

  if (!approvedLetters.length) {
    mountNode.innerHTML = [
      '<div class="noticias-swiper swiper noticias">',
      '  <div class="swiper-wrapper"></div>',
      '</div>',
    ].join("\n");
    return;
  }

  mountNode.innerHTML = [
    '<div class="noticias-swiper swiper noticias">',
    '  <div class="swiper-wrapper">',
    approvedLetters
      .map(function (letter) {
        const title = escapeCartasHtml(letter.title);
        const content = escapeCartasHtml(letter.content);
        const authorName = escapeCartasHtml(letter.authorName);
        const publishDate = escapeCartasHtml(
          formatCartasPublishDate(letter.publishDate),
        );
        const articleId = escapeCartasHtml(letter.id || "");

        return [
          '<article class="swiper-slide article " iteridart="' +
            articleId +
            '">',
          '  <div class="R_HOME_CARTAS">',
          '    <div class="media_block">',
          '      <div class="text_block">',
          '        <div class="headline">',
          '          ',
          '            <h2>' + title + '</h2>',
          '          ',
          '        </div>',
          '        <div class="text_block2">',
          '          <div class="text">',
          '            <div class="text-wrapper">',
          '              <p>' + content + '</p>',
          '            </div>',
          '          </div>',
          '        </div>',
          '        <div class="sect-date">',
          '          <div class="inf2">',
          '            <ul>',
          '              <li class="author">' + authorName + '</li>',
          '              <li class="" itemprop="datePublished"> ' +
            publishDate +
            " </li>",
          '            </ul>',
          '          </div>',
          '        </div>',
          '      </div>',
          '    </div>',
          '  </div>',
          '</article>',
        ].join("\n");
      })
      .join("\n"),
    '  </div>',
    '  <div class="swiper-pagination"></div>',
    '</div>',
  ].join("\n");

  setTimeout(initCartasSwiperInstance, 500);
}

async function loadCartas() {
  const mountNode = document.querySelector(".seccion-listado-cartas");
  if (!mountNode) {
    return;
  }

  mountNode.innerHTML = [
    '<div class="noticias-swiper swiper noticias">',
    '  <div class="swiper-wrapper"></div>',
    '</div>',
  ].join("\n");

  try {
    const token = await getCartasAuthToken();
    const response = await fetch(CARTAS_API_URL, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result && result.message
          ? result.message
          : "No se pudieron cargar las cartas.",
      );
    }

    renderCartas(result.letters || [], mountNode);
  } catch (error) {
    mountNode.innerHTML = '<section class="noticias"></section>';
    console.error("Error al cargar las cartas:", error);
  }
}

function initCartasSwiperInstance() {
  if (typeof Swiper === "undefined") {
    return;
  }

  if (_cartasSwiperInstance && typeof _cartasSwiperInstance.destroy === "function") {
    _cartasSwiperInstance.destroy(true, true);
  }

  _cartasSwiperInstance = new Swiper(".noticias-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: ".noticias-swiper .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".noticias-swiper .swiper-button-next",
      prevEl: ".noticias-swiper .swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    },
  });
}

function initCartasSwiper() {
  loadCartas();
}

/* ── Función: últimos videos ── */
/* ── Función: últimos videos ── */
function initUltimosVideos() {
  const gridEl = document.getElementById("ultimosVideosGrid");
  const dotsEl = document.getElementById("ultimosVideosDots");
  if (!gridEl || !dotsEl) return;

  const playlistId = "x9si9u";

  // Montar estructura Swiper en el contenedor existente
  gridEl.classList.add("swiper", "ultimos-videos-swiper");
  const wrapper = document.createElement("div");
  wrapper.className = "swiper-wrapper";
  gridEl.appendChild(wrapper);

  // Usar dotsEl como paginación Swiper
  dotsEl.className = "ultimos-videos-dots swiper-pagination";

  // Modal
  const overlay = document.createElement("div");
  overlay.className = "video-modal-overlay";
  overlay.innerHTML =
    '<div class="video-modal-inner">' +
      '<button class="video-modal-close" aria-label="Cerrar">&#x2715;</button>' +
      '<iframe id="ultimosModalPlayer" src="about:blank" allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen></iframe>' +
    "</div>";
  document.body.appendChild(overlay);

  const modalPlayer = overlay.querySelector("#ultimosModalPlayer");

  function openModal(videoId) {
    modalPlayer.src =
      "https://www.dailymotion.com/embed/video/" +
      videoId +
      "?autoplay=1&queue-enable=false&sharing-enable=false";
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.classList.remove("active");
    modalPlayer.src = "about:blank";
    document.body.style.overflow = "";
  }

  overlay.querySelector(".video-modal-close").addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  function formatDuration(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = String(seconds % 60).padStart(2, "0");
    return min + ":" + sec;
  }

  fetch(
    "https://api.dailymotion.com/playlist/" +
      playlistId +
      "/videos?fields=id,title,thumbnail_720_url,thumbnail_480_url,thumbnail_240_url,duration&limit=6",
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.list || data.list.length === 0) {
        gridEl.innerHTML = '<p class="ultimos-videos-empty">No hay videos disponibles.</p>';
        return;
      }

      data.list.forEach((video) => {
        const img = video.thumbnail_720_url || video.thumbnail_480_url || video.thumbnail_240_url;
        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        const card = document.createElement("article");
        card.className = "ultimos-videos-card";
        card.innerHTML =
          '<div class="ultimos-videos-thumb">' +
            '<img src="' + img + '" alt="' + video.title + '" loading="lazy">' +
            '<div class="ultimos-videos-play-overlay">' +
              '<div class="ultimos-videos-play-btn">&#9654;</div>' +
            "</div>" +
          "</div>" +
          '<h3 class="ultimos-videos-card-title">' + video.title + "</h3>" +
          '<div class="ultimos-videos-meta">' +
            '<span class="ultimos-videos-play-icon">&#9654;</span>' +
            "<span>" + formatDuration(video.duration) + "</span>" +
          "</div>";

        card.addEventListener("click", () => openModal(video.id));
        slide.appendChild(card);
        wrapper.appendChild(slide);
      });

      new Swiper(".ultimos-videos-swiper", {
        slidesPerView: 1.2,
        spaceBetween: 16,
        pagination: {
          el: dotsEl,
          clickable: true,
          dynamicBullets: true,
        },
        breakpoints: {
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        },
      });
    })
    .catch((err) => {
      gridEl.innerHTML = '<p class="ultimos-videos-error">Error al cargar videos.</p>';
      console.error(err);
    });
}

/* ── Función: tarjetas "Lea también" / "REVISE TAMBIÉN" ── */
(function () {
  // LEA TAMBIEN, LEA
  const LABEL_RE = /^(REVISE\s+TAMBIÉN|LEA\s+TAMBIÉN|Lea\s+también|LEA\s+TAMBIEN|Lea\s+tambien)\s*:?\s*/i;
  

  function injectLeaTambienStyles() {
    if (document.getElementById("lea-tambien-styles")) return;
    const s = document.createElement("style");
    s.id = "lea-tambien-styles";
    s.textContent = [
      ".lea-tambien-card{border-left:3px solid #111;background:#F3F2ED;padding:10px 14px;margin:18px 0;display:block;}",
      ".lea-tambien-label{font-size:10px;font-weight:700;color:#111;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;}",
      ".lea-tambien-body{display:flex;gap:12px;align-items:flex-start;}",
      ".lea-tambien-text{flex:1;min-width:0;}",
      ".lea-tambien-title{font-size:14px;font-weight:600;color:#e60000;text-decoration:none;line-height:1.4;display:block;}",
      ".lea-tambien-title:hover{color:#b30000;}",
      ".lea-tambien-date{font-size:12px;color:#555;margin-top:5px;display:block;}",
      ".lea-tambien-thumb{flex-shrink:0;width:80px;height:60px;overflow:hidden;background:#ddd;}",
      ".lea-tambien-thumb img{width:100%;height:100%;object-fit:cover;display:block;}",
    ].join("");
    document.head.appendChild(s);
  }

  function formatLeaTambienDate(raw) {
    var d = new Date(raw);
    if (isNaN(d.getTime())) return "";
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    }).format(d);
  }

  function extractDateFromUrl(url) {
    var m = url.match(/\/(\d{4}-\d{2}-\d{2})[/-]/);
    return m ? formatLeaTambienDate(m[1]) : "";
  }

  function buildLeaTambienCard(href, title, date) {
    var card = document.createElement("div");
    card.className = "lea-tambien-card";
    card.innerHTML =
      '<div class="lea-tambien-label">LEA TAMBIÉN</div>' +
      '<div class="lea-tambien-body">' +
        '<div class="lea-tambien-text">' +
          '<a class="lea-tambien-title" href="' + href + '">' + title + "</a>" +
          '<span class="lea-tambien-date">' + date + "</span>" +
        "</div>" +
      "</div>";
    return card;
  }

  function enrichLeaTambienCard(card, href) {
    fetch(href)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");

        var ogImg = doc.querySelector('meta[property="og:image"]');
        if (ogImg && ogImg.getAttribute("content")) {
          var body = card.querySelector(".lea-tambien-body");
          var thumb = document.createElement("div");
          thumb.className = "lea-tambien-thumb";
          thumb.innerHTML = '<img src="' + ogImg.getAttribute("content") + '" alt="" loading="lazy">';
          body.appendChild(thumb);
        }

        var dateMeta = doc.querySelector(
          'meta[property="article:published_time"],' +
          'meta[name="date"],' +
          'meta[name="DC.date"],' +
          'time[itemprop="datePublished"]'
        );
        if (dateMeta) {
          var raw = dateMeta.getAttribute("content") || dateMeta.getAttribute("datetime");
          var formatted = formatLeaTambienDate(raw);
          if (formatted) {
            var dateEl = card.querySelector(".lea-tambien-date");
            if (dateEl) dateEl.textContent = formatted;
          }
        }
      })
      .catch(function () {});
  }

  function transformLeaTambien() {
    injectLeaTambienStyles();
    var paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(function (p) {
      if (!LABEL_RE.test(p.textContent.trim())) return;
      var link = p.querySelector("a[href]");
      if (!link) return;

      var href = link.href;
      var title = p.textContent.trim().replace(LABEL_RE, "").trim();
      if (!title) title = link.textContent.trim().replace(LABEL_RE, "").trim();
      var date = extractDateFromUrl(href);
      var card = buildLeaTambienCard(href, title, date);

      p.parentNode.replaceChild(card, p);

      try {
        if (new URL(href).hostname === window.location.hostname) {
          enrichLeaTambienCard(card, href);
        }
      } catch (_) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", transformLeaTambien);
  } else {
    transformLeaTambien();
  }
})();

/* ── Init ── */
setTimeout(() => {
  aperturaRevista();
}, 500);

// Carga Swiper CSS + JS solo al hacer scroll
(function () {
  let loaded = false;
  function loadSwiperAndInit() {
    if (loaded) return;
    loaded = true;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js";
    script.onload = () => {
      initRevistasSwiper();
      initVideosSwiper();
      initPatrocinadoSwiper();
      initCartasSwiper();
      initUltimosVideos();
    };

    document.body.appendChild(script);
  }
  window.addEventListener("scroll", loadSwiperAndInit, {
    once: true,
    passive: true,
  });
})();
