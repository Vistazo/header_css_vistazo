
function swiperCandidatos() {


  var init = new Swiper(".b-can", {
    slidesPerView: 1,
    spaceBetween: 30,
    cssMode: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

}

function swiperPortada() {


  var init = new Swiper(".b-port", {
    slidesPerView: 1,
    spaceBetween: 30,
    cssMode: true,
    pagination: {
      el: ".swiper-pagination",
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
    },
  });

}

function startCountdown(targetDate) {
  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(interval);
      document.querySelector(".countdown").innerHTML = "¡Tiempo finalizado!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, "0");
    document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
  };

  const interval = setInterval(updateTimer, 1000);
  updateTimer(); // Llama una vez para evitar el retraso inicial
}

// Fecha objetivo: 4 de febrero de 2025 a las 00:00:00
const targetDate = new Date("2025-02-09T00:00:00");

const API_URL = "https://vtz.bmcodigo.com/getPortadaElecciones";

async function fetchData() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const data = await response.json();

    // Verificamos si la respuesta contiene datos
    if (data.success && data.data && Array.isArray(data.data)) {
      renderResults(data.data);
    } else {
      document.getElementById("results").innerHTML = `<p>No se encontraron datos disponibles.</p>`;
    }
  } catch (error) {
    console.error("Error al consumir la API:", error);
    document.getElementById("results").innerHTML = `<p>Error al cargar los datos.</p>`;
  }
}

function renderResults(data) {
  const resultsContainer = document.getElementById("results");

  // Limpiar contenido previo
  resultsContainer.innerHTML = "";

  data.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card-portada swiper-slide";

    card.innerHTML = `
      <div class="text_block">
        <h2>${item.title}</h2>
        <a href="${item.redirect}" target="_blank">Saber Más</a>
      </div>
      
      <div class="media_block">
        <img width="500" height="500" src="${item.src}" alt="${item.title}">
      </div>
    `;

    resultsContainer.appendChild(card);
  });
}


// URL de la API
const API_URL_CANDIDATOS = "https://vtz.bmcodigo.com/getCandidatos";

// Contenedor de las cards
const container = document.getElementById("candidatos-container");

// Función para crear y mostrar las cards
async function fetchAndDisplayCandidatos() {
    try {
        const response = await fetch(API_URL_CANDIDATOS);
        const result = await response.json();

        if (result.success) {
            const candidatos = result.data;

            // Iterar y crear las cards
            candidatos.forEach(candidato => {
                const card = document.createElement("div");
                card.className = "card-items swiper-slide";

                card.innerHTML = `
                <a href="${candidato.redirect}" target="_blank">
                  <img width="400" height="400" src="${candidato.src}" alt="${candidato.title}">
                  <div class="card-body">
                      <h3 class="card-title">${candidato.title}</h3>
                      <div class="card-description">
                          ${candidato.description.join("<br>")}
                      </div>
                  </div>
                </a>
                `;

                container.appendChild(card);
            });
        } else {
            container.innerHTML = "<p>No se pudo cargar la lista de candidatos.</p>";
        }
    } catch (error) {
        console.error("Error al consumir la API:", error);
        container.innerHTML = "<p>Ocurrió un error al cargar los datos.</p>";
    }
}

setTimeout(() => {
  swiperPortada();
  fetchAndDisplayCandidatos();
  fetchData();
  swiperCandidatos();
  startCountdown(targetDate);
}, 500);
