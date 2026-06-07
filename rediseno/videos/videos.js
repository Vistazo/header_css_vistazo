/* ── Widget: Sección Videos Dailymotion ── */
(function () {

  /* ── Configuración ── */
  var PLAYLIST_ID  = "x9si9u";   // ID de la playlist en Dailymotion
  var LIMIT_LATEST = 7;           // 1 destacado + 6 en lista
  var LIMIT_POP    = 4;           // Videos más vistos

  var DM_FIELDS = "id,title,description,thumbnail_720_url,thumbnail_480_url,thumbnail_240_url,created_time,duration,channel";

  /* ── Mapeo de canales DM → español ── */
  var CHANNEL_NAMES = {
    news:          "Actualidad",
    sport:         "Deportes",
    politics:      "Política",
    travel:        "Viajes",
    tech:          "Tecnología",
    entertainment: "Entretenimiento",
    fun:           "Entretenimiento",
    animals:       "Animales",
    music:         "Música",
    lifestyle:     "Estilo de vida",
    people:        "Gente",
    auto:          "Autos",
    tv:            "TV",
    school:        "Educación",
  };

  function channelLabel(slug) {
    return CHANNEL_NAMES[slug] || "Nacional";
  }

  /* ── Tiempo relativo ── */
  function timeAgo(unix) {
    var diff = Math.floor(Date.now() / 1000) - unix;
    if (diff < 60)    return "Hace " + diff + " seg";
    if (diff < 3600)  return "Hace " + Math.floor(diff / 60) + " min";
    if (diff < 86400) return "Hace " + Math.floor(diff / 3600) + " h";
    var days = Math.floor(diff / 86400);
    return "Hace " + days + (days === 1 ? " día" : " días");
  }

  /* ── Fecha larga ── */
  function formatDate(unix) {
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric", month: "long", year: "numeric"
    }).format(new Date(unix * 1000));
  }

  /* ── Modal ── */
  var modal  = document.getElementById("vz-video-modal");
  var player = document.getElementById("vz-video-player");

  if (!modal || !player) return;

  function openModal(videoId) {
    player.src =
      "https://www.dailymotion.com/embed/video/" + videoId +
      "?autoplay=1&queue-enable=false&sharing-enable=false&ui-logo=false";
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    player.src = "about:blank";
    document.body.style.overflow = "";
  }

  document.querySelector(".vz-video-modal-close")
    .addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  /* ── Render: video destacado ── */
  function renderFeatured(video) {
    var el = document.getElementById("vz-featured-video");
    if (!el) return;
    var img = video.thumbnail_720_url || video.thumbnail_480_url || video.thumbnail_240_url;
    el.innerHTML =
      '<div class="vz-featured-meta">' +
        '<span class="vz-featured-category">' + channelLabel(video.channel) + '</span>' +
        '<span class="vz-featured-time">' + timeAgo(video.created_time) + '</span>' +
      '</div>' +
      '<div class="vz-featured-thumb">' +
        '<img src="' + img + '" alt="' + escHtml(video.title) + '" loading="lazy">' +
      '</div>' +
      '<h3 class="vz-featured-title">' + escHtml(video.title) + '</h3>' +
      (video.description
        ? '<p class="vz-featured-desc">' + escHtml(video.description) + '</p>'
        : '') +
      '<button class="vz-play-btn" type="button">' +
        '<span class="vz-play-icon">&#9654;</span>' +
        '<span>Reproducir</span>' +
      '</button>';
    el.addEventListener("click", function () { openModal(video.id); });
  }

  /* ── Render: lista de videos ── */
  function renderList(videos) {
    var el = document.getElementById("vz-videos-list");
    if (!el) return;
    videos.forEach(function (video) {
      var img = video.thumbnail_480_url || video.thumbnail_240_url;
      var li = document.createElement("li");
      li.innerHTML =
        '<div class="vz-list-thumb">' +
          '<img src="' + img + '" alt="' + escHtml(video.title) + '" loading="lazy">' +
        '</div>' +
        '<div class="vz-list-content">' +
          '<div class="vz-list-meta">' +
            '<span class="vz-list-category">' + channelLabel(video.channel) + '</span>' +
            '<span class="vz-list-time">' + timeAgo(video.created_time) + '</span>' +
          '</div>' +
          '<p class="vz-list-title">' + escHtml(video.title) + '</p>' +
          '<button class="vz-play-btn" type="button">' +
            '<span class="vz-play-icon">&#9654;</span>' +
            '<span>Reproducir</span>' +
          '</button>' +
        '</div>';
      li.addEventListener("click", function () { openModal(video.id); });
      el.appendChild(li);
    });
  }

  /* ── Render: videos más vistos ── */
  function renderPopular(videos) {
    var el = document.getElementById("vz-videos-populares");
    if (!el) return;
    videos.forEach(function (video) {
      var img = video.thumbnail_480_url || video.thumbnail_240_url;
      var li = document.createElement("li");
      li.innerHTML =
        '<div class="vz-pop-thumb">' +
          '<img src="' + img + '" alt="' + escHtml(video.title) + '" loading="lazy">' +
        '</div>' +
        '<div>' +
          '<p class="vz-pop-title">' + escHtml(video.title) + '</p>' +
          '<span class="vz-pop-date">' + formatDate(video.created_time) + '</span>' +
        '</div>';
      li.addEventListener("click", function () { openModal(video.id); });
      el.appendChild(li);
    });
  }

  /* ── Escape HTML ── */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ── Fetch: últimos videos ── */
  fetch(
    "https://api.dailymotion.com/playlist/" + PLAYLIST_ID +
    "/videos?fields=" + DM_FIELDS +
    "&limit=" + LIMIT_LATEST + "&sort=recent"
  )
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data.list || !data.list.length) return;
      renderFeatured(data.list[0]);
      renderList(data.list.slice(1));
    })
    .catch(function (err) {
      console.error("[vz-videos] Error cargando últimos videos:", err);
    });

  /* ── Fetch: más reproducciones ── */
  fetch(
    "https://api.dailymotion.com/playlist/" + PLAYLIST_ID +
    "/videos?fields=id,title,thumbnail_480_url,thumbnail_240_url,created_time" +
    "&limit=" + LIMIT_POP + "&sort=visited"
  )
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data.list || !data.list.length) return;
      renderPopular(data.list);
    })
    .catch(function (err) {
      console.error("[vz-videos] Error cargando videos populares:", err);
    });

})();
