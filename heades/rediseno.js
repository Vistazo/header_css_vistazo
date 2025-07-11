window.addEventListener("resize", cambiarImagenPautaHome);

window.onscroll = function() {
  updateProgressBar();

};

function updateProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.querySelector(".progress-bardesk").style.width = scrolled + "%";
}

document.addEventListener("DOMContentLoaded", function () {
  Replica();
  // Seleccionar el elemento por su ID
  var lateralIzq = document.getElementById('lateral_izq');
  if(lateralIzq) {
    // Reemplazar todos los '&nbsp;' por un string vacío (eliminándolos)
    lateralIzq.innerHTML = lateralIzq.innerHTML.replace(/&nbsp;/g, '');
  }
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
        } else if (classList == "hogar_link") {
          MostrarSubMenu("hogar_submenu");
        } else if ( classList == "opinion_link") {
          LimpiaHoverMenu();
        }
      }
    });

  // Selecciona todos los enlaces con submenús
  const menuItems = document.querySelectorAll(".movil_nav-links li a.has-submenu");

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

  CanalWhatsappMovil();
  // si el tamaño de la pantalla es menor o igual a 768px
  if (window.innerWidth <= 768) {
    document.querySelector(".hamburg_bm").style.display = "none";
    document.querySelector(".hamburg_bm_movil").style.display = "block";
  } else {
    document.querySelector(".hamburg_bm").style.display = "block";
    document.querySelector(".hamburg_bm_movil").style.display = "none";
  }
  

  // if (path == "/deportes/jjoo-2024") {
  if(path == "/"){
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
  // Selecciona el enlace por su clase
  const subscribeBtn = document.querySelector('.subscribe-btn');
  
  // Define la URL que deseas asignar
  const url = 'https://suscripciones.vistazo.com/';
  
  // Asigna la URL al atributo href del enlace
  subscribeBtn.href = url;
  subscribeBtn.target = '_blank';
  
});


document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar todos los enlaces dentro de la lista teaser-related-list
  const enlaces = document.querySelectorAll('.teaser-related-list article a');
  if(enlaces){
    // Iterar sobre cada enlace
    enlaces.forEach(function(enlace) {
        // Crear un pseudoelemento antes del enlace para el punto
        enlace.style.position = 'relative';
        // Quitar el subrayado del punto (contenido en ::before)
        const punto = document.createElement('span');
        punto.textContent = "•"; // Punto como bullet
        punto.style.position = 'absolute';
        punto.style.left = '-5px';
        punto.style.color = 'black';
        punto.style.textDecoration = 'none'; // Remueve el subrayado del punto
        // Insertar el punto antes del texto del enlace
        enlace.prepend(punto);
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let hogarSession = document.querySelector(".head_title .title.hogar a>div");
  console.log("hogarSession: ", hogarSession);
  if (hogarSession) {
    hogarSession.innerHTML = "";
    hogarSession.innerHTML = `
    <span class="hogar-text-1"> 
      <span class="letter-h">H</span>
      <span class="letter-o">O</span> 
      <span class="letter-g">G</span> 
      <span class="letter-a">A</span> 
      <span class="letter-r">R</span> 
    </span>`;
  }
});



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
  document.querySelector(".hogar_submenu").style.display = "none";
  document.querySelector(".basic_search_bm").style.display = "none";
  document.querySelector(".menu_burguer_bm").style.display = "none";
}
// cuando se haga click en cualquier lado se oculte el submenu
// document.addEventListener("click", function (event) {
//   LimpiaHoverMenu();
// });

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
  try {
    var elemento = document.querySelector(
      ".canal_whatsapp_link .acnal_whatsapp_link_redirect"
    );
    // elemento.style.display = "block";
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
  } catch (error) {
    console.log("");
  }
}

function CanalWhatsappMovil() {
  const canalMovil = document.querySelector(".canal_whatsapp_link .canal_whatsapp")
  if(canalMovil){
    canalMovil.style.display = "none";
  }
  var elemento = document.querySelector(".canal_whatsapp_movil .acnal_whatsapp_link_redirect");
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

function cambiarImagenPautaHome() {
  var enlace = document.querySelector(".IMG_PAUTAS_DIGITALES .multimedia a");
  var imagen = document.querySelector(".IMG_PAUTAS_DIGITALES .multimedia img");
  var imagenesDesktop = [
    // { src: "https://codigomarret.online/upload/img/banner-mascotas-1920x200.jpg", href: "https://www.vistazo.com/mascotas" },
    { src: "https://codigomarret.online/upload/img/voces_escritorio.png", href: "https://www.vistazo.com/concurso_ecuador_voces_en_accion" },
    // Agrega más objetos para más imágenes y enlaces
  ];
  var imagenesMovil = [
    // { src: "https://codigomarret.online/upload/img/banner-mascotas-400x100.jpg", href: "https://www.vistazo.com/mascotas" },
    { src: "https://codigomarret.online/upload/img/voces_movil.png", href: "https://www.vistazo.com/concurso_ecuador_voces_en_accion" },
    // Agrega más objetos para más imágenes y enlaces
  ];
  let indiceActual = 0;

  function mostrarImagenSuave(imagenActual) {
    imagen.style.opacity = 0; // Hace invisible la imagen para comenzar la transición
    imagen.src = imagenActual.src;
    // imagen.loading = "lazy";
    enlace.href = imagenActual.href;
    imagen.style.opacity = 1; // Hace visible la imagen suavemente
    // setTimeout(() => {
    // }, 100); // Espera 1 segundo para comenzar a mostrar la imagen, coincidiendo con la transición de opacidad
  }

  function actualizarImagen() {
    mostrarImagenSuave(imagenesDesktop[indiceActual]);
    indiceActual = (indiceActual + 1) % imagenesDesktop.length;
  }

  function actualizarImagenMovil() {
    mostrarImagenSuave(imagenesMovil[indiceActual]);
    indiceActual = (indiceActual + 1) % imagenesMovil.length;
  }

  if(enlace && imagen){
    // Decide si iniciar el carrusel o mostrar solo una imagen
    if (window.innerWidth <= 768) {
      if (imagenesMovil.length > 1) {
        setInterval(actualizarImagenMovil, 10000); // Cambia cada 10 segundos
      } else {
        mostrarImagenSuave(imagenesMovil[0]);
      }
    } else {
      if (imagenesDesktop.length > 1) {
        setInterval(actualizarImagen, 10000); // Cambia cada 10 segundos
      } else {
        mostrarImagenSuave(imagenesDesktop[0]);
      }
    }
  
    // Actualizar la imagen al cargar la página
    if (window.innerWidth <= 768) {
      actualizarImagenMovil();
    } else {
      actualizarImagen();
    }
  }

}


function cambiarImagenPautaEstadio() {
  try {
    let url = "https://codigomarret.online/upload/img/elecciones-(1920-x-200-px).png";
    var pautaEstadio = document.querySelector(".pauta_estadio_css");

    // Asegúrate de que el elemento existe antes de aplicar estilos
    if (pautaEstadio) {
      pautaEstadio.style.display = "none";
      return;
      // crear etiqueta img y poner la imagen en volver la imagen en a para que sea clickeable y redireccione a la url de estadío
      let path = window.location.pathname;
      if (path == "/") {
        let a = document.createElement("a");
        let img = document.createElement("img");
        if (window.innerWidth <= 768) {
          img.src = "https://codigomarret.online/upload/img/elecciones-(400-x-100-px).png";
        } else {
          img.src = "https://codigomarret.online/upload/img/elecciones-(1920-x-200-px).png"
        }
        a.href = "https://www.vistazo.com/elecciones-ecuador-presidente-asamblea-2025";
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


// una function para descargar un pdf
function DescargaPdfEtica(){
    fetch("https://codigomarret.online/upload/img/codigo-de-etica-vistazo.pdf", {
        method: "GET",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        })
        .then((blob) => {
            // Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "codigo_etica.pdf"; // Nombre del archivo descargado
            document.body.appendChild(a); // Agregar el enlace al DOM
            a.click(); // Simular clic
            a.remove(); // Limpiar el DOM
            window.URL.revokeObjectURL(url); // Liberar memoria
        })
        .catch((error) => {
            console.error("Error al descargar el archivo:", error);
        });
}

window.DescargaPdfEtica = DescargaPdfEtica;
window.cambiarImagenPautaHome = cambiarImagenPautaHome;


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


// Ocultar Nota en Hogar 
const HomeHogar = "https://www.vistazo.com"
const url = [
    'https://www.vistazo.com/testing/david-daxsen-el-visionario-ecuatoriano-que-trabaja-para-las-naciones-unidas-GB7298109',
    'https://www.vistazo.com/hogar/personajes/david-daxsen-el-visionario-ecuatoriano-que-trabaja-para-las-naciones-unidas-GB7298109'
]
document.addEventListener("DOMContentLoaded", function() {
    const currentUrl = window.location.href;
    const isInUrlList = url.some(url => currentUrl.includes(url));
    if (isInUrlList) {
        // lo redirecciona a la home de hogar
        window.location.href = HomeHogar;
    }
});


document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const limit = isMobile ? 100 : 200; // Set the character limit based on screen size
  document.querySelectorAll(".subheadline_unico").forEach(function (element) {
	const text = element.innerHTML;
	if (text.length > limit) {
	  element.innerHTML = text.substring(0, limit) + "...";
	}
  });
});
// validar primero si existe el elemento con id unico_6
if (document.getElementById("unico_6") === null) {
  console.log("El elemento con id unico_6 no existe");
}else{
  document.getElementById("unico_6").addEventListener("click", function(e) {
    e.preventDefault(); // Evita la redirección original
    window.location.href = "https://www.instagram.com/reel/DJAF19npj7b/?igsh=MTBqM2c3dHFkcmRieQ%3D%3D"; // Cambia aquí la nueva URL
  });
}