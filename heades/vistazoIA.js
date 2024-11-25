window.addEventListener("DOMContentLoaded", function () {
    const ToggleContent = document.getElementById("toggleContentIA");
    
    ToggleContent.addEventListener("click", function () {
      const loader = document.getElementById("loader_ia");
      const content = document.getElementById("content_ia");
      const textContent = document.getElementById("textContentIA");
      
      console.log("click");

      // Ocultar el contenido y mostrar el loader
      content.style.display = "none";
      loader.style.display = "block";
      
      // Ejecutar el scraping
      resumenscrape();
    });
    
    function typeWriterEffect(text) {
        let index = 0;
        const speed = 25; // Velocidad de escritura

        function typeWriter() {
            if (index < text.length) {
                document.getElementById("textContentIA").innerHTML +=
                text.charAt(index);  // Agregar carácter por carácter
                index++;
                setTimeout(typeWriter, speed);  // Repetir hasta terminar el texto
            }
        }

        // Limpiar el contenido previo
        document.getElementById("textContentIA").innerHTML = "";
        typeWriter(); // Iniciar el efecto
    }

    function resumenscrape(){
        const urlActual = window.location.href;
        
        // Hacer la petición POST para el scraping
        //https://api.ticketsecuador.ec/letter/send
        fetch("https://api.ticketsecuador.ec/letter/scraping/nota", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: urlActual,
                resumen: true,
            }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                // Ocultar el loader y mostrar el contenido
                document.getElementById("loader_ia").style.display = "none"; // Ocultar el loader
                document.getElementById("content_ia").style.display = "block"; // Mostrar el contenido

                // Asignar el título y aplicar la transición suave
                const titleContent = document.getElementById("titleContentIA");
                titleContent.innerHTML = data.title;
                titleContent.classList.add("fade-in_ia"); // Activar la transición suave para el título

                // Asignar la imagen y mostrarla
                const imgContent = document.getElementById("imgContentIA");
                imgContent.src = data.src;
                imgContent.style.display = "block"; // Mostrar la imagen
                imgContent.classList.add("fade-in_ia"); // Activar la transición suave para la imagen

                // Iniciar el efecto de escritura para el contenido del bullet
                typeWriterEffect(data.bullet); // Aplicar el efecto de escritura
            })
            .catch((error) => {
                console.error("Error:", error);
                // En caso de error, mostrar un mensaje de fallo en el efecto de escritura
                typeWriterEffect("No se pudo obtener el resumen de la noticia");
            });
    }
});


// cuando se aca click descargar_codigo_etica se tiene que descarga un pdf
window.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.getElementById("descargar_codigo_etica");
    downloadButton.addEventListener("click", function () {
        // Hacer la petición GET para descargar el PDF
        fetch("https://codigomarret.online/upload/img/codigo-de-etica-vistazo.pdf", {
            method: "GET",
        })
        .then((response) => response.blob())
        .then((blob) => {
            // Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "codigo_etica.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });
});