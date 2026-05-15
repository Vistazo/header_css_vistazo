(function () {
  var API_URL = "https://backoffice.bmcodigo.com/api/letters";
  var AUTH_API_URL = "https://backoffice.bmcodigo.com/api/public/auth/token";
  var BASE_DOMAIN = "https://backoffice.bmcodigo.com";
  var AUTH_CREDENTIALS = {
    email: "eriveraec@gmail.com",
    password: "123456",
    name: "Mi Sitio Web"
  };
  var authToken = "";
  var swiperInstance = null;

  var mountNode = document.querySelector(".seccion-listado-cartas");

  if (!mountNode) {
    return;
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatPublishDate(dateValue) {
    var date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(date);
  }

  async function getAuthToken() {
    if (authToken) {
      return authToken;
    }

    var tokenResponse = await fetch(AUTH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(AUTH_CREDENTIALS)
    });

    var tokenResult = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenResult || !tokenResult.token) {
      var authErrorMessage = tokenResult && tokenResult.message ? tokenResult.message : "No se pudo obtener el token de autenticacion.";
      throw new Error(authErrorMessage);
    }

    authToken = "Bearer " + tokenResult.token;
    return authToken;
  }

  function renderLetters(letters) {
    var approvedLetters = (letters || []).filter(function (letter) {
      return letter && letter.status === "approved";
    });

    if (!approvedLetters.length) {
      mountNode.innerHTML = [
        '<div class="noticias-swiper swiper noticias">',
        '  <div class="swiper-wrapper"></div>',
        '</div>'
      ].join("\n");
      return;
    }

    mountNode.innerHTML = [
      '<div class="noticias-swiper swiper noticias">',
      '  <div class="swiper-wrapper">',
      approvedLetters.map(function (letter) {
        var title = escapeHtml(letter.title);
        var content = escapeHtml(letter.content);
        var authorName = escapeHtml(letter.authorName);
        var publishDate = escapeHtml(formatPublishDate(letter.publishDate));
        var slug = escapeHtml(letter.slug || letter.id || "");
        var articleId = escapeHtml(letter.id || "");

        return [
          '<article class="swiper-slide article element full-access norestricted" iteridart="' + articleId + '">',
          '  <div class="R_HOME_CARTAS odd n1">',
          '    <div class="media_block">',
          '      <div class="text_block">',
          '        <div class="headline">',
          '          <a href="/cartas/' + slug + '" title="">',
          '            <h2>' + title + '</h2>',
          '          </a>',
          '        </div>',
          '        <div class="text_block2">',
          '          <div class="text">',
          '            <div class="text-wrapper">',
          '              <p>' + content + '</p>',
          '            </div>',
          '          </div>',
          '        </div>',
          '        <div class="sect-date">',
          '          <div class="inf2">',
          '            <ul>',
          '              <li class="date" itemprop="datePublished"> ' + publishDate + ' </li>',
          '              <li class="author">' + authorName + '</li>',
          '            </ul>',
          '          </div>',
          '        </div>',
          '      </div>',
          '    </div>',
          '  </div>',
          '</article>'
        ].join("\n");
      }).join("\n"),
      '  </div>',
      '  <div class="swiper-button-prev"></div>',
      '  <div class="swiper-button-next"></div>',
      '  <div class="swiper-pagination"></div>',
      '</div>'
    ].join("\n");

    setTimeout(initSwiper, 500);
  }

  async function loadLetters() {
    mountNode.innerHTML = [
      '<div class="noticias-swiper swiper noticias">',
      '  <div class="swiper-wrapper"></div>',
      '</div>'
    ].join("\n");

    try {
      var token = await getAuthToken();
      var response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Authorization": token
        }
      });

      var result = await response.json();

      if (!response.ok) {
        throw new Error(result && result.message ? result.message : "No se pudieron cargar las cartas.");
      }

      renderLetters(result.letters || []);
    } catch (error) {
      mountNode.innerHTML = '<section class="noticias"></section>';
      console.error("Error al cargar las cartas:", error);
    }
  }

  function initSwiper() {
    if (typeof Swiper === "undefined") {
      return;
    }

    if (swiperInstance && typeof swiperInstance.destroy === "function") {
      swiperInstance.destroy(true, true);
    }

    swiperInstance = new Swiper(".noticias-swiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: ".noticias-swiper .swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".noticias-swiper .swiper-button-next",
        prevEl: ".noticias-swiper .swiper-button-prev"
      },
      breakpoints: {
        640: {
          slidesPerView: 1
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        }
      }
    });
  }

  setTimeout(loadLetters, 500);
})();