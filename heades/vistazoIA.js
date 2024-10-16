window.addEventListener("DOMContentLoaded", function () {
    ToggleContent = document.getElementById("toggleContentIA")
    ToggleContent.addEventListener("click", function () {
      const loader = document.getElementById("loader_ia");
      const content = document.getElementById("content_ia");
      const textContent = document.getElementById("textContentIA");
      console.log("click");
      // Ocultar el contenido y mostrar el loader
      content.style.display = "none";
      loader.style.display = "block";

      // Simular un retardo para la carga
      setTimeout(function () {
        loader.style.display = "none"; // Ocultar el loader
        content.style.display = "block"; // Mostrar el contenido
        typeWriterEffect(); // Aplicar el efecto de escritura
      }, 2000); // 2 segundos de carga
    });

  function typeWriterEffect() {
    const text = `El futbolista Marco Ángulo, de Liga de Quito, está en estado crítico tras un grave accidente de tránsito en la Autopista General Rumiñahui, Quito, el 7 de octubre. Ángulo sufrió múltiples lesiones, incluyendo fractura de pelvis, edema cerebral y hemorragias internas, y se encuentra en terapia intensiva con pronóstico reservado. El accidente ocurrió cuando un auto de alta gama impactó a gran velocidad contra una viga. Liga de Quito ha expresado su solidaridad con las familias afectadas. Este es el segundo accidente grave en el que Ángulo se ve involucrado en los últimos años.`;
    let index = 0;
    const speed = 50; // Velocidad de escritura

    function typeWriter() {
      if (index < text.length) {
        document.getElementById("textContentIA").innerHTML +=
          text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      }
    }

    // Limpiar el contenido previo
    document.getElementById("textContentIA").innerHTML = "";
    typeWriter(); // Iniciar el efecto
  }
});
