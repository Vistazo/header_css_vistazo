(function(){
  'use strict';

  // === CONFIG ===
  const LOG = false; // true para debugging en consola
  const TARGET_CLASS = 'IMG_INF1_INF2_TIT_CARRUSEL'; // solo esta clase
  const AUTOPLAY_MS = 4000;
  const MIN_HOST_WIDTH = 500;
  const MAX_WAIT_MS = 3000;
  const RETRY_INTERVAL = 150;
  const LAZY_THRESHOLD = 0.35; // porcentaje de visibilidad para disparar carga (0..1)

  function debug(...args){ if(LOG) console.log('[bmc-carousel]', ...args); }

  // Encuentra solo items carrusel (NO fallback)
  function findItems(){
    return Array.from(document.querySelectorAll('.' + TARGET_CLASS));
  }

  // lazy helper: activa src/srcset desde data-*
  function activateLazyMedia(root){
    if(!root) return;
    // images
    root.querySelectorAll('img').forEach(img => {
      // si ya cargada, saltar
      if(img.dataset._lazyLoaded === '1') return;
      const ds = img.getAttribute('data-src');
      const dss = img.getAttribute('data-srcset');
      const dsSizes = img.getAttribute('data-sizes');
      if(dss){
        img.setAttribute('srcset', dss);
        img.removeAttribute('data-srcset');
      }
      if(ds){
        img.setAttribute('src', ds);
        img.removeAttribute('data-src');
      }
      if(dsSizes){
        img.setAttribute('sizes', dsSizes);
        img.removeAttribute('data-sizes');
      }
      // optional: set loading if missing
      if(!img.hasAttribute('loading')) img.setAttribute('loading','lazy');
      img.dataset._lazyLoaded = '1';
    });
    // <source> inside <picture>
    root.querySelectorAll('source').forEach(src => {
      if(src.dataset._lazyLoaded === '1') return;
      const dss = src.getAttribute('data-srcset');
      if(dss){
        src.setAttribute('srcset', dss);
        src.removeAttribute('data-srcset');
      }
      src.dataset._lazyLoaded = '1';
    });
  }

  // Observador que carga medios cuando el item entra al viewport
  function createLazyObserver() {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.isIntersecting && entry.intersectionRatio >= LAZY_THRESHOLD){
          activateLazyMedia(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: [LAZY_THRESHOLD] });
    return obs;
  }

  // Crea y monta el carrusel (igual que antes) y devuelve wrapper
  function createCarousel(items){
    if(!items || items.length === 0) return null;
    // evita recrear otro carrusel
    if(document.querySelector('.bmc-carousel-wrapper')) {
      debug('Ya existe carrusel');
      return document.querySelector('.bmc-carousel-wrapper');
    }

    const first = items[0];
    // encontrar host razonable
    let host = first.parentNode;
    while(host && host !== document.body){
      const cs = window.getComputedStyle(host);
      if(cs && cs.display && cs.display !== 'inline' && cs.display !== 'inline-block') break;
      host = host.parentNode;
    }
    if(!host) host = first.parentNode || document.body;

    // wrapper / nav / track
    const wrapper = document.createElement('div'); wrapper.className = 'bmc-carousel-wrapper';
    const nav = document.createElement('div'); nav.className = 'bmc-carousel-nav';
    const prevWrap = document.createElement('div'); const nextWrap = document.createElement('div');
    prevWrap.className='bmc-prev-wrap'; nextWrap.className='bmc-next-wrap';
    const btnPrev = document.createElement('button'); btnPrev.type='button'; btnPrev.setAttribute('aria-label','Anterior'); btnPrev.innerHTML='‹';
    const btnNext = document.createElement('button'); btnNext.type='button'; btnNext.setAttribute('aria-label','Siguiente'); btnNext.innerHTML='›';
    prevWrap.appendChild(btnPrev); nextWrap.appendChild(btnNext); nav.appendChild(prevWrap); nav.appendChild(nextWrap);

    const track = document.createElement('div'); track.className = 'bmc-carousel-track'; track.setAttribute('role','list');

    // insertar wrapper antes del primer item
    host.insertBefore(wrapper, first);
    wrapper.appendChild(nav);
    wrapper.appendChild(track);

    // mover items y marcar para lazy
    items.forEach(n => {
      n.classList.add('bmc-carousel-item');
      // si dentro del item hay imagenes con data-src/data-srcset se respetan
      track.appendChild(n);
    });

    // si host es estrecho, mover al body y ajustar padding para full-width
    const hostWidth = host.clientWidth || host.getBoundingClientRect().width;
    if(hostWidth < MIN_HOST_WIDTH){
      debug('Host estrecho, moviendo wrapper a body');
      const rect = wrapper.getBoundingClientRect();
      document.body.appendChild(wrapper);
      wrapper.classList.add('bmc-carousel-fw'); track.classList.add('bmc-fw');
      const leftOffset = Math.round(rect.left);
      const rightOffset = Math.round(window.innerWidth - rect.right);
      track.style.paddingLeft = leftOffset + 'px';
      track.style.paddingRight = rightOffset + 'px';
    }

    // navegación por paso
    function scrollByStep(direction = 1){
      const firstItem = track.querySelector('.bmc-carousel-item');
      if(!firstItem) return;
      const gap = parseInt(getComputedStyle(track).gap || 18, 10) || 18;
      const step = Math.round(firstItem.getBoundingClientRect().width + gap);
      track.scrollBy({ left: step * direction, behavior: 'smooth' });
    }
    btnPrev.addEventListener('click', () => scrollByStep(-1));
    btnNext.addEventListener('click', () => scrollByStep(1));

    // keyboard
    window.addEventListener('keydown', (e)=>{
      const active = document.activeElement && document.activeElement.tagName;
      if(active === 'INPUT' || active === 'TEXTAREA') return;
      if(e.key === 'ArrowLeft') scrollByStep(-1);
      if(e.key === 'ArrowRight') scrollByStep(1);
    });

    // drag / touch
    let isDown=false, startX=0, scrollLeft=0;
    track.addEventListener('mousedown', (e)=>{ isDown=true; track.classList.add('bmc-dragging'); startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; pauseAutoplay(); e.preventDefault(); });
    track.addEventListener('mouseleave', ()=>{ isDown=false; track.classList.remove('bmc-dragging'); resumeAutoplay(); });
    track.addEventListener('mouseup', ()=>{ isDown=false; track.classList.remove('bmc-dragging'); resumeAutoplay(); });
    track.addEventListener('mousemove', (e)=>{ if(!isDown) return; const x = e.pageX - track.offsetLeft; const walk = (x - startX) * 1.2; track.scrollLeft = scrollLeft - walk; });

    let startTouchX=0, startTouchScroll=0;
    track.addEventListener('touchstart', (e)=>{ if(!e.touches || !e.touches[0]) return; startTouchX=e.touches[0].pageX; startTouchScroll=track.scrollLeft; pauseAutoplay(); }, {passive:true});
    track.addEventListener('touchmove', (e)=>{ if(!e.touches || !e.touches[0]) return; const x=e.touches[0].pageX; const delta=(x-startTouchX)*1.0; track.scrollLeft = startTouchScroll - delta; }, {passive:true});
    track.addEventListener('touchend', ()=>resumeAutoplay());

    // nav visibility
    const prevWrapEl = prevWrap, nextWrapEl = nextWrap;
    function toggleNavVisibility(){
      const atStart = track.scrollLeft <= 5;
      const atEnd = Math.abs(track.scrollWidth - track.clientWidth - track.scrollLeft) <= 5;
      prevWrapEl.style.display = atStart ? 'none' : 'block';
      nextWrapEl.style.display = atEnd ? 'none' : 'block';
      if(track.scrollWidth <= track.clientWidth + 2) nav.style.display = 'none';
      else nav.style.display = 'flex';
    }
    track.addEventListener('scroll', toggleNavVisibility);
    setTimeout(toggleNavVisibility, 160);
    window.addEventListener('resize', ()=>{ setTimeout(toggleNavVisibility, 200); });

    // AUTOPLAY
    let autoplayTimer = null;
    function startAutoplay(){ if(track.children.length <= 1) return; stopAutoplay(); autoplayTimer = setInterval(()=>{ const atEnd = Math.abs(track.scrollWidth - track.clientWidth - track.scrollLeft) <= 5; if(atEnd) track.scrollTo({left:0, behavior:'smooth'}); else scrollByStep(1); }, AUTOPLAY_MS); }
    function stopAutoplay(){ if(autoplayTimer){ clearInterval(autoplayTimer); autoplayTimer = null; } }
    function pauseAutoplay(){ stopAutoplay(); }
    function resumeAutoplay(){ startAutoplay(); }
    wrapper.addEventListener('mouseenter', pauseAutoplay);
    wrapper.addEventListener('mouseleave', resumeAutoplay);
    wrapper.addEventListener('focusin', pauseAutoplay);
    wrapper.addEventListener('focusout', resumeAutoplay);
    startAutoplay();

    // === Lazy Observer: observa cada .bmc-carousel-item para activar sus medias ===
    const lazyObserver = createLazyObserver();
    Array.from(track.children).forEach(item => {
      // si el item ya contiene imágenes sin data-*, activarlas ya (o si ya cargadas skip)
      // Pero preferimos observar para ahorro de ancho de banda
      lazyObserver.observe(item);
    });

    debug('Carrusel creado con', track.children.length, 'items');
    return wrapper;
  }

  // Observador de items que llama activateLazyMedia cuando el item es visible (createLazyObserver definida arriba)
  function createLazyObserver(){
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting && entry.intersectionRatio >= LAZY_THRESHOLD){
          activateLazyMedia(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: [LAZY_THRESHOLD] });
    return observer;
  }

  // Attempt build + MutationObserver fallback (solo para items CARRUSEL)
  (function attemptBuild(){
    const start = Date.now();
    function retry(){
      const nodes = findItems();
      if(nodes.length > 0){
        createCarousel(nodes);
        debug('items encontrados:', nodes.length);
        return;
      }
      if(Date.now() - start > MAX_WAIT_MS){
        debug('espera excedida, instalando MutationObserver (solo para items CARRUSEL)');
        const obs = new MutationObserver((mutations, observer) => {
          const found = findItems();
          if(found.length > 0){
            observer.disconnect();
            createCarousel(found);
            debug('nodes encontrados por MutationObserver:', found.length);
          }
        });
        obs.observe(document.body, { childList:true, subtree:true });
        return;
      }
      setTimeout(retry, RETRY_INTERVAL);
    }
    retry();
  })();

})();


(function(){
  const TARGET_CLASS = 'IMG_INF1_INF2_TIT_CARRUSEL';
  document.querySelectorAll('article').forEach(article => {
    if(article.querySelector('.' + TARGET_CLASS)){
      // eliminar style/script que contengan 'bmc-carousel' o similares
      article.querySelectorAll('style, script').forEach(node => {
        const text = node.innerText || '';
        if(text.includes('bmc-carousel') || text.includes('IMG_INF1_INF2_TIT_CARRUSEL')){
          node.remove();
        }
      });
    }
  });
})();