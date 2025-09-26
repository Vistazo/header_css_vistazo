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
              videoItem.classList.add("video-item-teca");
              videoItem.innerHTML = `
              <img src="https://img.youtube.com/vi/${getYouTubeID(
                video.youtubeVideo)}/0.jpg" alt="${video.titulo}" width="100%" loading="lazy" >
              <p
              onmouseover="this.style.color='red'"
              onmouseout="this.style.color='white'"
              class="video-title-movil"
              >${video.titulo}</p>`;
              videoItem.onclick = () => {videoPlayer.src = `//${video.youtubeVideo}`};
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