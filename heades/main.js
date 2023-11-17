document.addEventListener('DOMContentLoaded', function() {
  try {
      register = document.querySelector(".nav-dropdown.nav.noSubNav")
      if(register){
          copi = register.innerHTML
          logo = `<div><a class="site-logo" href="/" aria-label="Vistazo">vistazo</a></div>`
          register.innerHTML=""
          register.innerHTML=`${logo}${copi}<div class="login_menu_bm">
                  <div class="login">
                      <a class=""
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
                  <div class="hamburg_bm" style='color: white' id='menu_1'>
                      <svg xmlns="http://www.w3.org/2000/svg" class="burger" width="24" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" class="lupin" style='color: white' width="25" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>
                  </div>
          </div>`
      }
      submenu = document.querySelector(".portlet-boundary.portlet-static-end.htmlcontainer-portlet")
      if(submenu){
          newCopi = submenu.innerHTML
          submenu.innerHTML=""
          submenu.innerHTML=`${newCopi}
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
      div= `<div class="tab-grp">
              ${opinion.innerHTML}
              <span class="hasChildsIcon"></span>
              <div class="child-nav cf">
              </div>
          </div>`
      opinion.innerHTML = div;
      e2 = document.querySelector(".sect-262e52091545304582cf18882fc67b4f");
      div2= `<div class="tab-grp">
              ${e2.innerHTML}
              <span class="hasChildsIcon"></span>
              <div class="child-nav cf">
              </div>
          </div>`
      e2.innerHTML = div2;
  
      e3 = document.querySelector(".sect-0903d1806e4bd8bf290229a78d484445");
      div3= `<div class="tab-grp">
              ${e3.innerHTML}
              <span class="hasChildsIcon"></span>
              <div class="child-nav cf">
              </div>
          </div>`
      e3.innerHTML = div3;
  
      e4 = document.querySelector(".sect-74b11848b5e1a47d79fed2bc56e2a9fc");
      div4= `<div class="tab-grp">
              ${e4.innerHTML}
              <span class="hasChildsIcon"></span>
              <div class="child-nav cf">
              </div>
          </div>`
      e4.innerHTML = div4;
  
      e5 = document.querySelector(".sect-a4306ce1cba409d40f6649f40a27a166");
      div5= `<div class="tab-grp">
              ${e5.innerHTML}
              <span class="hasChildsIcon"></span>
              <div class="child-nav cf">
              </div>
          </div>`
      e5.innerHTML = div5;

      menuMovil = document.querySelector(".headres_bm_ts");
      if(menuMovil){
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
      elems.style.fontSize = "1px";
      hogar = document.querySelector(".lst-item.tabnav.sect-529.sect-0903d1806e4bd8bf290229a78d484445 a");
      hogar.innerHTML = "";
      console.log(hogar);
      enfoque = document.querySelector(".lst-item.tabnav.sect-247.sect-74b11848b5e1a47d79fed2bc56e2a9fc a");
      enfoque.innerHTML = "";
      estadio = document.querySelector(".lst-item.tabnav.sect-246.sect-a4306ce1cba409d40f6649f40a27a166 a");
      estadio.innerHTML = "";
  
  
      close_burguer = document.querySelector(".burger");
      if(close_burguer){
          // ver de cuanto es el tamaño de la pantalla si es igual o meno a 900px activar el menu movil
          close_burguer.addEventListener("click", function() {
              ver = document.querySelector(".menu_burguer_bm")
              movil = window.matchMedia("(max-width: 900px)");
              if(movil.matches){
                  m = document.querySelector(".menu_burguer_mobile")
                  console.log("m: ",m);
                  if (m.style.display == "none" || m.style.display == "") {
                      m.style.display = "block";
                  }else{
                      m.style.display = "none";
                  }
              }else{
                  if (ver.style.display == "none" || ver.style.display == "") {
                      ver.style.display = "block";
                  }else{
                      ver.style.display = "none";
                  }
              }
          });
      }
  
      // para que tambien se cierre el menu cuando se haga click en cualquier parte de la pantalla

  
      buecador = document.querySelector(".lupin");
      if(buecador){
          movil = window.matchMedia("(max-width: 900px)");
          if(movil.matches)return;
          buecador.addEventListener("click", function() {
              ver = document.querySelector(".basic_search_bm")
              if (ver.style.display == "none" || ver.style.display == "") {
                  ver.style.display = "block";
              }else{
                  ver.style.display = "none";
              }
          });
      }
  
      // para que tambien se cierre el menu cuando se haga click en cualquier parte de la pantalla
      window.addEventListener("click", function(event) {
              console.log("click", event);
              console.log(event.target.className.baseVal);
              if(event.target.className.baseVal == "lupin"){
                  document.querySelector(".menu_burguer_bm").style.display = "none";
              }else if(event.target.className.baseVal == "burger"){
                  document.querySelector(".basic_search_bm").style.display = "none";
              }
      });
  
      port =`
      <span class="iconBefore"></span>
      <strong class="sectionName" style="font-size: 1px;">Portafolio</strong>
      <span class="iconAfter"></span>`
      tabgrp = document.querySelectorAll(".tab-grp");
          tabgrp.forEach(e => {
              e.addEventListener("mouseover", function(i) {
                
                e.style.clipPath="polygon(11.5% -25.13%,96.50% -24.00%,88% 100%,0% 100%)";
                e.style.backgroundColor="#fd0f03";
                e.style.textAlign="center";
                e.style.margin="0px"
                e.style.colo="white"
                e.style.padding="0px";
                e.style.height="100%";
                console.log("i: ",i.target);
                block = i.target.querySelector(".sectionName")
                console.log("block: ",block.innerHTML);
                if(block && block.innerHTML){
                  if(block.innerHTML == "Actualidad"){
                      act = document.querySelector(".actualidad_sub .lst_items_sub")
                      // que se muestre el sub menu pero con una transicion suave
                      act.style.display="none";
                      act.style.display="flex";
                  }else if(block.innerHTML == "Estilo de vida"){
                      est = document.querySelector(".estilo_vida_sub .lst_items_sub")
                      // que se muestre el sub menu pero con una transicion suave
                      est.style.display="none";
                      est.style.display="flex";
                  }else if(block.innerHTML == "Portafolio"){
                      enf = document.querySelector(".portafolio_sub .lst_items_sub")
                      // que se muestre el sub menu pero con una transicion suave
                      enf.style.display="none";
                      enf.style.display="flex";
                  }else{
                      document.querySelector(".actualidad_sub .lst_items_sub").style.display="none";
                      document.querySelector(".estilo_vida_sub .lst_items_sub").style.display="none";
                      document.querySelector(".portafolio_sub .lst_items_sub").style.display="none";
                  }
                }
              });
              // activar el menu el sub menu
              

  
              e.addEventListener("mouseout", function() {
                  e.style.clipPath="polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)";
                  e.style.backgroundColor="#000";
                  e.style.padding="0px";
              });
          });
  
  } catch (error) {
      console.log("Error: ",error);
  }

  register2 = document.querySelector(".registro")
  if(register2){
      register2.style.innerHTML=""
  }
});
