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