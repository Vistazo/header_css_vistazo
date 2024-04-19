function toggleMenu() {
  var menu = document.getElementById("menuMobileList");
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
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
  var swiperProg = new Swiper(".swiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    cssMode: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
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