async function solicitarPermisoNotificaciones() {
  if (!("Notification" in window)) {
      console.error("Las notificaciones no están soportadas en este navegador.");
      return;
  }

  // Verificar el estado actual de los permisos
  const permisoActual = Notification.permission;

  if (permisoActual === "granted") {
      console.log("Permisos de notificación ya otorgados.");
      mostrarNotificacion("¡Hola!", "Ya tienes las notificaciones activadas.");
  } else if (permisoActual === "denied") {
      console.warn("Permiso de notificaciones denegado. Por favor, habilítalo manualmente.");
      // Opcional: Mostrar instrucciones al usuario.
      mostrarInstruccionesPermiso();
  } else if (permisoActual === "default") {
      console.log("Permisos de notificación aún no solicitados. Solicitando...");
      try {
          const nuevoPermiso = await Notification.requestPermission();
          if (nuevoPermiso === "granted") {
            console.log("Permisos otorgados por el usuario.");
            mostrarNotificacion("¡Gracias!", "Ahora las notificaciones están habilitadas.");
          } else if (nuevoPermiso === "denied") {
            console.warn("El usuario denegó los permisos de notificación.");
            mostrarInstruccionesPermiso();
          }
      } catch (error) {
          console.error("Error solicitando permisos de notificación:", error);
      }
  }
}

function mostrarNotificacion(titulo, cuerpo) {
  if ("Notification" in window) {
      new Notification(titulo, { body: cuerpo });
  }
}

function mostrarInstruccionesPermiso() {
  // Proporcionar instrucciones amigables al usuario para habilitar permisos manualmente.
  // alert(
  //     "Para activar las notificaciones, ve a la configuración del navegador, busca la sección de notificaciones para este sitio web y habilítalas."
  // );
}

// Llamar automáticamente a la función al cargar la página
solicitarPermisoNotificaciones();

// Mover relacionadas debajo de la imagen
document.addEventListener('DOMContentLoaded', function () {
    const relacionadas = document.querySelector('.r_relacionadas');
    const imagenBlock = document.querySelector('.R_AUTOR_IMG_REDES .mt-2');
    if (relacionadas && imagenBlock) {
        imagenBlock.insertAdjacentElement('afterend', relacionadas);
    }
});



/* ── Función: tarjetas "Lea también" / "REVISE TAMBIÉN" ── */
(function () {
  var LABEL_RE = /^(REVISE\s+TAMBIÉN|LEA\s+TAMBIÉN|Lea\s+también)\s*:?\s*/i;

  function injectLeaTambienStyles() {
    if (document.getElementById("lea-tambien-styles")) return;
    var s = document.createElement("style");
    s.id = "lea-tambien-styles";
    s.textContent = [
      ".lea-tambien-card{border-left:3px solid #e60000;background:#f5f5f5;padding:10px 14px;margin:18px 0;display:block;}",
      ".lea-tambien-label{font-size:10px;font-weight:700;color:#e60000;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;}",
      ".lea-tambien-body{display:flex;gap:12px;align-items:flex-start;}",
      ".lea-tambien-text{flex:1;min-width:0;}",
      ".lea-tambien-title{font-size:14px;font-weight:600;color:#111;text-decoration:none;line-height:1.4;display:block;}",
      ".lea-tambien-title:hover{color:#e60000;}",
      ".lea-tambien-date{font-size:12px;color:#888;margin-top:5px;display:block;}",
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
      var title = link.textContent.trim();
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

// Activar notificaciones asi la pagina las tenga desactivadas
async function activarNotificaciones() {
  // Verificar el estado actual del permiso
  Notification.requestPermission().then(permission => {
    console.log("Estado de permisos:", permission);
      if (permission === "granted") {
          // Notificaciones ya activadas
          new Notification("¡Notificaciones activadas con éxito!", {
              body: "Ahora recibirás notificaciones importantes.",
              icon: "https://codigomarret.online/upload/img/logo-vis.png" // Reemplaza con la URL del icono de tu aplicación
          });
      } else if (permission === "denied") {
          // Si están denegadas, informa al usuario que debe activarlas manualmente
          alert("Parece que tienes las notificaciones desactivadas. Por favor, actívalas manualmente en la configuración del navegador.");
      } else {
          // Caso "default" o cuando el usuario no interactúa
          alert("Por favor, habilita las notificaciones para recibir actualizaciones.");
      }
  }).catch(error => {
      console.error("Error al solicitar notificaciones:", error);
  });
}
