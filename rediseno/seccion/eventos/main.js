(function () {
  const AUTH_API_URL = "https://backoffice.bmcodigo.com/api/public/auth/token";
  const EVENTS_API_URL = "https://backoffice.bmcodigo.com/api/events";
  const SPEAKERS_API_URL =
    "https://backoffice.bmcodigo.com/api/events/cmp445dee005p10yhyt8yscxg/speakers";
  const SWIPER_CSS_URL = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.css";
  const SWIPER_JS_URL = "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.js";
  const AUTH_CREDENTIALS = {
    email: "eriveraec@gmail.com",
    password: "123456",
    name: "Mi Sitio Web",
  };
  const ECUADOR_TIMEZONE = "America/Guayaquil";

  const allSection = document.querySelector(".all-section");
  const portada = document.querySelector(".item-portada");
  const conteo = document.querySelector(".cintillo-conteo");
  const sponsorsContainer = document.querySelector(".eve-sponsors");
  const speakersContainer = document.querySelector(".eve-speakers");
  const formContainer = document.querySelector(".item-form");
  let speakersSwiperInstance = null;
  let swiperAssetsPromise = null;

  const aperturaColSelector = ".apertura-art-formulario #col-50-50";
  const loadingClassName = "is-loading";

  const selector = (key) => conteo.querySelector(`[data-count="${key}"]`);

  function ensureGlobalLoading() {
    if (!allSection) {
      return null;
    }

    let loading = allSection.querySelector(".eventos-loading");

    if (!loading) {
      loading = document.createElement("div");
      loading.className = "eventos-loading";
      loading.setAttribute("role", "status");
      loading.setAttribute("aria-live", "polite");
      loading.innerHTML = `
        <span class="eventos-loading__spinner" aria-hidden="true"></span>
        <span>Cargando...</span>
      `;
      allSection.prepend(loading);
    }

    return loading;
  }

  function setAllSectionState(isVisible, isLoading = false) {
    if (!allSection) {
      return;
    }

    allSection.hidden = !isVisible;
    allSection.classList.toggle(loadingClassName, isLoading);

    const loading = ensureGlobalLoading();

    if (loading) {
      loading.hidden = !isLoading;
    }
  }

  function setAperturaColState(isVisible) {
    document.querySelectorAll(aperturaColSelector).forEach((element) => {
      element.style.display = isVisible ? "block" : "none";
    });
  }

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

  async function getToken() {
    const response = await fetch(AUTH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(AUTH_CREDENTIALS),
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo token: ${response.status}`);
    }

    const data = await response.json();
    const token = data?.token || data?.accessToken || data?.data?.token || null;

    if (!token) {
      throw new Error("No se encontró token en la respuesta de autenticación");
    }

    return token;
  }

  async function getEvents(token) {
    const response = await fetch(EVENTS_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo eventos: ${response.status}`);
    }

    return response.json();
  }

  async function getSponsors(token, eventId) {
    const response = await fetch(`${EVENTS_API_URL}/${eventId}/sponsors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo sponsors: ${response.status}`);
    }

    return response.json();
  }

  async function getSpeakers(token) {
    const response = await fetch(SPEAKERS_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error obteniendo speakers: ${response.status}`);
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

  function buildEventFormUI() {
    if (!formContainer) {
      return;
    }

    formContainer.innerHTML = `
      <form id="060d0483463711f1bd4e020017097938" action="/user-portlet/FormReceiver?formid=060d0483463711f1bd4e020017097938" method="POST" class="seccion-eventos" data-navigation="" data-usecaptcha="false" data-oklbl="OK " data-cancellbl="Cancelar" data-errormsg="Algún campo es incorrecto" novalidate="">
        <div id="pages-060d0483463711f1bd4e020017097938">
          <div id="page-060d0483463711f1bd4e020017097938-1" class="field_form" name="XYZ_DEFAULT_TAB_NAME_ZYX">
            <div id="textheader-1" class="tab" style="display:none;">
              <span class="number">1</span>
              <div class="text"></div>
            </div>
            <div id="block-1" class="blocksfields">
              <div id="field_060d0483463711f1bd4e020017097938_060e1ced463711f1bd4e020017097938" class="field_form ">
                <div class="campo_obligatorio">&nbsp;<div class="text_obligatorio"></div></div>
                <div class="label_ant">Nombre completos</div>
                <div class="element_form">
                  <input id="060d0483463711f1bd4e020017097938_060e1ced463711f1bd4e020017097938" name="nombrecompleto" type="text" value="" id_modal="060d0483463711f1bd4e020017097938_060e1ced463711f1bd4e020017097938_mod" confirmado="true" title="" placeholder="" tabindex="060d0483463711f1bd4e02001709793811000" class="field_elem" required="">
                </div>
                <div class="label_pos"></div>
              </div>
              <div id="field_060d0483463711f1bd4e020017097938_060f23d7463711f1bd4e020017097938" class="field_form ">
                <div class="campo_obligatorio">&nbsp;<div class="text_obligatorio"></div></div>
                <div class="label_ant">Email Corporativo</div>
                <div class="element_form">
                  <input id="060d0483463711f1bd4e020017097938_060f23d7463711f1bd4e020017097938" name="emailcorp" type="email" value="" id_modal="060d0483463711f1bd4e020017097938_060f23d7463711f1bd4e020017097938_mod" confirmado="true" title="" placeholder="" tabindex="060d0483463711f1bd4e02001709793812000" class="field_elem" required="">
                </div>
                <div class="label_pos"></div>
              </div>
              <div id="field_060d0483463711f1bd4e020017097938_060fb1e7463711f1bd4e020017097938" class="field_form ">
                <div class="campo_obligatorio">&nbsp;<div class="text_obligatorio"></div></div>
                <div class="label_ant">Teléfono de Contacto</div>
                <div class="element_form">
                  <input id="060d0483463711f1bd4e020017097938_060fb1e7463711f1bd4e020017097938" name="telefono" type="text" value="" id_modal="060d0483463711f1bd4e020017097938_060fb1e7463711f1bd4e020017097938_mod" confirmado="true" title="" placeholder="" tabindex="060d0483463711f1bd4e02001709793813000" class="field_elem" required="">
                </div>
                <div class="label_pos"></div>
              </div>
              <div id="field_060d0483463711f1bd4e020017097938_06106030463711f1bd4e020017097938" class="field_form ">
                <div class="campo_obligatorio">&nbsp;<div class="text_obligatorio"></div></div>
                <div class="label_ant">Cargo / Puesto</div>
                <div class="element_form">
                  <input id="060d0483463711f1bd4e020017097938_06106030463711f1bd4e020017097938" name="cargo" type="text" value="" id_modal="060d0483463711f1bd4e020017097938_06106030463711f1bd4e020017097938_mod" confirmado="true" title="" placeholder="" tabindex="060d0483463711f1bd4e02001709793814000" class="field_elem" required="">
                </div>
                <div class="label_pos"></div>
              </div>
              <div id="field_060d0483463711f1bd4e020017097938_e3cc29f9463711f1bd4e020017097938" class="field_form ">
                <div class="campo_obligatorio">&nbsp;<div class="text_obligatorio"></div></div>
                <div class="label_ant">Empresa / Institución</div>
                <div class="element_form">
                  <input id="060d0483463711f1bd4e020017097938_e3cc29f9463711f1bd4e020017097938" name="Empresa" type="text" value="" id_modal="060d0483463711f1bd4e020017097938_e3cc29f9463711f1bd4e020017097938_mod" confirmado="true" title="" placeholder="" tabindex="060d0483463711f1bd4e02001709793815000" class="field_elem" required="">
                </div>
                <div class="label_pos"></div>
              </div>
              <div id="field_060d0483463711f1bd4e020017097938_1862216f463811f1bd4e020017097938" class="field_form ">
                <div class="campo_obligatorio">&nbsp;<div class="text_obligatorio"></div></div>
                <div class="label_ant">¿Asistirá Presencial o Virtual?</div>
                <div class="element_form">
                  <div class="radio_option">
                    <input type="radio" name="asistira" id="060d0483463711f1bd4e020017097938_1862216f463811f1bd4e020017097938-1" title="" tabindex="NaN" class="field_elem" required="" value="presencial">
                    <div class="radiobutton_label">Presencial</div>
                  </div>
                  <div class="radio_option">
                    <input type="radio" name="asistira" id="060d0483463711f1bd4e020017097938_1862216f463811f1bd4e020017097938-2" title="" tabindex="NaN" class="field_elem" required="" value="virtual">
                    <div class="radiobutton_label">Virtual</div>
                  </div>
                </div>
                <div class="label_pos"></div>
              </div>
            </div>
            <div class="btts_forms">
              <input type="submit" value="Registrarse">
            </div>
          </div>
        </div>
      </form>
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

    // meta.appendChild(badge);
    meta.appendChild(metaText);
    content.appendChild(meta);
    content.appendChild(title);
    content.appendChild(subtitle);

    portada.appendChild(bg);
    portada.appendChild(overlay);
    portada.appendChild(content);

    portada.hidden = false;
  }

  function renderSponsors(sponsors = []) {
    if (!sponsorsContainer) {
      return;
    }

    sponsorsContainer.innerHTML = "";

    const fragment = document.createDocumentFragment();

    sponsors.forEach((sponsor) => {
      if (!sponsor?.logo) {
        return;
      }

      const img = document.createElement("img");
      img.src = sponsor.logo;
      img.alt = sponsor.name || "Sponsor";
      img.loading = "lazy";
      img.decoding = "async";
      fragment.appendChild(img);
    });

    sponsorsContainer.appendChild(fragment);
  }

  function ensureSwiperAssets() {
    if (typeof window.Swiper !== "undefined") {
      return Promise.resolve();
    }

    if (swiperAssetsPromise) {
      return swiperAssetsPromise;
    }

    swiperAssetsPromise = new Promise((resolve, reject) => {
      const existingCss = document.querySelector(`link[href="${SWIPER_CSS_URL}"]`);

      if (!existingCss) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = SWIPER_CSS_URL;
        document.head.appendChild(link);
      }

      const existingScript = document.querySelector(`script[src="${SWIPER_JS_URL}"]`);

      const finish = () => {
        if (typeof window.Swiper === "undefined") {
          reject(new Error("No se pudo cargar Swiper"));
          return;
        }

        resolve();
      };

      if (existingScript) {
        if (typeof window.Swiper !== "undefined") {
          finish();
          return;
        }

        existingScript.addEventListener("load", finish, { once: true });
        existingScript.addEventListener("error", () => reject(new Error("No se pudo cargar Swiper")), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = SWIPER_JS_URL;
      script.onload = finish;
      script.onerror = () => reject(new Error("No se pudo cargar Swiper"));
      document.body.appendChild(script);
    });

    return swiperAssetsPromise;
  }

  function createSocialLink(href, label, text) {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "speaker-card__social-link";
    link.setAttribute("aria-label", label);
    link.textContent = text;
    return link;
  }

  function renderSpeakers(speakers = []) {
    if (!speakersContainer) {
      return;
    }

    speakersContainer.innerHTML = "";

    const swiper = document.createElement("div");
    swiper.className = "eve-speakers-swiper swiper";

    const wrapper = document.createElement("div");
    wrapper.className = "swiper-wrapper";

    speakers.forEach((speaker) => {
      if (!speaker) {
        return;
      }

      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const card = document.createElement("article");
      card.className = "speaker-card";

      const avatarWrap = document.createElement("div");
      avatarWrap.className = "speaker-card__avatar";

      const avatar = document.createElement("img");
      avatar.src = speaker.avatar || "";
      avatar.alt = speaker.name || "Speaker";
      avatar.loading = "lazy";
      avatar.decoding = "async";
      avatarWrap.appendChild(avatar);

      const body = document.createElement("div");
      body.className = "speaker-card__body";

      const name = document.createElement("h3");
      name.className = "speaker-card__name";
      name.textContent = speaker.name || "";

      const role = document.createElement("p");
      role.className = "speaker-card__role";
      role.textContent = speaker.role || "";

      const socials = document.createElement("div");
      socials.className = "speaker-card__socials";

      if (speaker.twitter) {
        socials.appendChild(
          createSocialLink(speaker.twitter, `${speaker.name || "Speaker"} en X`, "X")
        );
      }

      if (speaker.linkedin) {
        socials.appendChild(
          createSocialLink(
            speaker.linkedin,
            `${speaker.name || "Speaker"} en LinkedIn`,
            "in"
          )
        );
      }

      if (speaker.instagram) {
        socials.appendChild(
          createSocialLink(
            speaker.instagram,
            `${speaker.name || "Speaker"} en Instagram`,
            "ig"
          )
        );
      }

      body.appendChild(name);
      body.appendChild(role);
      body.appendChild(socials);

      card.appendChild(avatarWrap);
      card.appendChild(body);
      slide.appendChild(card);
      wrapper.appendChild(slide);
    });

    const pagination = document.createElement("div");
    pagination.className = "swiper-pagination eve-speakers-pagination";

    swiper.appendChild(wrapper);
    swiper.appendChild(pagination);
    speakersContainer.appendChild(swiper);
  }

  async function initSpeakersSwiper() {
    if (!speakersContainer) {
      return;
    }

    await ensureSwiperAssets();

    if (speakersSwiperInstance && typeof speakersSwiperInstance.destroy === "function") {
      speakersSwiperInstance.destroy(true, true);
    }

    speakersSwiperInstance = new window.Swiper(".eve-speakers-swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      observer: true,
      observeParents: true,
      observeSlideChildren: true,
      pagination: {
        el: ".eve-speakers-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1280: { slidesPerView: 4, spaceBetween: 24 },
      },
    });
  }

  async function init() {
    try {
      setAllSectionState(true, true);

      const token = await getToken();
      const data = await getEvents(token);
      const event = data?.events?.find((item) => item?.isActive === true);

      if (!event) {
        setAllSectionState(false, false);
        if (sponsorsContainer) {
          sponsorsContainer.innerHTML = "";
        }
        return;
      }

      const endMs = toEcuadorMs(event.endDate);
      const nowMs = getNowInEcuadorMs();

      if (nowMs > endMs) {
        setAllSectionState(false, false);
        if (sponsorsContainer) {
          sponsorsContainer.innerHTML = "";
        }
        return;
      }

      setAllSectionState(true, false);
      setAperturaColState(true);
      renderEvent(event);
      buildEventFormUI();
      buildCountdownUI();
      conteo.hidden = false;

      try {
        const sponsorsData = await getSponsors(token, event.id);
        renderSponsors(sponsorsData?.sponsors || []);
      } catch (sponsorError) {
        console.error(sponsorError);
        if (sponsorsContainer) {
          sponsorsContainer.innerHTML = "";
        }
      }

      try {
        const speakersData = await getSpeakers(token);
        renderSpeakers(speakersData?.speakers || []);
    
        await initSpeakersSwiper();
      } catch (speakerError) {
        console.error(speakerError);
        if (speakersContainer) {
          speakersContainer.innerHTML = "";
        }
      }

      const tick = () => {
        const ok = actualizarConteo(endMs);
        if (!ok) {
          setAllSectionState(false, false);
          if (sponsorsContainer) {
            sponsorsContainer.innerHTML = "";
          }
        }
      };

      tick();
      setInterval(tick, 1000);
    } catch (error) {
      console.error(error);
      setAllSectionState(false, false);
      if (sponsorsContainer) {
        sponsorsContainer.innerHTML = "";
      }
      if (speakersContainer) {
        speakersContainer.innerHTML = "";
      }
    }
  }

  init();
})();
