let stringHtml = `\n<div id="cookieNotice" class="cookie-overlay p-4" style="display: block;">\n  <div class="title-wrap" style="font-weight: bold; font-size: 20px;">\n      <h4><img src="https://estadisticas.ecuavisa.com/sites/gestor/Banner/cookies.svg" alt="cookies">Aviso de política de cookies</h4>\n  </div>\n  <div class="content-wrap">\n      <div class="msg-wrap" >\n          <p> Vistazo utiliza cookies propias y de terceros para fines analíticos anónimos, guardar las preferencias que selecciones y para el funcionamiento general de la página.\n              <br><br>Puedes aceptar todas las cookies pulsando el botón "Aceptar" o configurarlas o rechazar su uso pulsando el botón "Configurar".<br>\n              \x3c!--Puedes obtener mÃ¡s informaciÃ³n y volver a configurar tus preferencias en cualquier momento en la</p>\n              <p style="margin-top: 10px;"><a style="color:#115cfa;" href="https://www.ecuavisa.com/servicios/politicas-de-privacidad" target="_blank">PolÃ­tica de cookies</a>.</p>--\x3e\n\n              <p style="margin-top: 10px;"><a style="color:#115cfa;" href="https://www.vistazo.com/politicas-privacidad" target="_blank">PolÃ­ticas de privacidad</a></p>\n              <p style="margin-top: 10px;"><a style="color:#115cfa;" href="https://www.vistazo.com/politicas-de-cookies" target="_blank">PolÃ­ticas de cookies</a></p>\n          \n          <div class="btn-wrap ">\n              <button class="btnRechazar" id="configurar">Configurar</button>\n              <button class="btnAceptar" id="aceptarcookies" onclick="acceptCookieConsent();">Aceptar</button>\n          </div>\n      </div>\n  </div>\n</div>\n  `;
var modalCookieNotice = document.createElement("div");
modalCookieNotice.innerHTML = stringHtml;
document.body.appendChild(modalCookieNotice);
function isLikelyBot() {
    return /bot|crawl|slurp|spider/i.test(navigator.userAgent) || !('onscroll' in window) || /HeadlessChrome/.test(navigator.userAgent);
}
function checkCookie() {
  if (!isLikelyBot()) {
    let cookie_consent = getCookie("user_cookie_consent");
    if (cookie_consent != "") {
        document.getElementById("cookieNotice").style.display = "none";
        console.log("DISPLAY 1");
    } else if (localStorage.getItem("noCookiesVistazo")) {
        document.getElementById("cookieNotice").style.display = "none";
        console.log("DISPLAY 2");
    } else {
        document.getElementById("cookieNotice").style.display = "block";
        console.log("DISPLAY 3");
    }
  }
}
checkCookie();
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3 * 356);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function deleteCookie(cname) {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1e3 * 356);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=;" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function acceptCookieConsent() {
  deleteCookie("user_cookie_consent");
  setCookie("user_cookie_consent", 1, 365);
  document.getElementById("cookieNotice").style.display = "none";
}
function declineCookieConsent() {
  document.getElementById("cookieNotice").style.display = "none";
  localStorage.setItem("noCookiesVistazo", true);
}
var actionsCofigCookies = {
  opciones: [
    {
      titulo: "Almacenar o acceder a informaciÃ³n en un dispositivo",
      descripcion:
        "Se refiere a la recopilaciÃ³n de informaciÃ³n del dispositivo del usuario, como su direcciÃ³n IP y configuraciÃ³n de idioma",
      accept: false,
      id: 1,
    },
    {
      titulo: "Seleccionar anuncios bÃ¡sicos",
      descripcion:
        "Se refiere a la selecciÃ³n de anuncios genÃ©ricos que se basan en la temÃ¡tica del sitio web o en la ubicaciÃ³n geogrÃ¡fica del usuario.",
      accept: false,
      id: 2,
    },
    {
      titulo: "Seleccionar anuncios personalizados",
      descripcion:
        "Se refiere a la selecciÃ³n de anuncios que se basan en la actividad del usuario en el sitio web o en otros sitios web que ha visitado.",
      accept: false,
      id: 3,
    },
  ],
  existeItem: function () {
    var lista = this.opciones;
    for (var i in lista) {
      if (lista[i].accept) {
        return true;
      }
    }
    return false;
  },
  buscarItem: function (id) {
    var lista = this.opciones;
    var item = lista.find(({ id: id }) => id === id);
    return item || [];
  },
  editarItem: function (id, index, value) {
    for (var i in this.opciones) {
      var ins = this.opciones[i];
      if (ins.id == id) {
        this.opciones[i][index] = value;
        return true;
      }
    }
    return false;
  },
  editarItems: function (index, value) {
    for (var i in this.opciones) {
      this.opciones[i][index] = value;
    }
    if (localStorage.getItem("dataAcceptCookiesVistazo")) {
      localStorage.setItem(
        "dataAcceptCookiesVistazo",
        JSON.stringify(this.opciones)
      );
    }
    this.listItems();
    return true;
  },
  editarItemsIndex: function (index, value, id) {
    for (var i in this.opciones) {
      this.opciones[i][index] = false;
    }
    this.opciones[id][index] = value;
    if (localStorage.getItem("dataAcceptCookiesVistazo")) {
      localStorage.setItem(
        "dataAcceptCookiesVistazo",
        JSON.stringify(this.opciones)
      );
    }
    this.listItems();
    return true;
  },
  guardarItems: function () {
    var lista = this.opciones;
    localStorage.setItem("dataAcceptCookiesVistazo", JSON.stringify(lista));
    return true;
  },
  HTMLConfig: function (data) {
    return `<div class="modal-ecuavisa hidden-modal" id="modal-ec">\n    <div class="fondo-modal">\n        <div class="exterior-modal">\n            <div class="container-modal">\n                <div class="preferences-modal">\n                    <div class="header-modal">\n                        <div class="title-text">\n                            ConfiguraciÃ³n de cookies\n                        </div>\n                        <button type="button" id="btn-cerrar">Cerrar</button>\n                    </div>\n                    <div class="body-modal">\n                        <div class="descripccion-modal">\n                            Al pulsar "Guardar y cerrar" se guardarÃ¡ la selecciÃ³n de cookies que hayas realizado. Si pulsas sobre "Aceptar todo" aceptarÃ¡s todas las cookies. \n                            Si pulsas sobre "Rechazar todo" rechazarÃ¡s todas las cookies no esenciales. \n                            La aceptaciÃ³n de algunos grupos de cookies se realiza mediante algunas acciones explicitas que vienen detalladas debajo.\n\n                        </div>\n                        <div class="table-panel-items" id="items-modal">\n                            \n                        </div>\n                    </div>\n                    <div class="footer-modal">\n                        <div class="block_btn_re_acep p-0 m-0">\n                            <button class="btnRechazar" id="rechazar_todo">Rechazar todo</button>\n                            <button class="btnAceptar" id="aceptar-todos">Aceptar todo</button>\n                        </div>\n                        <button class="btnAceptar disabled" style="display:none" id="aceptar-modal">Guardar y cerrar</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>`;
  },
  optionsHTML: function (data) {
    return `<div class="content-items" option-id="3">\n    <div class="title-panel">\n        <div>\n            ${
      data.titulo
    }\n            <small>\n                ${
      data.descripcion
    }\n            </small>\n        </div>\n    </div>\n    <div class="check-panel" actions="list-options">\n        <input type="checkbox" class="option-check" ${
      data.accept ? "checked" : ""
    } id="switch-${data.id}" data-json='{"id":${data.id},"accept":${
      data.accept
    }}'/>\n        <label for="switch-${
      data.id
    }">Toggle</label>\n    </div>\n</div>`;
  },
  listItems: function () {
    var itemsContent = document.getElementById("items-modal");
    itemsContent.innerHTML = "";
    var lista =
      JSON.parse(localStorage.getItem("dataAcceptCookiesVistazo")) ||
      this.opciones;
    this.opciones = lista;
    var html = "";
    for (var i in lista) {
      var ins = lista[i];
      html += this.optionsHTML(ins);
    }
    itemsContent.innerHTML += html;
  },
  init: function () {
    modalCookieNotice.innerHTML += this.HTMLConfig();
    this.listItems();
    document
      .getElementById("btn-cerrar")
      .addEventListener("click", function () {
        var modal = document.getElementById("modal-ec");
        if (!modal.classList.contains("hidden-modal")) {
          modal.classList.add("hidden-modal");
        }
      });
    document
      .getElementById("configurar")
      .addEventListener("click", function () {
        var modal = document.getElementById("modal-ec");
        if (modal.classList.contains("hidden-modal")) {
          modal.classList.remove("hidden-modal");
        }
        if (actionsCofigCookies.existeItem()) {
          document.querySelector(".block_btn_re_acep").style.display = "none";
          document.querySelector("#aceptar-modal").style.display = "block";
          document.querySelector("#aceptar-modal").classList.remove("disabled");
        } else {
          document.querySelector(".block_btn_re_acep").style.display = "flex";
          document.querySelector("#aceptar-modal").style.display = "none";
          document.querySelector("#aceptar-modal").classList.add("disabled");
        }
      });
    document
      .getElementById("aceptar-todos")
      .addEventListener("click", function () {
        actionsCofigCookies.editarItems("accept", true);
        document.querySelector("#aceptar-modal").classList.remove("disabled");
        var modal = document.getElementById("modal-ec");
        modal.classList.add("hidden-modal");
        actionsCofigCookies.guardarItems();
        acceptCookieConsent();
      });
    document
      .getElementById("aceptarcookies")
      .addEventListener("click", function () {
        actionsCofigCookies.editarItems("accept", true);
        actionsCofigCookies.guardarItems();
      });
    document
      .getElementById("rechazar_todo")
      .addEventListener("click", function () {
        actionsCofigCookies.editarItemsIndex("accept", true, 0);
        document.querySelector("#aceptar-modal").classList.remove("disabled");
        var modal = document.getElementById("modal-ec");
        modal.classList.add("hidden-modal");
        actionsCofigCookies.guardarItems();
        acceptCookieConsent();
      });
    document
      .getElementById("aceptar-modal")
      .addEventListener("click", function () {
        var modal = document.getElementById("modal-ec");
        modal.classList.add("hidden-modal");
        actionsCofigCookies.guardarItems();
        acceptCookieConsent();
      });
    document
      .querySelector(".table-panel-items")
      .addEventListener("click", function (event) {
        setTimeout(() => {
          if (event.target.matches(".option-check")) {
            var data = JSON.parse(event.target.getAttribute("data-json"));
            var accept = false;
            if (!data.accept) {
              accept = true;
            }
            data.accept = accept;
            event.target.setAttribute("data-json", JSON.stringify(data));
            actionsCofigCookies.editarItem(data.id, "accept", accept);
            if (actionsCofigCookies.existeItem()) {
              document.querySelector(".block_btn_re_acep").style.display =
                "none";
              document.querySelector("#aceptar-modal").style.display = "block";
              document
                .querySelector("#aceptar-modal")
                .classList.remove("disabled");
            } else {
              document
                .querySelector("#aceptar-modal")
                .classList.add("disabled");
              document.querySelector("#aceptar-modal").style.display = "none";
              document.querySelector(".block_btn_re_acep").style.display =
                "flex";
            }
          }
        }, 0);
      });
    return true;
  },
};
actionsCofigCookies.init();
