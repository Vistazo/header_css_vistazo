
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
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
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

setTimeout(() => {
  swiperCandidatos();
  startCountdown(targetDate);
}, 500);
