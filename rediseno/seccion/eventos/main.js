(function () {
  // CONFIGURACIÓN: Pon aquí la fecha de tu evento
  const fechaObjetivo = new Date("jun 13, 2026 23:59:59").getTime();

  const selector = (id) => document.querySelector(`.cintillo-conteo #${id}`);

  function actualizarConteo() {
    const ahora = new Date().getTime();
    const distancia = fechaObjetivo - ahora;

    if (distancia < 0) {
      clearInterval(intervalo);
      return;
    }

    const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distancia % (1000 * 60)) / 1000);

    selector('dias').innerText = d.toString().padStart(2, '0');
    selector('horas').innerText = h.toString().padStart(2, '0');
    selector('minutos').innerText = m.toString().padStart(2, '0');
    selector('segundos').innerText = s.toString().padStart(2, '0');
  }

  const intervalo = setInterval(actualizarConteo, 1000);
  actualizarConteo();
})();