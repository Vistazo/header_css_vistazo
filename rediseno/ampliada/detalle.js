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

// Reformatear fechas del live blog: "2026/06/07 16:23" → pill "16:23 PM" + pill "7 junio 2026"
(function () {
    var MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

    function reformatDates() {
        document.querySelectorAll('.r_date_post[data-date]:not([data-reformed])').forEach(function (el) {
            var raw = el.getAttribute('data-date');
            var m = raw.match(/(\d{4})[\/\-](\d{2})[\/\-](\d{2})\s+(\d{2}):(\d{2})/);
            if (!m) return;

            var hours    = parseInt(m[4], 10);
            var minutes  = parseInt(m[5], 10);
            var day      = parseInt(m[3], 10);
            var monthIdx = parseInt(m[2], 10) - 1;
            var year     = m[1];

            var ampm    = hours >= 12 ? 'PM' : 'AM';
            var timeStr = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ' ' + ampm;
            var dateStr = day + ' ' + MESES[monthIdx] + ' ' + year;

            el.innerHTML =
                '<span class="r_time_post">' + timeStr + '</span>' +
                '<span class="r_dateonly_post">' + dateStr + '</span>';
            el.setAttribute('data-reformed', '1');
        });
    }

    function init() {
        reformatDates();

        // Reintentos cada 400ms hasta 6s por si el contenido carga dinámicamente
        var attempts = 0;
        var interval = setInterval(function () {
            reformatDates();
            if (++attempts >= 15) clearInterval(interval);
        }, 400);

        // MutationObserver como respaldo continuo
        new MutationObserver(function (mutations) {
            if (mutations.some(function (m) { return m.addedNodes.length > 0; })) {
                reformatDates();
            }
        }).observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// Mover relacionadas debajo de la imagen
document.addEventListener('DOMContentLoaded', function () {
    const relacionadas = document.querySelector('.r_relacionadas');
    const imagenBlock = document.querySelector('.R_AUTOR_IMG_REDES .mt-2');
    if (relacionadas && imagenBlock) {
        const relatedContent = relacionadas.querySelector('.relatedContent');
        if (relatedContent && !relatedContent.querySelector('.r_te-puede-interesar')) {
            const label = document.createElement('p');
            label.className = 'r_te-puede-interesar';
            label.textContent = 'Te puede interesar:';
            relatedContent.insertBefore(label, relatedContent.firstChild);
        }
        imagenBlock.insertAdjacentElement('afterend', relacionadas);
    }

    // Reemplazar imagen de Google por botón
    const wrapper = document.querySelector('.canal_whatsapp_movil');
    if (wrapper) {
        const imgLink = wrapper.querySelector('a:not(.vtz-wsp-card):not(.vtz-google-btn)');
        if (imgLink) {
            imgLink.classList.add('vtz-google-news-btn');
            imgLink.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">' +
                '<path stroke="none" d="M0 0h24v24H0z" fill="none"/>' +
                '<path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z"/>' +
                '</svg>' +
                '<span>Agregar en Google</span>';
        }
    }
});



/* ── Función: tarjetas "Lea también" / "REVISE TAMBIÉN" ── */
(function () {
  // LEA TAMBIEN, LEA tambien
  var LABEL_RE = /^(REVISE\s+TAMBIÉN|LEA\s+TAMBIÉN|Lea\s+también|LEA\s+TAMBIEN|Lea\s+tambien)\s*:?\s*/i;

  function injectLeaTambienStyles() {
    if (document.getElementById("lea-tambien-styles")) return;
    var s = document.createElement("style");
    s.id = "lea-tambien-styles";
    s.textContent = [
      ".lea-tambien-card{border-left:3px solid #111;background:#F3F2ED;padding:10px 14px;margin:18px 0;display:block;}",
      ".lea-tambien-label{font-size:10px;font-weight:700;color:#111;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;}",
      ".lea-tambien-body{display:flex;gap:12px;align-items:flex-start;}",
      ".lea-tambien-text{flex:1;min-width:0;}",
      ".lea-tambien-title{font-family:'Zalando Sans',sans-serif;font-size:16px;font-weight:500;color:#111;text-decoration:none;line-height:1;display:block;}",
      ".lea-tambien-title:hover{color:#111;}",
      ".lea-tambien-first{color:#e60000;}",
      ".lea-tambien-title:hover .lea-tambien-first{color:#b30000;}",
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
    var spaceIdx = title.indexOf(" ");
    var titleHtml = spaceIdx > -1
      ? '<span style="color:#e60000">' + title.slice(0, spaceIdx) + "</span>" + title.slice(spaceIdx)
      : '<span style="color:#e60000">' + title + "</span>";
    card.innerHTML =
      '<div class="lea-tambien-label">LEA TAMBIÉN</div>' +
      '<div class="lea-tambien-body">' +
        '<div class="lea-tambien-text">' +
          '<a class="lea-tambien-title" href="' + href + '" style="color:#111;text-decoration:none;">' + titleHtml + "</a>" +
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

  function transformParagraph(p) {
    if (!p.isConnected || !LABEL_RE.test(p.textContent.trim())) return;
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
  }

  function transformLeaTambien(root) {
    injectLeaTambienStyles();
    (root || document).querySelectorAll("p").forEach(transformParagraph);
  }

  /* Algunos "LEA TAMBIÉN" se renderizan después de DOMContentLoaded
     (carga asíncrona del cuerpo del artículo), por eso se observan
     los párrafos que se agreguen más tarde. */
  function observeNewParagraphs() {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.tagName === "P") {
            transformParagraph(node);
          } else if (node.querySelectorAll) {
            node.querySelectorAll("p").forEach(transformParagraph);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    transformLeaTambien(document);
    observeNewParagraphs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
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


setTimeout(() => {
  let contador = 0;

  document.querySelectorAll('.r_enumeration').forEach(item => {
      const prev = item.previousElementSibling;

      if (!prev || !prev.classList.contains('r_enumeration')) {
          contador = 1; // inicia nuevo bloque
      } else {
          contador++;
      }

      item.setAttribute('data-num', contador);
  });
}, 1000);

// Botón PDF — solo visible en vtz-vp.milenium.cloud
(function () {
    if (window.location.hostname !== 'vtz-vp.milenium.cloud') return;

    function injectPdfButton() {
        var style = document.createElement('style');
        style.textContent =
            '.vtz-pdf-btn{display:inline-flex;align-items:center;gap:8px;background:#CC1114;color:#fff;border:none;padding:10px 20px;font-family:"Zalando Sans",sans-serif;font-size:13px;font-weight:600;cursor:pointer;border-radius:4px;margin:20px 0;}' +
            '.vtz-pdf-btn:hover{background:#a50e10;}' +
            '@media print{' +
            '.vtz-pdf-btn,header,nav,footer,#iter-nav-wrapper,.header-top-bar,.canal_whatsapp_movil,.r_relacionadas,.mas-recientes,.vtz-wsp-card,.vtz-google-news-btn,.vtz-google-btn,.r-social-icons,.ultimas-noticias,.mn-lbp,.am-lbp-footer,[class*="publicidad"],[class*="banner"],[id*="banner"],[id*="ads"],[class*="taboola"]{display:none!important;}' +
            'body,html{background:#fff!important;}' +
            '#iter-content-wrapper,#col-main,.primer-bloque{width:100%!important;max-width:100%!important;float:none!important;}' +
            '}';
        document.head.appendChild(style);

        var btn = document.createElement('button');
        btn.className = 'vtz-pdf-btn';
        btn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>' +
            '<polyline points="14 2 14 8 20 8"/>' +
            '<line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>' +
            '</svg> Descargar PDF';
        btn.addEventListener('click', function () { window.print(); });

        // Inserta después del titular
        var anchor = document.querySelector('.R_PATROCINIO_TITLE .subheadline, .R_SEC_DATE_TIT_SUB .subheadline, .R_PATROCINIO_TITLE .headline, .R_SEC_DATE_TIT_SUB .headline');
        if (anchor) {
            anchor.insertAdjacentElement('afterend', btn);
        } else {
            var fallback = document.querySelector('.text_detail, .primer-bloque');
            if (fallback) fallback.prepend(btn);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectPdfButton);
    } else {
        injectPdfButton();
    }
}());
