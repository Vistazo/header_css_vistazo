/* ─── Banner cookie (esquina inferior derecha) ─── */
var stringHtml = `
<div id="cookieNotice" class="cookie-overlay p-4" style="display:block;">
  <div class="title-wrap" style="font-weight:bold;font-size:20px;">
    <h4><img src="https://estadisticas.ecuavisa.com/sites/gestor/Banner/cookies.svg" alt="cookies">Aviso de política de cookies</h4>
  </div>
  <div class="content-wrap">
    <div class="msg-wrap">
      <p>Vistazo utiliza cookies propias y de terceros para fines analíticos anónimos, guardar las preferencias que selecciones y para el funcionamiento general de la página.<br><br>
      Puedes aceptar todas las cookies pulsando el botón "Aceptar" o configurarlas o rechazar su uso pulsando el botón "Configurar".</p>
      <p style="margin-top:10px;"><a style="color:#115cfa;" href="https://www.vistazo.com/politicas-privacidad" target="_blank">Políticas de privacidad</a></p>
      <p style="margin-top:10px;"><a style="color:#115cfa;" href="https://www.vistazo.com/politicas-de-cookies" target="_blank">Políticas de cookies</a></p>
      <div class="btn-wrap">
        <button class="btnRechazar" id="configurar">Configurar</button>
        <button class="btnAceptar" id="aceptarcookies" onclick="acceptCookieConsent();">Aceptar</button>
      </div>
    </div>
  </div>
</div>

<div id="vtzCookieOverlay" style="display:none;">
  <div class="vtzcookie-modal">
    <span class="vtzcookie-icon">🍪</span>
    <strong class="vtzcookie-title">Aviso de política de cookies</strong>
    <p class="vtzcookie-desc">Para continuar navegando en Vistazo necesitas aceptar nuestra política de cookies.</p>
    <div class="vtzcookie-links">
      <a href="https://www.vistazo.com/politicas-privacidad" target="_blank">Políticas de privacidad</a>
      <a href="https://www.vistazo.com/politicas-de-cookies" target="_blank">Políticas de cookies</a>
    </div>
    <div class="vtzcookie-btns">
      <button onclick="declineCookieConsent()">Rechazar</button>
      <button class="accept" onclick="acceptCookieConsent()">Aceptar todo</button>
    </div>
  </div>
</div>
`;

var modalCookieNotice = document.createElement("div");
modalCookieNotice.innerHTML = stringHtml;
document.body.appendChild(modalCookieNotice);

/* ─── Detección de bots ─── */
function isLikelyBot() {
    return /bot|crawl|slurp|spider/i.test(navigator.userAgent) ||
           !('onscroll' in window) ||
           /HeadlessChrome/.test(navigator.userAgent);
}

/* ─── Cookie helpers ─── */
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    document.cookie = cname + "=" + cvalue + ";expires=" + d.toUTCString() + ";path=/";
}

function deleteCookie(cname) {
    document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = decodeURIComponent(document.cookie).split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length);
    }
    return "";
}

/* ─── Validación 6 meses ─── */
var SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;

function isConsentValid() {
    var ts = localStorage.getItem("vtzCookieConsentTs");
    // Si el consentimiento tiene más de 6 meses, limpiar y re-pedir
    if (ts && (Date.now() - parseInt(ts, 10)) > SIX_MONTHS_MS) {
        localStorage.removeItem("vtzCookieConsentTs");
        localStorage.removeItem("noCookiesVistazo");
        deleteCookie("user_cookie_consent");
        return false;
    }
    return !!(getCookie("user_cookie_consent") || localStorage.getItem("noCookiesVistazo"));
}

/* ─── Mostrar / ocultar banner ─── */
function checkCookie() {
    if (isLikelyBot()) return;
    document.getElementById("cookieNotice").style.display = isConsentValid() ? "none" : "block";
}
checkCookie();

/* ─── Aceptar ─── */
function acceptCookieConsent() {
    deleteCookie("user_cookie_consent");
    setCookie("user_cookie_consent", 1, 180); // 6 meses
    localStorage.setItem("vtzCookieConsentTs", Date.now().toString());
    document.getElementById("cookieNotice").style.display = "none";
    document.getElementById("vtzCookieOverlay").style.display = "none";
    document.body.style.overflow = "";
}

/* ─── Rechazar ─── */
function declineCookieConsent() {
    document.getElementById("cookieNotice").style.display = "none";
    document.getElementById("vtzCookieOverlay").style.display = "none";
    document.body.style.overflow = "";
    localStorage.setItem("noCookiesVistazo", "true");
    localStorage.setItem("vtzCookieConsentTs", Date.now().toString());
}

/* ─── Overlay bloqueante al 50% de scroll ─── */
(function () {
    if (isLikelyBot()) return;
    var triggered = false;
    window.addEventListener('scroll', function () {
        if (triggered || isConsentValid()) return;
        var scrolled = window.scrollY || document.documentElement.scrollTop;
        var total = document.documentElement.scrollHeight - window.innerHeight;
        if (total > 0 && (scrolled / total) >= 0.5) {
            triggered = true;
            document.getElementById("cookieNotice").style.display = "none";
            document.getElementById("vtzCookieOverlay").style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    }, { passive: true });
})();

/* ─── Configuración avanzada de cookies ─── */
var actionsCofigCookies = {
    opciones: [
        {
            titulo: "Almacenar o acceder a información en un dispositivo",
            descripcion: "Se refiere a la recopilación de información del dispositivo del usuario, como su dirección IP y configuración de idioma",
            accept: false,
            id: 1,
        },
        {
            titulo: "Seleccionar anuncios básicos",
            descripcion: "Se refiere a la selección de anuncios genéricos que se basan en la temática del sitio web o en la ubicación geográfica del usuario.",
            accept: false,
            id: 2,
        },
        {
            titulo: "Seleccionar anuncios personalizados",
            descripcion: "Se refiere a la selección de anuncios que se basan en la actividad del usuario en el sitio web o en otros sitios web que ha visitado.",
            accept: false,
            id: 3,
        },
    ],
    existeItem: function () {
        return this.opciones.some(function (o) { return o.accept; });
    },
    buscarItem: function (id) {
        return this.opciones.find(function (o) { return o.id === id; }) || [];
    },
    editarItem: function (id, index, value) {
        for (var i = 0; i < this.opciones.length; i++) {
            if (this.opciones[i].id == id) { this.opciones[i][index] = value; return true; }
        }
        return false;
    },
    editarItems: function (index, value) {
        for (var i = 0; i < this.opciones.length; i++) { this.opciones[i][index] = value; }
        if (localStorage.getItem("dataAcceptCookiesVistazo")) {
            localStorage.setItem("dataAcceptCookiesVistazo", JSON.stringify(this.opciones));
        }
        this.listItems();
        return true;
    },
    editarItemsIndex: function (index, value, id) {
        for (var i = 0; i < this.opciones.length; i++) { this.opciones[i][index] = false; }
        this.opciones[id][index] = value;
        if (localStorage.getItem("dataAcceptCookiesVistazo")) {
            localStorage.setItem("dataAcceptCookiesVistazo", JSON.stringify(this.opciones));
        }
        this.listItems();
        return true;
    },
    guardarItems: function () {
        localStorage.setItem("dataAcceptCookiesVistazo", JSON.stringify(this.opciones));
        return true;
    },
    HTMLConfig: function () {
        return `<div class="modal-ecuavisa hidden-modal" id="modal-ec">
    <div class="fondo-modal">
        <div class="exterior-modal">
            <div class="container-modal">
                <div class="preferences-modal">
                    <div class="header-modal">
                        <div class="title-text">Configuración de cookies</div>
                        <button type="button" id="btn-cerrar">Cerrar</button>
                    </div>
                    <div class="body-modal">
                        <div class="descripccion-modal">
                            Al pulsar "Guardar y cerrar" se guardará la selección de cookies que hayas realizado.
                            Si pulsas "Aceptar todo" aceptarás todas las cookies.
                            Si pulsas "Rechazar todo" rechazarás todas las cookies no esenciales.
                        </div>
                        <div class="table-panel-items" id="items-modal"></div>
                    </div>
                    <div class="footer-modal">
                        <div class="block_btn_re_acep p-0 m-0">
                            <button class="btnRechazar" id="rechazar_todo">Rechazar todo</button>
                            <button class="btnAceptar" id="aceptar-todos">Aceptar todo</button>
                        </div>
                        <button class="btnAceptar disabled" style="display:none" id="aceptar-modal">Guardar y cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;
    },
    optionsHTML: function (data) {
        return `<div class="content-items" option-id="${data.id}">
    <div class="title-panel"><div>${data.titulo}<small>${data.descripcion}</small></div></div>
    <div class="check-panel" actions="list-options">
        <input type="checkbox" class="option-check" ${data.accept ? "checked" : ""} id="switch-${data.id}" data-json='{"id":${data.id},"accept":${data.accept}}'/>
        <label for="switch-${data.id}">Toggle</label>
    </div>
</div>`;
    },
    listItems: function () {
        var el = document.getElementById("items-modal");
        if (!el) return;
        var lista = JSON.parse(localStorage.getItem("dataAcceptCookiesVistazo")) || this.opciones;
        this.opciones = lista;
        el.innerHTML = lista.map(this.optionsHTML).join("");
    },
    init: function () {
        modalCookieNotice.innerHTML += this.HTMLConfig();
        this.listItems();

        document.getElementById("btn-cerrar").addEventListener("click", function () {
            document.getElementById("modal-ec").classList.add("hidden-modal");
        });
        document.getElementById("configurar").addEventListener("click", function () {
            document.getElementById("modal-ec").classList.remove("hidden-modal");
            var existe = actionsCofigCookies.existeItem();
            document.querySelector(".block_btn_re_acep").style.display = existe ? "none" : "flex";
            var btn = document.querySelector("#aceptar-modal");
            btn.style.display = existe ? "block" : "none";
            btn.classList.toggle("disabled", !existe);
        });
        document.getElementById("aceptar-todos").addEventListener("click", function () {
            actionsCofigCookies.editarItems("accept", true);
            document.querySelector("#aceptar-modal").classList.remove("disabled");
            document.getElementById("modal-ec").classList.add("hidden-modal");
            actionsCofigCookies.guardarItems();
            acceptCookieConsent();
        });
        document.getElementById("aceptarcookies").addEventListener("click", function () {
            actionsCofigCookies.editarItems("accept", true);
            actionsCofigCookies.guardarItems();
        });
        document.getElementById("rechazar_todo").addEventListener("click", function () {
            actionsCofigCookies.editarItemsIndex("accept", true, 0);
            document.querySelector("#aceptar-modal").classList.remove("disabled");
            document.getElementById("modal-ec").classList.add("hidden-modal");
            actionsCofigCookies.guardarItems();
            acceptCookieConsent();
        });
        document.getElementById("aceptar-modal").addEventListener("click", function () {
            document.getElementById("modal-ec").classList.add("hidden-modal");
            actionsCofigCookies.guardarItems();
            acceptCookieConsent();
        });
        document.querySelector(".table-panel-items").addEventListener("click", function (event) {
            setTimeout(function () {
                if (!event.target.matches(".option-check")) return;
                var data = JSON.parse(event.target.getAttribute("data-json"));
                data.accept = !data.accept;
                event.target.setAttribute("data-json", JSON.stringify(data));
                actionsCofigCookies.editarItem(data.id, "accept", data.accept);
                var existe = actionsCofigCookies.existeItem();
                document.querySelector(".block_btn_re_acep").style.display = existe ? "none" : "flex";
                var btn = document.querySelector("#aceptar-modal");
                btn.style.display = existe ? "block" : "none";
                btn.classList.toggle("disabled", !existe);
            }, 0);
        });
        return true;
    }
};
actionsCofigCookies.init();
