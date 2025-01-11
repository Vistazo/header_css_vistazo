
function swiperCandidatos() {

  var eleSwiper = document.querySelector('.bloque-candidatos');
  var eleWrapper = document.querySelector('.bloque-candidatos .noticias');
  var elementsSlide = document.querySelectorAll('.bloque-candidatos .noticias .article');

  eleSwiper.classList.add('swiper');
  eleWrapper.classList.add('swiper-wrapper');

  for (const xSliders of elementsSlide) {
    xSliders.classList.add('swiper-slide');
  }

  var prev = document.createElement('div');
  var next = document.createElement('div');

  prev.classList.add('swiper-button-prev');
  next.classList.add('swiper-button-next');

  eleSwiper.appendChild(prev);
  eleSwiper.appendChild(next);


  var init = new Swiper(eleSwiper, {
    slidesPerView: 1,
    spaceBetween: 30,
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
    card.className = "card-portada";

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

// Llamar a la función para cargar los datos al cargar la página




setTimeout(() => {
  fetchData();
  swiperCandidatos();
  startCountdown(targetDate);
}, 500);
