(function () {
  const PROXY_EVENTS_URL = "http://localhost:3001/events";
  const ECUADOR_TIMEZONE = "America/Guayaquil";

  const portada = document.querySelector(".item-portada");
  const conteo = document.querySelector(".cintillo-conteo");

  const selector = (key) => conteo.querySelector(`[data-count="${key}"]`);

  function getNowInEcuadorMs() {
    return new Date(
      new Date().toLocaleString("en-US", { timeZone: ECUADOR_TIMEZONE })
    ).getTime();
  }

  function toEcuadorMs(dateString) {
    return new Date(
      new Date(dateString).toLocaleString("en-US", { timeZone: ECUADOR_TIMEZONE })
    ).getTime();
  }

  function actualizarConteo(fechaFinMs) {
    const ahora = getNowInEcuadorMs();
    const distancia = fechaFinMs - ahora;

    if (distancia < 0) {
      return false;
    }

    const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distancia % (1000 * 60)) / 1000);

    selector("dias").innerText = d.toString().padStart(2, "0");
    selector("horas").innerText = h.toString().padStart(2, "0");
    selector("minutos").innerText = m.toString().padStart(2, "0");
    selector("segundos").innerText = s.toString().padStart(2, "0");

    return true;
  }

  async function getEvents() {
    const response = await fetch(PROXY_EVENTS_URL);

    if (!response.ok) {
      throw new Error(`Error obteniendo eventos: ${response.status}`);
    }

    return response.json();
  }

  function formatMeta(event) {
    const start = new Date(event.startDate);
    const dateFormatter = new Intl.DateTimeFormat("es-EC", {
      day: "2-digit",
      month: "long",
      timeZone: ECUADOR_TIMEZONE,
    });
    const timeFormatter = new Intl.DateTimeFormat("es-EC", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: ECUADOR_TIMEZONE,
    });

    const dateStr = dateFormatter.format(start);
    const timeStr = timeFormatter.format(start);
    const locationStr = [event.city, event.address].filter(Boolean).join(", ");

    return `${dateStr}${locationStr ? " / " + locationStr : ""}${timeStr ? " / " + timeStr : ""}`;
  }

  function buildCountdownUI() {
    conteo.innerHTML = `
      <span class="mensaje">¡Asegura tu cupo! El tiempo se agota</span>
      <a href="#" class="btn-agenda">Ver agenda</a>
      <div class="conteo-wrapper">
        <span class="texto-faltan">Faltan:</span>
        <div class="timer-grid">
          <div class="timer-box">
            <span class="timer-label">Días</span>
            <span class="timer-val" data-count="dias">00</span>
          </div>
          <div class="timer-box">
            <span class="timer-label">Horas</span>
            <span class="timer-val" data-count="horas">00</span>
          </div>
          <div class="timer-box">
            <span class="timer-label">Min</span>
            <span class="timer-val" data-count="minutos">00</span>
          </div>
          <div class="timer-box">
            <span class="timer-label">Seg</span>
            <span class="timer-val" data-count="segundos">00</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderEvent(event) {
    portada.innerHTML = "";

    const bg = document.createElement("div");
    bg.className = "item-portada__bg";
    if (event.coverImage) {
      bg.style.backgroundImage = `url('${event.coverImage}')`;
    }

    const overlay = document.createElement("div");
    overlay.className = "item-portada__overlay";

    const content = document.createElement("div");
    content.className = "item-portada__content";

    const meta = document.createElement("div");
    meta.className = "item-portada__meta";

    const badge = document.createElement("span");
    badge.className = "item-portada__meta-badge";
    badge.textContent = "E";

    const metaText = document.createElement("span");
    metaText.textContent = formatMeta(event);

    const title = document.createElement("h1");
    title.className = "item-portada__title";
    title.textContent = event.title || "";

    const subtitle = document.createElement("p");
    subtitle.className = "item-portada__subtitle";
    subtitle.textContent = event.subtitle || "";

    meta.appendChild(badge);
    meta.appendChild(metaText);
    content.appendChild(meta);
    content.appendChild(title);
    content.appendChild(subtitle);

    portada.appendChild(bg);
    portada.appendChild(overlay);
    portada.appendChild(content);

    portada.hidden = false;
  }

  async function init() {
    try {
      const data = await getEvents();
      const event = data?.events?.[0];

      if (!event) {
        portada.hidden = true;
        conteo.hidden = true;
        return;
      }

      const startMs = toEcuadorMs(event.startDate);
      const endMs = toEcuadorMs(event.endDate);
      const nowMs = getNowInEcuadorMs();

      if (nowMs < startMs || nowMs > endMs) {
        portada.hidden = true;
        conteo.hidden = true;
        return;
      }

      renderEvent(event);
      buildCountdownUI();
      conteo.hidden = false;

      const tick = () => {
        const ok = actualizarConteo(endMs);
        if (!ok) {
          portada.hidden = true;
          conteo.hidden = true;
        }
      };

      tick();
      setInterval(tick, 1000);
    } catch (error) {
      console.error(error);
      portada.hidden = true;
      conteo.hidden = true;
    }
  }

  init();
})();
