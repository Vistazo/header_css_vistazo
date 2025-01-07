
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

setTimeout(() => {
  swiperCandidatos();
}, 500);
