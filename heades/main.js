document.addEventListener('DOMContentLoaded', function () {
  // Crear el elemento script
  // var scriptElement = document.createElement('script');

  // Establecer los atributos del script
  // scriptElement.setAttribute('charset', 'UTF-8');
  // scriptElement.setAttribute('src', '//web.webpushs.com/js/push/af4643cebabb204fff34ebd1d7822c8b_1.js');
  // scriptElement.setAttribute('async', '');

  // Obtener la referencia al elemento head
  //var headElement = document.head || document.getElementsByTagName('head')[0];

  // Agregar el nuevo script al head
  //headElement.appendChild(scriptElement);



  // Encuentra el script por tipo y contenido
  // var scripts = document.querySelectorAll('script[type="text/javascript"][src*="taboola"]');
  // Elimina cada script encontrado
  // scripts.forEach(function(script) {
  //     script.parentNode.removeChild(script);
  // });
  // localStorage.setItem("scriptsr_scroll", "")
  EjecutarScriptTaboola();
  EjecutarInit();
});

function EjecutarInit() {
  try {
    register = document.querySelector(".nav-dropdown.nav.noSubNav")
    if (register) {
      copi = register.innerHTML
      logo = `<div><a class="site-logo" href="/" aria-label="Vistazo">vistazo</a></div>`
      register.innerHTML = ""
      register.innerHTML = `${logo}${copi}<div class="login_menu_bm">
                <div class="login">
                    <a class="lg_bm"
                        href="https://suscripciones.vistazo.com/id/login/?continue=https%3A%2F%2Fwww.vistazo.com%2F">
                        <img src="https://suscripciones.vistazo.com/img/id/ic-user.svg"
                        width=20"
                        height="auto"
                        alt="icono-vtz"
                        arial-label="Vistazo"
                        title="img-login"
                        loading="lazy">Login
                    </a>
                </div>
                <div class="btn_menu">
                  <div class="hamburg_bm" style='color: white' id='menu_1'>
                      <svg xmlns="http://www.w3.org/2000/svg" class="burger" width="24" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                  </div>
                  <div class="hamburg_bm_lupin" style='color: white' id='menu_2'>
                      <svg xmlns="http://www.w3.org/2000/svg" class="lupin" style='color: white' width="25" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>
                  </div>
                </div>
        </div>`
    }
    submenu = document.querySelector(".portlet-boundary.portlet-static-end.htmlcontainer-portlet")
    if (submenu) {
      newCopi = submenu.innerHTML
      submenu.innerHTML = ""
      submenu.innerHTML = `${newCopi}
        <div class="actualidad_sub">
        <ul class="ulclass">
          <div class="lst_items_sub">
            <li
              class="lst-item-bm sect-1733 sect-f81fd82d0bd4db455e47e7121837c9cb"
            >
              <a href="/actualidad/nacional" class="lnk" title="">
                <span class="iconBefore"></span>
                <span class="sectionName">Nacional</span>
                <span class="iconAfter"></span>
              </a>
            </li>
            <li
              class="lst-item-bm sect-1734 sect-f805fc3f687a103080279383e7b5b962"
            >
              <a href="/actualidad/internacional" class="lnk" title="">
                <span class="iconBefore"></span>
                <span class="sectionName">Internacional</span>
                <span class="iconAfter"></span>
              </a>
            </li>
            <li
              class="lst-item-bm sect-1734 sect-f805fc3f687a103080279383e7b5b962"
            >
              <a href="/actualidad/pueblos-aislados" class="lnk" title="">
                <span class="iconBefore"></span>
                <span class="sectionName">Pueblos Aislados</span>
                <span class="iconAfter"></span>
              </a>
            </li>
          </div>
        </ul>
      </div>
      <div class="portafolio_sub">
      <ul class="ulclass">
        <div class="lst_items_sub">
          <li
            class="lst-item-bm sect-1825 sect-42ff57b163bddcfec0d4cebf6ec53b3a"
          >
            <a
              href="/portafolio/economia"
              class="lnk"
              title=""
            >
              <span class="iconBefore"></span>
              <span class="sectionName"
                >Economía</span
              >
              <span class="iconAfter"></span>
            </a>
          </li>
          <li
            class="lst-item-bm sect-1826 sect-1e58d33a1702c5a608d3360a1593ad09"
          >
            <a
              href="/portafolio/empresas"
              class="lnk"
              title=""
            >
              <span class="iconBefore"></span>
              <span class="sectionName"
                >Empresas</span
              >
              <span class="iconAfter"></span>
            </a>
          </li>
          <li
            class="lst-item-bm sect-1827 sect-c8c614fc4dc6e6f35f1ebdd38eeb629d"
          >
            <a
              href="/portafolio/emprendimiento"
              class="lnk"
              title=""
            >
              <span class="iconBefore"></span>
              <span class="sectionName"
                >Emprendimiento</span
              >
              <span class="iconAfter"></span>
            </a>
          </li>
          <li
            class="lst-item-bm sect-1828 sect-7425b9485880f01379ae396861e33868"
          >
            <a
              href="/portafolio/provincias"
              class="lnk"
              title=""
            >
              <span class="iconBefore"></span>
              <span class="sectionName"
                >Provincias</span
              >
              <span class="iconAfter"></span>
            </a>
          </li>
          <li class="lst-item-bm sect-2773 sect-e869719b1db25b24b4cdf626a6b907cd"> 
            <a 
              href="/portafolio/bolsa-de-empleo" 
              class="lnk" 
              title=""> 
                <span class="iconBefore"></span> 
                <span class="sectionName">Bolsa de Empleo</span> 
                <span class="iconAfter"></span> 
            </a> 
          </li>
        </div>
      </ul>
    </div>
    <div class="estilo_vida_sub">
    <ul class="ulclass">
      <div class="lst_items_sub">
        <li
          class="lst-item-bm sect-471 sect-df2528d78997d90c8d993c7fca162c3b"
        >
          <a
            href="/estilo-de-vida/salud"
            class="lnk"
            title=""
          >
            <span class="iconBefore"></span>
            <span class="sectionName">Salud</span>
            <span class="iconAfter"></span>
          </a>
        </li>
        <li
          class="lst-item-bm sect-472 sect-64f7dfbe84689d02caae2161c2673005"
        >
          <a
            href="/estilo-de-vida/sostenibilidad"
            class="lnk"
            title=""
          >
            <span class="iconBefore"></span>
            <span class="sectionName"
              >Sostenibilidad</span
            >
            <span class="iconAfter"></span>
          </a>
        </li>
        <li
          class="lst-item-bm sect-473 sect-961037676f5dd44678c8e781dfb48584"
        >
          <a
            href="/estilo-de-vida/ciencia"
            class="lnk"
            title=""
          >
            <span class="iconBefore"></span>
            <span class="sectionName"
              >Ciencia</span
            >
            <span class="iconAfter"></span>
          </a>
        </li>
        <li
          class="lst-item-bm sect-474 sect-48c99c8b72e94e08855a1a347a7513c8"
        >
          <a
            href="/estilo-de-vida/tecnologia"
            class="lnk"
            title=""
          >
            <span class="iconBefore"></span>
            <span class="sectionName"
              >Tecnología</span
            >
            <span class="iconAfter"></span>
          </a>
        </li>
        <li
          class="lst-item-bm sect-1815 sect-9785c3aa25242f04e444023178e1cd9c"
        >
          <a
            href="/estilo-de-vida/cultura"
            class="lnk"
            title=""
          >
            <span class="iconBefore"></span>
            <span class="sectionName"
              >Cultura</span
            >
            <span class="iconAfter"></span>
          </a>
        </li>
        <li
          class="lst-item-bm sect-1823 sect-93f29a99eaa369a6a463338947d672c4"
        >
          <a
            href="/estilo-de-vida/tendencias"
            class="lnk"
            title=""
          >
            <span class="iconBefore"></span>
            <span class="sectionName"
              >Tendencias</span
            >
            <span class="iconAfter"></span>
          </a>
        </li>
      </div>
    </ul>
  </div>
  <div class="politica_sub">
  <ul class="ulclass">
    <div class="lst_items_sub">
      <li
        class="lst-item-bm sect-468 sect-33df33fd383c192b5770220a2d7546d3"
      >
        <a
          href="/politica/nacional"
          class="lnk"
          title=""
        >
          <span class="iconBefore"></span>
          <span class="sectionName"
            >Nacional</span
          >
          <span class="iconAfter"></span>
        </a>
      </li>
      <li
        class="lst-item-bm sect-469 sect-0a39d9c5b883a300fae6f1b919de9817"
      >
        <a
          href="/politica/internacional"
          class="lnk"
          title=""
        >
          <span class="iconBefore"></span>
          <span class="sectionName"
            >Internacional</span
          >
          <span class="iconAfter"></span>
        </a>
      </li>
      <li
        class="lst-item-bm sect-1980 sect-d64a3c244344b0db416675f911d62276"
      >
        <a
          href="https://vistazo.com/elecciones-seleccionales"
          rel="nofollow"
          class="lnk"
          title=""
        >
          <span class="iconBefore"></span>
          <span class="sectionName"
            >Elecciones</span
          >
          <span class="iconAfter"></span>
        </a>
      </li>
    </div>
  </ul>
</div>
      `
    }

    opinion = document.querySelector(".sect-ed616e97416bbb72f2a42fa530435804");
    if (opinion) {
      div = `<div class="tab-grp">
              ${opinion.innerHTML}
              <span class="hasChildsIcon"></span>
              <div class="child-nav cf">
              </div>
          </div>`
      opinion.innerHTML = div;
    }
    e2 = document.querySelector(".sect-262e52091545304582cf18882fc67b4f");
    div2 = `<div class="tab-grp">
            ${e2.innerHTML}
            <span class="hasChildsIcon"></span>
            <div class="child-nav cf">
            </div>
        </div>`
    e2.innerHTML = div2;

    e3 = document.querySelector(".sect-0903d1806e4bd8bf290229a78d484445");
    div3 = `<div class="tab-grp">
            ${e3.innerHTML}
            <span class="hasChildsIcon"></span>
            <div class="child-nav cf">
            </div>
        </div>`
    e3.innerHTML = div3;

    e4 = document.querySelector(".sect-74b11848b5e1a47d79fed2bc56e2a9fc");
    div4 = `<div class="tab-grp">
            ${e4.innerHTML}
            <span class="hasChildsIcon"></span>
            <div class="child-nav cf">
            </div>
        </div>`
    e4.innerHTML = div4;

    e5 = document.querySelector(".sect-a4306ce1cba409d40f6649f40a27a166");
    div5 = `<div class="tab-grp">
            ${e5.innerHTML}
            <span class="hasChildsIcon"></span>
            <div class="child-nav cf">
            </div>
        </div>`
    e5.innerHTML = div5;

    menuMovil = document.querySelector(".headres_bm_ts");
    if (menuMovil) {
      menu = `${menuMovil.innerHTML}
        <div
        id="189309249"
        class="menu_burguer_mobile"
       >
        <div id="menu_189309249" class="">
          <div class="nav-dropdown nav noSubNav">
            <ul class="parent-nav lst cf">
              <li
                class="lst-item-movil tabnav sect-1732 sect-79fb641b523c20025e6a8dac39895323"
              >
                <div class="tab-grp">
                  <a href="/actualidad" class="tab-item lnk" title="">
                    <span class="iconBefore"></span>
                    <strong class="sectionName">Actualidad</strong>
                    <span class="iconAfter"></span>
                  </a>
                  <span class="hasChildsIcon"></span>
                  <div class="child-nav cf">
                    <ul class="lst-std lst level-2">
                      <div class="lst-items-movil-movil">
                        <li
                          class="lst-item sect-1733 sect-f81fd82d0bd4db455e47e7121837c9cb"
                        >
                          <a href="/actualidad/nacional" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Nacional</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                        <li
                          class="lst-item sect-1734 sect-f805fc3f687a103080279383e7b5b962"
                        >
                          <a href="/actualidad/internacional" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Internacional</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                      <li
                        class="lst-item sect-1734 sect-f805fc3f687a103080279383e7b5b962"
                      >
                        <a href="/actualidad/pueblos-aislados" class="lnk" title="">
                          <span class="iconBefore"></span>
                          <span class="sectionName">Pueblos Aislados</span>
                          <span class="iconAfter"></span>
                        </a>
                      </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </li>
              <li
                class="lst-item tabnav sect-1735 sect-5e3a3383803afb7eaaa222e1db4b0547"
              >
                <div class="tab-grp">
                  <a href="/politica" class="tab-item lnk" title="">
                    <span class="iconBefore"></span>
                    <strong class="sectionName">Política</strong>
                    <span class="iconAfter"></span>
                  </a>
                  <span class="hasChildsIcon"></span>
                  <div class="child-nav cf">
                    <ul class="lst-std lst level-2">
                      <div class="lst-items-movil">
                        <li
                          class="lst-item sect-1736 sect-3f156675ba59e009173db6540b30ca45 selected"
                        >
                          <a href="/politica/nacional" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Nacional</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                        <li
                          class="lst-item sect-1737 sect-5b9e05c46c38a9d40dad478d8ab14cb6"
                        >
                          <a href="/politica/internacional" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Internacional</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </li>
              <li
                class="lst-item tabnav sect-1749 sect-af66e17754b1a82f345799be1acd98b1"
              >
                <a
                  href="https://suscripciones.vistazo.com/"
                  rel="nofollow noopener noreferrer"
                  class="tab-item lnk"
                  target="_blank"
                  title=""
                >
                  <span class="iconBefore"></span>
                  <span class="sectionName">Suscríbete</span>
                  <span class="iconAfter"></span>
                </a>
              </li>
              <li
                class="lst-item tabnav sect-1738 sect-73e47026e609fbb586f2bc13ec34cc00"
              >
                <a href="/opinion" class="tab-item lnk" title="">
                  <span class="iconBefore"></span>
                  <span class="sectionName">Opinión</span>
                  <span class="iconAfter"></span>
                </a>
              </li>
              <li
                class="lst-item tabnav sect-1739 sect-c52d895261ce5bce5e45efd7189ee863"
              >
                <div class="tab-grp">
                  <a href="/estilo-de-vida" class="tab-item lnk" title="">
                    <span class="iconBefore"></span>
                    <strong class="sectionName">Estilo de vida</strong>
                    <span class="iconAfter"></span>
                  </a>
                  <span class="hasChildsIcon"></span>
                  <div class="child-nav cf">
                    <ul class="lst-std lst level-2">
                      <div class="lst-items-movil">
                        <li
                          class="lst-item sect-1740 sect-b8ebd1498285e82ac5b1e7c2ad2dccd9"
                        >
                          <a href="/estilo-de-vida/salud" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Salud</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                        <li
                          class="lst-item sect-1741 sect-4d701365fced03f47696c9a1f6b8b89e"
                        >
                          <a
                            href="/estilo-de-vida/sostenibilidad"
                            class="lnk"
                            title=""
                          >
                            <span class="iconBefore"></span>
                            <span class="sectionName">Sostenibilidad</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                        <li
                          class="lst-item sect-1742 sect-e6d605dcd25aca85cbdd17e0fba1256c"
                        >
                          <a href="/estilo-de-vida/ciencia" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Ciencia</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                        <li
                          class="lst-item sect-1743 sect-d3cad84025daf4d582448db940277308"
                        >
                          <a href="/estilo-de-vida/tecnologia" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Tecnología</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                        <li
                          class="lst-item sect-2831 sect-3aa2ec143e4d6c32cc09bba35152e3ac"
                        >
                          <a href="/estilo-de-vida/tendencias" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Tendencias</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </li>
              <li
                class="lst-item tabnav sect-1744 sect-b9980f56b677f8e269b30e61d191af47"
              >
                <a href="/deportes" class="tab-item lnk" title="">
                  <span class="iconBefore"></span>
                  <span class="sectionName">Estadio</span>
                  <span class="iconAfter"></span>
                </a>
              </li>
              <li
                class="lst-item tabnav sect-1745 sect-c9f0c56283c0327e88a8dc57b5c41b5e"
              >
                <a href="/enfoque" class="tab-item lnk" title="">
                  <span class="iconBefore"></span>
                  <span class="sectionName">Enfoque</span>
                  <span class="iconAfter"></span>
                </a>
              </li>
              <li
                class="lst-item tabnav sect-1746 sect-446817676877dd51d20d7ae38d1cb123"
              >
                <a href="/hogar" class="tab-item lnk" target="_blank" title="">
                  <span class="iconBefore"></span>
                  <span class="sectionName">Hogar</span>
                  <span class="iconAfter"></span>
                </a>
              </li>
              <li
                class="lst-item tabnav sect-1748 sect-c40be6be8c335e8cf991f6b5a6f73d0e"
              >
                <a href="/podcast" class="tab-item lnk" title="">
                  <span class="iconBefore"></span>
                  <span class="sectionName">Podcast</span>
                  <span class="iconAfter"></span>
                </a>
              </li>
              <li
                class="lst-item tabnav sect-2206 sect-741e1b9e1eda38b70605f3cf49942c8d"
              >
                <a
                  href="https://www.vistazo.com/replica/disculpas-publicas-al-proyecto-inmobiliario-torres-elit-por-utilizar-una-imagen-suya-sin-autorizacion-FY6098623"
                  rel="nofollow"
                  class="tab-item lnk"
                  title=""
                >
                  <span class="iconBefore"></span>
                  <span class="sectionName">Réplicas</span>
                  <span class="iconAfter"></span>
                </a>
              </li>
              <li
                class="lst-item tabnav sect-2211 sect-624cfcd128cc6dcc5e0ad6abb48357ba"
              >
                <a
                  href="https://suscripciones.vistazo.com/"
                  rel="nofollow"
                  class="tab-item lnk"
                  title=""
                >
                  <span class="iconBefore"></span>
                  <span class="sectionName">SUSCRÍBETE</span>
                  <span class="iconAfter"></span>
                </a>
              </li>
              <li
                class="lst-item tabnav sect-2830 sect-8aa58032e14c734353b36057fffa8be1"
              >
                <div class="tab-grp">
                  <a href="/portafolio" class="tab-item lnk" title="">
                    <span class="iconBefore"></span>
                    <strong class="sectionName">Portafolio</strong>
                    <span class="iconAfter"></span>
                  </a>
                  <span class="hasChildsIcon"></span>
                  <div class="child-nav cf">
                    <ul class="lst-std lst level-2">
                      <div class="lst-items-movil">
                        <li
                          class="lst-item sect-2832 sect-3ea0bf98ae29bb60d96f2e0983aab3e6"
                        >
                          <a href="/portafolio/economia" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Economía</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                        <li
                          class="lst-item sect-2833 sect-198d041e6485a86936af9e6863711229"
                        >
                          <a href="/portafolio/empresas" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Empresas</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                        <li
                          class="lst-item sect-2834 sect-e81de47fdbf9a9ec0fc028edd508608b"
                        >
                          <a href="/portafolio/emprendimiento" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Emprendimiento</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                        <li
                          class="lst-item sect-2835 sect-335610bdd061e39ce2649113dfec87b1"
                        >
                          <a href="/portafolio/provincias" class="lnk" title="">
                            <span class="iconBefore"></span>
                            <span class="sectionName">Provincias</span>
                            <span class="iconAfter"></span>
                          </a>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
          </div>`
      menuMovil.innerHTML = menu;
    }

    var elems = document.querySelector('.lst-item.tabnav.sect-1824.sect-262e52091545304582cf18882fc67b4f div a strong');
    if (elems) {
      elems.style.fontSize = "1px";
    }
    hogar = document.querySelector(".lst-item.tabnav.sect-529.sect-0903d1806e4bd8bf290229a78d484445 a");
    if (hogar) {
      hogar.innerHTML = "";
    }
    enfoque = document.querySelector(".lst-item.tabnav.sect-247.sect-74b11848b5e1a47d79fed2bc56e2a9fc a");
    if (enfoque) {
      enfoque.innerHTML = "";
    }
    estadio = document.querySelector(".lst-item.tabnav.sect-246.sect-a4306ce1cba409d40f6649f40a27a166 a");
    if (estadio) {
      estadio.innerHTML = "";
    }


    close_burguer = document.querySelector(".burger");
    if (close_burguer) {
      // ver de cuanto es el tamaño de la pantalla si es igual o meno a 900px activar el menu movil
      close_burguer.addEventListener("click", function () {
        ver = document.querySelector(".menu_burguer_bm")
        movil = window.matchMedia("(min-width: 360px) and (max-width: 1024px)");
        if (movil.matches) {
          m = document.querySelector(".menu_burguer_mobile")
          if (m.style.display == "none" || m.style.display == "") {
            m.style.display = "block";
            LimpiarBuscadorMenu()
          } else {
            m.style.display = "none";
          }
        } else {
          if (ver.style.display == "none" || ver.style.display == "") {
            ver.style.display = "block";
          } else {
            ver.style.display = "none";
          }
        }
      });
    }

    // para que tambien se cierre el menu cuando se haga click en cualquier parte de la pantalla


    buscador = document.querySelector(".hamburg_bm_lupin");
    if (buscador) {
      buscador.addEventListener("click", function () {
        movil = window.matchMedia("(min-width: 360px) and (max-width: 1024px)");
        ver = document.querySelector(".basic_search_bm")
        if (movil.matches) {
          if (ver.style.display == "none" || ver.style.display == "") {
            LimpiarBuscadorMenu()
            ver.style.display = "block";
          } else {
            ver.style.display = "none";
          }
        } else {
          if (ver.style.display == "none" || ver.style.display == "") {
            ver.style.display = "block";
          } else {
            ver.style.display = "none";
          }
        }
      })
    }

    // para que tambien se cierre el menu cuando se haga click en cualquier parte de la pantalla
    document.addEventListener("click", function (event) {
      console.log("event.target.className.baseVal: ", event.target.className.baseVal);
      if (event.target.className.baseVal == "lupin") {
        document.querySelector(".menu_burguer_bm").style.display = "none";
      } else if (event.target.className.baseVal == "burger") {
        document.querySelector(".basic_search_bm").style.display = "none";
      } else {
        movil = window.matchMedia("(min-width: 360px) and (max-width: 1024px)");
        if (!movil.matches) {
          document.querySelector(".menu_burguer_bm").style.display = "none";
          // document.querySelector(".basic_search_bm").style.display = "none";
        }
      }
    });

    port = `
    <span class="iconBefore"></span>
    <strong class="sectionName" style="font-size: 1px;">Portafolio</strong>
    <span class="iconAfter"></span>`
    tabgrp = document.querySelectorAll(".menu_header_bm .menu_secc_unfolded .nav .cf .tabnav .tab-grp");
    var act = document.querySelector(".actualidad_sub .lst_items_sub")
    var pol = document.querySelector(".politica_sub .lst_items_sub")
    var est = document.querySelector(".estilo_vida_sub .lst_items_sub")
    var enf = document.querySelector(".portafolio_sub .lst_items_sub")
    tabgrp.forEach(e => {
      e.addEventListener("mouseover", function (i) {
        block = i.target.querySelector(".sectionName")
        e.style.clipPath = "polygon(11.5% -25.13%,96.50% -24.00%,88% 100%,0% 100%)";
        e.style.backgroundColor = "#fd0f03";
        e.style.textAlign = "center";
        e.style.margin = "0px"
        e.style.colo = "white"
        e.style.padding = "0px";
        e.style.height = "100%";
        if (block && block.innerHTML) {
          if (block.innerHTML == "Actualidad") {
            Limpiar()
            act.style.display = "flex";
          } else if (block.innerHTML == "Política") {
            Limpiar()
            pol.style.display = "flex";
          } else if (block.innerHTML == "Estilo de vida") {
            Limpiar()
            est.style.display = "flex";
          } else if (block.innerHTML == "Portafolio") {
            Limpiar()
            enf.style.display = "flex";
          } else {
            Limpiar()
          }
        }
      });
      e.addEventListener("mouseout", function () {
        e.style.clipPath = "polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)";
        e.style.backgroundColor = "#000";
        e.style.padding = "0px";
      });
    });

    // ejecutar el script de taboola cuando se haga click en la pagina o se haga scroll
    var taboolaExecuted = false; // Variable para controlar si la función ya se ejecutó

    function handleScroll() {
      if (!taboolaExecuted) {
        TagManager();
        InyectarEnHeader();
        //EjecutarScriptTaboola();
        taboolaExecuted = true;
      }
    }
    document.addEventListener("scroll", handleScroll)
    document.addEventListener("click", handleScroll)

  } catch (error) {
  }

  register2 = document.querySelector(".registro")
  if (register2) {
    register2.style.innerHTML = ""
  }
  document.addEventListener("click", function () {
    Limpiar()
  })
  // RutaActual()
}

function quitarTildes(cadena) {
  return cadena.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function RutaActual() {
  movil = window.matchMedia("(min-width: 360px) and (max-width: 1024px)");
  if (movil.matches) {
    return null;
  }
  let url = window.location.pathname.split("/")
  if (url) {
    url = url[1]
  }
  tabgrp = document.querySelectorAll(".sectionName");
  if (url && url != "") {
    tabgrp.forEach(e => {
      let tilde = quitarTildes(e.innerHTML)
      if (String(tilde).toLowerCase() == String(url).toLowerCase() ||
        String(tilde).toLowerCase() == "estilo-de-vida") {
        sal = e.parentElement.parentElement
        sal.style.clipPath = "polygon(11.5% -25.13%,96.50% -24.00%,88% 100%,0% 100%)";
        sal.style.backgroundColor = "#fd0f03";
        sal.style.textAlign = "center";
        sal.style.margin = "0px"
        sal.style.colo = "white"
        sal.style.padding = "0px";
        sal.style.height = "100%";
        // }else{
        //   sal = e.parentElement.parentElement
        //   sal.style.clipPath="polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)";
        //   sal.style.backgroundColor="#000";
        //   sal.style.padding="0px";
      }
    });
  }
}

function LimpiarBuscadorMenu() {
  try {
    b2 = document.querySelector(".basic_search_bm").style.display = "none";
    if (b2) {
      b2.style.display = "none";
    }
    m2 = document.querySelector(".menu_burguer_bm")
    if (m2) {
      m2.style.display = "none";
    }
  } catch (error) {
  } finally {
    return null;
  }
}

function Limpiar() {
  document.querySelector(".actualidad_sub .lst_items_sub").style.display = "none";
  document.querySelector(".estilo_vida_sub .lst_items_sub").style.display = "none";
  document.querySelector(".portafolio_sub .lst_items_sub").style.display = "none";
  document.querySelector(".politica_sub .lst_items_sub").style.display = "none";
}

function EjecutarScriptTaboola() {
  try {
    var group_id = 12727;
    var id_art_infinity = 6277236;
    var teaser_first = true;
    var n_noticia = 1;
    var idart_view = 6277236

    var taboolaContainer = document.getElementById("taboola-right-rail-thumbnails-scroll");
    if (!taboolaContainer) {
      return null;
    }
    // recuperamos la url canonica
    var canonicalUrl_art = $("#taboola-right-rail-thumbnails-scroll").closest(".template-infinity").find('.headline.artit').attr("canonicalurl");
    // renombramos el div
    var taboolaId = "taboola-right-rail-thumbnails-scroll-" + id_art_infinity;
    $('#taboola-right-rail-thumbnails-scroll')[0].id = taboolaId;
    // llamamos a la publi
    window._taboola = window._taboola || [];
    _taboola.push({ mode: 'thumbnails-a', container: taboolaId, placement: 'Below Article Thumbnails Widget', target_type: 'mix' });
    _taboola.push({ article: 'auto', url: canonicalUrl_art });
    console.log("taboola:00")
    return null;
  } catch (error) {
  }
}

function InyectarEnHeader() {
  try {
    // <scrip async src="https://mowplayer.com/js/player/mM9CsntrQm.js"></script> inyectar en el header para que funcione el video
    var script = document.createElement('script');
    script.src = 'https://mowplayer.com/js/player/mM9CsntrQm.js';
    script.async = true;
    document.head.appendChild(script);
    // taboola
    window._taboola = window._taboola || [];
    _taboola.push({ article: 'auto' });
    !function (e, f, u, i) {
      if (!document.getElementById(i)) {
        e.async = 1;
        e.src = u;
        e.id = i;
        f.parentNode.insertBefore(e, f);
      }
    }(document.createElement('script'),
      document.getElementsByTagName('script')[0],
      '//cdn.taboola.com/libtrc/adops-vistazo/loader.js',
      'tb_loader_script');
    if (window.performance && typeof window.performance.mark == 'function') { window.performance.mark('tbl_ic'); }

    var scripTag = document.createElement('script');
    // <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
    scripTag.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
    scripTag.async = true;
    document.head.appendChild(scripTag);
  } catch (error) {
    console.log("error InyectarEnHeader: ", error)
  }
}

function TagManager() {
  try {
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-MJB87NX');
    //Captura variables para DFP desde la url
    var getQueryString = function (field, url) {
      var href = url ? url : window.location.href;
      var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
      var string = reg.exec(href);
      return string ? string[1] : null;
    };
    dfp_demo = getQueryString("demo");
    var VI_Seccion = '${secPub}';
    var VI_Tipo = 'Portada';
    var VI_Subseccion = '';
    var VI_Articulo = '';
    var VI_Tag = '';
    window.googletag = window.googletag || { cmd: [] };
    googletag.cmd.push(function () {
      //required variable for refresh
      var REFRESH_KEY = "refresh";
      var REFRESH_VALUE = "true";

      var mappingbill = googletag.sizeMapping()
        .addSize([992, 0], [[970, 250], [970, 180], [970, 90], [728, 250], [728, 180], [728, 90]]).addSize([768, 0], [[728, 250], [728, 180], [728, 90]]).addSize([320, 0], [[320, 100], [320, 50], [300, 100], [300, 50]]).addSize([0, 0], [[300, 100], [300, 250], [320, 100]]).build();
      var mappingbox = googletag.sizeMapping()
        .addSize([992, 0], [[300, 600], [300, 250]]).addSize([768, 0], [[300, 600], [300, 250]]).addSize([320, 0], [[300, 250], [320, 100], [320, 50], [300, 100], [300, 50]]).addSize([0, 0], [[300, 250], [300, 100], [300, 50]]).build();
      var mappingcenter = googletag.sizeMapping()
        .addSize([992, 0], [[728, 90], [728, 180], [728, 250]]).addSize([768, 0], [[728, 90], [728, 180], [728, 250]]).addSize([320, 0], [[320, 100], [300, 100], [300, 250]]).addSize([0, 0], [[320, 100], [300, 100], [300, 250]]).build();
      //adUnits
      googletag.defineSlot('/21839199781/Vistazo/Vistazo_Top1', [[300, 100], [300, 250], [320, 100], [728, 90], [970, 90], [970, 250]], 'Top1').defineSizeMapping(mappingbill).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
      googletag.defineSlot('/21839199781/Vistazo/Vistazo_Center1', [[320, 100], [300, 100], [300, 250], [728, 90]], 'Center1').defineSizeMapping(mappingcenter).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
      googletag.defineSlot('/21839199781/Vistazo/Vistazo_Center2', [[320, 100], [300, 100], [300, 250], [728, 90]], 'Center2').defineSizeMapping(mappingcenter).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
      googletag.defineSlot('/21839199781/Vistazo/Vistazo_Center3', [[320, 100], [300, 100], [300, 250], [728, 90]], 'Center3').defineSizeMapping(mappingcenter).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
      //Reemplaza al Box de la home -------
      googletag.defineSlot('/21839199781/Vistazo/Vistazo_Middle1', [[300, 600], [300, 250]], 'Middle1').defineSizeMapping(mappingbox).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
      //-----------------------------------
      googletag.defineSlot('/21839199781/Vistazo/Vistazo_Middle2', [300, 250], 'Middle2').defineSizeMapping(mappingbox).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
      googletag.defineSlot('/21839199781/Vistazo/Floating', [1, 1], 'Floating').addService(googletag.pubads());
      googletag.defineSlot('/21839199781/Vistazo/Zocalo', [1, 3], 'Zocalo').addService(googletag.pubads());
      //Start refresh
      var SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30; // 30 seconds
      googletag.pubads().addEventListener("impressionViewable", function (event) {
        var slot = event.slot;
        if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
          setTimeout(function () {
            googletag.pubads().refresh([slot]);
          }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
        }
      });
      //End refresh


      if (jQryIter.contextIsArticlePage()) {
        VI_Tipo = 'Artículo';
        VI_Subseccion = '${SectionName}';
        var urltemp = window.location.href;
        var n = urltemp.lastIndexOf("-");
        VI_Articulo = urltemp.substring(n + 3);
      }
      // metadatos
      $("meta[data-voc-name=topic]").each(function () {
        if (VI_Tag == '') {
          VI_Tag = $(this).attr('content');
        }
        else {
          VI_Tag = VI_Tag + "," + $(this).attr('content');
        }
      });

      parts = (window.location.href.split("/"));
      console.log("parts", parts[3]);

      if (parts[3] == 'hogar' && parts.length <= 4) {
        VI_Seccion = 'Home-hogar';
      }
      if (parts[3].includes('taller-cocina-colada-morada-guaguas-pan')) {

        VI_Seccion = 'formulariod4';
      }

      if (parts[4] && parts[4] != "") {
        VI_Seccion = 'Home-hogar';
        VI_Subseccion = parts[4] + '-hogar';
      }

      console.log('VI_Seccion:' + VI_Seccion);
      console.log('VI_Subec:' + VI_Subseccion);
      console.log('VI_Tipo:' + VI_Tipo);
      console.log('VI_Articulo:' + VI_Articulo);
      console.log('VI_Tag:' + VI_Tag);
      console.log('dfp_demo:' + dfp_demo);
      googletag.pubads().setTargeting('VI_Seccion', VI_Seccion);
      googletag.pubads().setTargeting('VI_Subseccion', VI_Subseccion);
      googletag.pubads().setTargeting('VI_Tipo', VI_Tipo);
      googletag.pubads().setTargeting('VI_Articulo', VI_Articulo);
      googletag.pubads().setTargeting('VI_Tag', VI_Tag);
      googletag.pubads().setTargeting('VI_Demo', dfp_demo);
      googletag.pubads().setTargeting('censurado', 'no');
      googletag.pubads().enableSingleRequest();
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
    });
    console.log('0P');

    var interstitialSlot, bottomAnchorSlot;
    googletag.cmd.push(function () {
      interstitialSlot = googletag.defineOutOfPageSlot(
        "/21839199781/Vistazo_Web-ITT",
        googletag.enums.OutOfPageFormat.INTERSTITIAL
      );
      interstitialSlot && interstitialSlot.addService(googletag.pubads());
      bottomAnchorSlot = googletag.defineOutOfPageSlot(
        "/21839199781/Vistazo_Bottom_Anchor",
        googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
      );
      bottomAnchorSlot && bottomAnchorSlot.addService(googletag.pubads());
    });

    googletag.cmd.push(function () {
      interstitialSlot && googletag.display(interstitialSlot);
      bottomAnchorSlot && googletag.display(bottomAnchorSlot);
    });


    _atrk_opts = { atrk_acct: "fxUuj1aEsk00aa", domain: "vistazo.com", dynamic: true };
    (function () {
      var as = document.createElement('script'); as.type = 'text/javascript';
      as.async = true;
      as.src = "https://certify-js.alexametrics.com/atrk.js";
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(as, s);
    })();
  } catch (error) {
  }
}
