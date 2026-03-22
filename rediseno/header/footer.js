/* =============================================
     DATA ARRAYS
  ============================================= */

  const contactData = [
    {
      label: 'Teléfono',
      lines: [
        { text: '(+593) 985860991', href: 'tel:+593985860991' },
        { text: '(042) 2327200',    href: 'tel:0422327200'    },
      ]
    },
    {
      label: 'Email',
      lines: [
        { text: 'webmaster@vistazo.com', href: 'mailto:webmaster@vistazo.com' }
      ]
    },
    {
      label: 'Dirección',
      lines: [
        { text: 'Aguirre 734 y Boyacá', href: null }
      ]
    }
  ];

  const socialData = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/revistavistazo',
      svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/revistavistazo.ec/',
      svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`
    },
    {
      name: 'X / Twitter',
      href: 'https://x.com/revistavistazo',
      svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
    },
    // {
    //   name: 'WhatsApp',
    //   href: 'https://wa.me/593985860991',
    //   svg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`
    // }
  ];

  /* Secciones del footer (sin colapso — solo link directo) */
  const navSections = [
    // { label: 'En vivo',        href: '/en-vivo'        },
    { label: 'Últimas Noticias',href:'/ultimas-noticias'},
    { label: 'Actualidad',     href: '/actualidad'     },
    { label: 'Política',       href: '/politica'       },
    { label: 'Opinión',        href: '/opinion'        },
    { label: 'Deportes',       href: '/deportes'       },
    { label: 'Eventos',        href: '/eventos'        },
    // { label: 'Newsletter',     href: '/newsletter'     },
    { label: 'Podcast',        href: '/podcast'        },
    { label: 'Réplicas',       href: '/replica/pedido-de-replica-de-xavier-jordan-mendoza-AJ7812637'       },
    { label: 'Código etico', href: 'https://codigomarret.online/upload/img/codigo-de-etica-vistazo.pdf' },
    // { label: 'Ver todo',       href: '/secciones',  highlight: true },
  ];

  /* Datos de la revista actual */
  const currentEdition = {
    badge:    'Edición No.1400, Nov 7 / 2025',
    title:    'De la Protesta al Terror',
    subtitle: 'El país no aguanta más violencia, exige diálogo y paz',
    priceYear:    '$65 /año',
    priceBianual: '$120 /bianual',
  };

  const otherMagazines = [
    { label: 'Hogar',    href: '#hogar'   },
    { label: 'América',  href: '#america' },
    { label: 'Estadio',  href: '#estadio' },
  ];

  const revistasDataUrl = 'https://vzheaders.netlify.app/rediseno/revistas.js';
  let magazineImagesCache = null;

  const copyrightText = 'Prohibida la reproducción total, parcial y traducción a cualquier idioma, sin autorización escrita de su titular, de todos los contenidos de Vistazo.com.';

  function getSlidesImagesFromData(data) {
    if (!Array.isArray(data)) return [];
    return data
      .filter(item => item && item.img)
      .map(item => ({
        img: item.img,
        link: item.link || '#'
      }));
  }

  function loadMagazineImages(callback) {
    if (magazineImagesCache) {
      callback(magazineImagesCache);
      return;
    }

    if (typeof window.cargarRevistas === 'function') {
      window.cargarRevistas(data => {
        const images = getSlidesImagesFromData(data);
        magazineImagesCache = images;
        callback(images);
      });
      return;
    }

    fetch(revistasDataUrl)
      .then(r => r.text())
      .then(jsText => {
        const fn = new Function(`
          ${jsText.replace('const slidesData', 'var slidesData')}
          return slidesData;
        `);
        const slidesData = fn();
        const images = getSlidesImagesFromData(slidesData);
        magazineImagesCache = images;
        callback(images);
      })
      .catch(() => callback([]));
  }

  /* =============================================
     RENDER FUNCTIONS
  ============================================= */

  function renderContact() {
    const list = document.getElementById('contact-list');
    const html = contactData.map(item => {
      const linesHtml = item.lines.map(l =>
        l.href
          ? `<a href="${l.href}">${l.text}</a>`
          : l.text
      ).join('<br>');
      return `<li>
        <span class="contact-item__label">${item.label}</span>
        <span class="contact-item__value">${linesHtml}</span>
      </li>`;
    }).join('');
    list.innerHTML = html;
  }

  function renderSocial() {
    const row = document.getElementById('social-row');
    const html = socialData.map(s =>
      `<a href="${s.href}" class="social-link" aria-label="${s.name}" target="_blank" rel="noopener noreferrer" role="listitem">
        ${s.svg}
      </a>`
    ).join('');
    row.innerHTML = html;
  }

  function renderNav() {
    const mid = Math.ceil(navSections.length / 2);
    const leftItems  = navSections.slice(0, mid);
    const rightItems = navSections.slice(mid);

    function buildItems(items) {
      return items.map(s => {
        const cls = s.highlight ? ' class="nav-list__item--highlight"' : '';
        return `<li class="nav-list__item"${cls}>
          <a href="${s.href}">
            <span>${s.label}</span>
            <span class="arrow" aria-hidden="true">›</span>
          </a>
        </li>`;
      }).join('');
    }

    document.getElementById('nav-col-left').innerHTML  = buildItems(leftItems);
    document.getElementById('nav-col-right').innerHTML = buildItems(rightItems);
  }

  function renderMagazine() {

    const cover = document.querySelector('#other-magazines');
    if (cover) {
      loadMagazineImages(images => {
        if (!images.length) return;
        cover.innerHTML = images.map((item, index) =>
          `<a href="${item.link}" target="_blank" rel="noopener noreferrer" aria-label="Ir a revista ${index + 1}">` +
            `<img class="magazine-card__cover" src="${item.img}" alt="Portada de revista ${index + 1}">` +
          `</a>`
        ).join('');
      });
    }

    document.getElementById('copyright-text').textContent = copyrightText;
  }

  /* =============================================
     INIT — requestIdleCallback para no bloquear
  ============================================= */
  function initFooter() {
    renderContact();
    renderSocial();
    renderNav();
    renderMagazine();
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(initFooter, { timeout: 300 });
  } else {
    // Fallback para Safari
    setTimeout(initFooter, 0);
  }