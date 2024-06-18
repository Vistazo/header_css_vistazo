function toggleMenu() {
  var menu = document.getElementById("menuMobileList");
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

// Obtener todas las etiquetas <a> dentro de la clase .menuIcon
var links = document.querySelectorAll('.menuIcon a');

// Cambiar el href de la primera etiqueta <a>
if (links.length > 0) {
    links[0].href = "https://www.instagram.com/mascotasdigital";
}

// Cambiar el href de la segunda etiqueta <a>
if (links.length > 1) {
    links[1].href = "https://www.tiktok.com/@mascotasdigital.ec";
}



function searchMenu() {
  var searchmascotas = document.querySelector(".sb_mascotas");
  if (searchmascotas.style.display === "none") {
    searchmascotas.style.display = "block";
  } else {
    searchmascotas.style.display = "none";
  }
}




function swAper() {
  const agendaDeskSwiper = document.querySelector('.ap_items');
  const agendaDeskWraper = document.querySelector('.ap_items .noticias');
  const agendaDeskSlider = document.querySelectorAll('.ap_items .noticias .article');


  agendaDeskSwiper.classList.add('swiper');
  agendaDeskWraper.classList.add('swiper-wrapper');





  // Crea el botón previo y establece su clase
  var prevButton = document.createElement('div');
  prevButton.className = 'swiper-button-prev';

  // Crea el botón siguiente y establece su clase
  var nextButton = document.createElement('div');
  nextButton.className = 'swiper-button-next';

  // Añade los botones previo y siguiente al contenedor swiper
  agendaDeskSwiper.appendChild(prevButton);
  agendaDeskSwiper.appendChild(nextButton);

  for (const agendaDeskSliders of agendaDeskSlider) {
    agendaDeskSliders.classList.add('swiper-slide');
  }

  var swiperProg = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    cssMode: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
}

setTimeout(() => {
  swAper();
}, 300);

setTimeout(() => {
  const apItems = document.querySelector('.ap_items');
  apItems.style.display = "block";
  console.log(apItems);
}, 302);
