document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu-desplegable");

  menuToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    menu.classList.toggle("show");
  });

  document.addEventListener("click", function (e) {
    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
      menu.classList.remove("show");
    }
  });

  document.querySelectorAll("#menu-desplegable a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.getElementById("search-toggle");
  const searchBox = document.getElementById("search-box");
  const searchInput = document.getElementById("search-input");
  const suggestionsList = document.getElementById("suggestions-list");

  // Mostrar/ocultar buscador
  searchToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    searchBox.classList.toggle("d-none");
    suggestionsList.innerHTML = "";
    if (!searchBox.classList.contains("d-none")) {
      setTimeout(() => searchInput.focus(), 100);
    }
  });

  // Cerrar si se hace click fuera
  document.addEventListener("click", function (e) {
    if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
      searchBox.classList.add("d-none");
    }
  });

  // Buscar coincidencias y mostrar sugerencias
  searchInput.addEventListener("input", function () {
    const query = this.value.trim().toLowerCase();
    suggestionsList.innerHTML = "";

    if (query.length < 2) return;

    const searchables = Array.from(
      document.querySelectorAll("h1, h2, h3, p, a, li, span")
    );
    const seen = new Set();
    const matches = [];

    searchables.forEach((el) => {
      const text = el.innerText.trim();
      const lowerText = text.toLowerCase();

      // Solo si contiene el texto y aún no ha sido mostrado
      if (
        lowerText.includes(query) &&
        !seen.has(lowerText) &&
        text.length > 0
      ) {
        seen.add(lowerText);
        matches.push({ element: el, text });
      }
    });

    matches.slice(0, 10).forEach((match) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerText =
        match.text.length > 60 ? match.text.slice(0, 60) + "..." : match.text;
      li.addEventListener("click", () => {
        match.element.scrollIntoView({ behavior: "smooth", block: "center" });
        searchBox.classList.add("d-none");
        searchInput.value = "";
        suggestionsList.innerHTML = "";
      });
      suggestionsList.appendChild(li);
    });
  });

  // Enter activa primer match
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const firstSuggestion = suggestionsList.querySelector("li");
      if (firstSuggestion) firstSuggestion.click();
    }
  });
});

// CRONOMETRO
// Fecha objetivo (27 de agosto de 2025 a medianoche)
const fechaObjetivo = new Date("2025-08-27T00:00:00");

function actualizarContador() {
  const ahora = new Date();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    document.getElementById("dias").innerText = "0";
    document.getElementById("horas").innerText = "0";
    document.getElementById("minutos").innerText = "0";
    document.getElementById("segundos").innerText = "0";
    document.getElementById("mensaje") &&
      (document.getElementById("mensaje").innerText =
        "¡El evento ha comenzado!");
    return;
  }

  const segundosTotales = Math.floor(diferencia / 1000);
  const minutos = Math.floor(segundosTotales / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  const horasRestantes = horas % 24;
  const minutosRestantes = minutos % 60;
  const segundosRestantes = segundosTotales % 60;

  document.getElementById("dias").innerText = dias;
  document.getElementById("horas").innerText = horasRestantes;
  document.getElementById("minutos").innerText = minutosRestantes;
  document.getElementById("segundos").innerText = segundosRestantes
    .toString()
    .padStart(2, "0");
}

actualizarContador();
setInterval(actualizarContador, 1000); // cada segundo

// si hacen click la clase logo-header se tiene que abrir una nueva pestaña vistazo.com
document.querySelector(".logo-header").addEventListener("click", function () {
  window.open("https://www.vistazo.com", "_blank");
});

document.addEventListener("DOMContentLoaded", function () {
  const key = "notificaciones_activadas";

  // Si no está activado aún
  if (localStorage.getItem(key) !== "true") {
    const modal = new bootstrap.Modal(
      document.getElementById("modalNotificaciones")
    );
    modal.show();

    document
      .getElementById("btnAceptarNotificaciones")
      ?.addEventListener("click", async () => {
        if (Notification.permission === "denied") {
          const modalDenegado = new bootstrap.Modal(
            document.getElementById("modalPermisoDenegado")
          );
          modalDenegado.show();
          return;
        }
        const permiso = await Notification.requestPermission();
        if (permiso === "granted") {
          localStorage.setItem("notificaciones_activadas", "true");
          // await activarNotificaciones(); // tu función para subscribir
          // cerrar el modal
          modal.hide();
        } else if (permiso === "denied") {
          const modalDenegado = new bootstrap.Modal(
            document.getElementById("modalPermisoDenegado")
          );
          modalDenegado.show();
        }
      });
  }
});

async function descargarPDF() {
  const url = 'https://codigomarret.online/upload/img/voces-en-accion-bases-actualizado.pdf';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Error al descargar el PDF:', response.statusText);
      return;
    }
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "voces-en-accion-bases-actualizado.pdf"; // Nombre sugerido
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    console.log("✅ PDF descargado exitosamente");
  } catch (error) {
    console.error("Error al intentar descargar:", error);
  }
}


