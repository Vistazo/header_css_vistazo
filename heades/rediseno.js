window.addEventListener("resize", cambiarImagenPautaHome);

document.addEventListener("DOMContentLoaded", function () {
  var middle3 = document.getElementById("Middle3");
  if (middle3) {
    middle3.remove();
  }
  Replica();
});

document.addEventListener("DOMContentLoaded", function () {
  let path = window.location.pathname;

  document
    .querySelector(".nav-links")
    .addEventListener("mouseover", function (event) {
      if (event.target.classList && event.target.classList.length >= 2) {
        const classList = event.target.classList[1];
        if (classList == "actualidad_link") {
          MostrarSubMenu("actualidad_submenu");
        } else if (classList == "politica_link") {
          MostrarSubMenu("politica_submenu");
        } else if (classList == "estilo_link") {
          MostrarSubMenu("estilo_vida_submenu");
        } else if (classList == "estadio_link") {
          MostrarSubMenu("estadio_submenu");
        } else if (classList == "portafolio_link") {
          MostrarSubMenu("portafolio_submenu");
        } else if (
          classList == "hogar_link" ||
          classList == "opinion_link" ||
          classList == "hogar_link"
        ) {
          LimpiaHoverMenu();
        }
      }
    });

  // Selecciona todos los enlaces con submenús
  const menuItems = document.querySelectorAll(
    ".movil_nav-links li a.has-submenu"
  );

  // Itera sobre cada elemento que tiene submenú y agrega el evento de clic
  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
      const submenu = this.nextElementSibling;
      // Alternar la visibilidad del submenú
      if (submenu.style.display === "block") {
        submenu.style.display = "none";
      } else {
        submenu.style.display = "block";
      }
    });
  });

  // si el tamaño de la pantalla es menor o igual a 768px
  if (window.innerWidth <= 768) {
    document.querySelector(".hamburg_bm").style.display = "none";
    document.querySelector(".hamburg_bm_movil").style.display = "block";
    // CanalWhatsappMovil();
  } else {
    document.querySelector(".hamburg_bm").style.display = "block";
    document.querySelector(".hamburg_bm_movil").style.display = "none";
  }
  CanalWhatsapp();

  if (path == "/deportes/jjoo-2024") {
    // if(path == "/deportes" || path == "/" || path == "/deportes/jjoo-2024"){
    cambiarImagenPautaEstadio();
  }
  if (path == "/" || path == "/tes/index.html") {
    cambiarImagenPautaHome();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Configurar el IntersectionObserver para la carga de la videoteca
  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        videoTecarender(); // Llamar a la función para cargar los videos cuando es visible
        observer.unobserve(entry.target); // Dejar de observar después de cargar los videos
      }
    });
  });

  // Selecciona el contenedor de la videoteca
  const videotecaSection = document.querySelector(".videoteca");
  if (videotecaSection) {
    observer.observe(videotecaSection); // Inicia la observación de la sección videoteca
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Primero eliminamos los scripts si existen
  removeExternalScripts();

  // Esperar el primer scroll para cargar los scripts
  window.addEventListener("scroll", loadOnScroll, { once: true }); // Escuchar solo una vez
});

function removeExternalScripts() {
  // Eliminar el script de YouTube si ya existe
  let youtubeScript = document.querySelector(
    'script[src="https://www.youtube.com/iframe_api"]'
  );
  if (youtubeScript) {
    youtubeScript.remove();
    console.log("Script de YouTube eliminado");
  }

  // Eliminar el script de Google Ads si ya existe
  let googleAdsScript = document.querySelector(
    'script[src="https://tpc.googlesyndication.com/sodar/sodar2.js"]'
  );
  if (googleAdsScript) {
    googleAdsScript.remove();
    console.log("Script de Google Ads eliminado");
  }
}

function loadOnScroll() {
  // Llamar la función para cargar los scripts al hacer scroll
  loadExternalScripts();
}

function loadExternalScripts() {
  // Cargar el script de YouTube nuevamente
  let youtubeScript = document.createElement("script");
  youtubeScript.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(youtubeScript);
  console.log("Script de YouTube cargado nuevamente");

  // Cargar el script de Google Ads nuevamente
  let googleAdsScript = document.createElement("script");
  googleAdsScript.src = "https://tpc.googlesyndication.com/sodar/sodar2.js";
  document.body.appendChild(googleAdsScript);
  console.log("Script de Google Ads cargado nuevamente");
}

function MostrarSubMenu(classList) {
  LimpiaHoverMenu();
  cont = document.querySelector(".subnav");
  cont.style.display = "block";
  document.querySelector("." + classList).style.display = "block";
}

function LimpiaHoverMenu() {
  document.querySelector(".subnav").style.display = "none";
  document.querySelector(".actualidad_submenu").style.display = "none";
  document.querySelector(".politica_submenu").style.display = "none";
  document.querySelector(".estilo_vida_submenu").style.display = "none";
  document.querySelector(".estadio_submenu").style.display = "none";
  document.querySelector(".portafolio_submenu").style.display = "none";
  document.querySelector(".basic_search_bm").style.display = "none";
  document.querySelector(".menu_burguer_bm").style.display = "none";
}

function openSearch() {
  // Función para abrir un cuadro de búsqueda
  alert("Abrir cuadro de búsqueda");
}

function toggleMenu() {
  const menu = document.querySelector(".menu_burguer_bm");
  menu.style.display =
    menu.style.display === "none" || menu.style.display === ""
      ? "block"
      : "none";
}

function toggleSearch() {
  const searchBox = document.querySelector(".basic_search_bm");
  searchBox.style.display =
    searchBox.style.display === "none" || searchBox.style.display === ""
      ? "block"
      : "none";
}

function toggleMenuMovil() {
  const menu = document.querySelector(".menu_movil");
  menu.style.display =
    menu.style.display === "none" || menu.style.display === ""
      ? "block"
      : "none";
}

function CanalWhatsapp() {
  document.querySelector(
    ".canal_whatsapp_link_movil .acnal_whatsapp_link_redirect"
  ).style.display = "none";
  var elemento = document.querySelector(
    ".canal_whatsapp_link .acnal_whatsapp_link_redirect"
  );
  console.log(elemento);
  if (elemento) {
    //icon https://codigomarret.online/upload/img/whatsapp_37229.ico
    let textContent =
      '<img src="https://codigomarret.online/upload/img/whatsapp_37229.ico" alt="whatsapp-icon" loading="lazy" style="width: 20px; height: 20px; margin-right: 5px;">[¡Estamos en WhatsApp! 📲 ' +
      // azul
      '<b  class="b_azul" style="color: #4097ee;" >Empieza a seguirnos ahora</b>🚀]';
    // '<b style="color: #25d366;" >Empieza a seguirnos ahora</b>🚀]';
    elemento.innerHTML = textContent;
    // que cuando agan hover en b_azul le apareca una subraya azul
    let b = document.querySelector(".b_azul");
    b.onmouseover = () => {
      b.style.textDecoration = "underline";
    };

    // elemento.textContent = '<span class="whatsapp-icon">📲</span>[¡Estamos en WhatsApp! 📲 Empieza a seguirnos ahora🚀]';
    // que valla en negrita
    elemento.style.fontWeight = "bold";
    // que tenga un color
    elemento.style.color = "black";
    // cursiva
    elemento.style.fontStyle = "italic";
  }
}

function CanalWhatsappMovil() {
  document.querySelector(
    ".canal_whatsapp_link .acnal_whatsapp_link_redirect"
  ).style.display = "none";
  var elemento = document.querySelector(
    ".canal_whatsapp_link_movil .acnal_whatsapp_link_redirect"
  );
  console.log(elemento);
  if (elemento) {
    //icon https://codigomarret.online/upload/img/whatsapp_37229.ico
    let textContent =
      '<img loading="lazy" src="https://codigomarret.online/upload/img/whatsapp_37229.ico" alt="whatsapp-icon" style="width: 20px; height: 20px; margin-right: 5px;">[¡Estamos en WhatsApp! 📲 ' +
      // azul
      '<b  class="b_azul" style="color: #4097ee;" >Empieza a seguirnos ahora</b>🚀]';
    // '<b style="color: #25d366;" >Empieza a seguirnos ahora</b>🚀]';
    elemento.innerHTML = textContent;
    // que cuando agan hover en b_azul le apareca una subraya azul
    let b = document.querySelector(".b_azul");
    b.onmouseover = () => {
      b.style.textDecoration = "underline";
    };

    // elemento.textContent = '<span class="whatsapp-icon">📲</span>[¡Estamos en WhatsApp! 📲 Empieza a seguirnos ahora🚀]';
    // que valla en negrita
    elemento.style.fontWeight = "bold";
    // que tenga un color
    elemento.style.color = "black";
    // cursiva
    elemento.style.fontStyle = "italic";
  }
}

function videoTecarender() {
  try {
    fetch("https://api.ticketsecuador.ec/letter/videoteca_listar")
      .then((res) => res.json())
      .then((data) => {
        var videoteca = document.querySelector(".videoteca .noticias");
        var videoPlayer = document.querySelector(
          ".art-youtube .responsive-video iframe"
        );
        if (videoteca && data.success) {
          videoteca.innerHTML = "";
          data.data.forEach((video) => {
            const videoItem = document.createElement("div");
            videoItem.style.cursor = "pointer";
            videoItem.innerHTML = `
            <img src="https://img.youtube.com/vi/${getYouTubeID(
              video.youtubeVideo)}/0.jpg" alt="${video.titulo}" width="100%" loading="lazy" >
            <p style='color: white; font-size: 16px; margin: 0px;'
            onmouseover="this.style.color='red'"
            onmouseout="this.style.color='white'"
            >${video.titulo}</p>`;
            videoItem.onclick = () => {
              videoPlayer.src = `//${video.youtubeVideo}`;
            };
            console.log(videoItem);
            videoteca.appendChild(videoItem);
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
}

function getYouTubeID(url) {
  const urlParts = url.split("/");
  const videoID = urlParts[urlParts.length - 1].split("?")[0];
  return videoID;
}

function cambiarImagenPautaHome() {
  var enlace = document.querySelector(".IMG_PAUTAS_DIGITALES .multimedia a");
  var imagen = document.querySelector(".IMG_PAUTAS_DIGITALES .multimedia img");
  if (window.innerWidth <= 768) {
    imagen.src =
      "https://codigomarret.online/upload/img/banner-mascotas-400x100.jpg";
      imagen.loading = "lazy";
    enlace.href = "https://www.vistazo.com/mascotas";
  } else {
    imagen.src =
      "https://codigomarret.online/upload/img/banner-mascotas-1920x200.jpg";
      imagen.loading = "lazy";
    enlace.href = "https://www.vistazo.com/mascotas";
  }
}

function cambiarImagenPautaEstadio() {
  try {
    let url = "https://codigomarret.online/upload/img/jjoo-(1920-x-200-px).png";
    var pautaEstadio = document.querySelector(".pauta_estadio_css");
    // Asegúrate de que el elemento existe antes de aplicar estilos
    if (pautaEstadio) {
      // crear etiqueta img y poner la imagen envolver la imagen en a para que sea clickeable y redireccione a la url de estadío
      let path = window.location.pathname;
      if (path == "/") {
        let a = document.createElement("a");
        a.href = "https://www.vistazo.com/deportes/jjoo-2024";
        let img = document.createElement("img");
        img.src = url;
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.display = "block";
        pautaEstadio.style.width = "100%";
        pautaEstadio.style.overflow = "hidden";
        a.appendChild(img);
        pautaEstadio.appendChild(a);
      } else {
        let img = document.createElement("img");
        img.src = url;
        img.style.width = "100%";
        img.style.height = "auto";
        img.style.display = "block";
        pautaEstadio.style.width = "100%";
        pautaEstadio.style.overflow = "hidden";
        pautaEstadio.appendChild(img);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function Replica() {
  fetch("https://www.vistazo.com/rss/replicas.json")
    .then((response) => response.json())
    .then((data) => {
      // Obtiene el primer elemento de la matriz "item" de la api
      const primerItem = data.rss.channel.item[0];
      if (primerItem) {
        const enlace = primerItem.link;
        console.log("enlace json replica:", enlace);
        const menuBurguerItems = document.querySelectorAll(
          ".menu_burguer .tab-item"
        );
        if (menuBurguerItems.length >= 2) {
          menuBurguerItems[1].href = enlace;
        }
      } else {
        console.log("No se encontraron elementos en el JSON.");
      }
    })
    .catch((error) => {
      console.error("Error al obtener el JSON:", error);
    });
}

function loadScript(a) {
  var b = document.getElementsByTagName("head")[0],
    c = document.createElement("script");
    (c.type = "text/javascript"),
    (c.src = "https://tracker.metricool.com/resources/be.js"),
    (c.onreadystatechange = a),
    (c.onload = a),
    b.appendChild(c);
}
loadScript(
    function () {
        beTracker.t({ hash: "1f8f9d10dbf96519b00b253d557670f8" });
    }
);
