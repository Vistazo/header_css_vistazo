(function(){
  'use strict';
  const LOG = false; // true para debug
  const TARGET_CLASS = 'IMG_INF1_INF2_TIT_CARRUSEL';
  const AUTOPLAY_MS = 4000;
  const MIN_HOST_WIDTH = 500;
  const MAX_WAIT_MS = 3000;
  const RETRY_INTERVAL = 150;

  function debug(...a){ if(LOG) console.log('[bmc-carousel]', ...a); }

  function findItems(){
    // >>> SOLO nos fijamos en la clase CARRUSEL (NO fallback)
    return Array.from(document.querySelectorAll('.' + TARGET_CLASS));
  }

  function createCarousel(items){
    if(!items || items.length === 0) return null;
    if(document.querySelector('.bmc-carousel-wrapper')) {
      debug('Ya existe carrusel');
      return document.querySelector('.bmc-carousel-wrapper');
    }

    const first = items[0];
    let host = first.parentNode;
    while(host && host !== document.body){
      const cs = window.getComputedStyle(host);
      if(cs && cs.display && cs.display !== 'inline' && cs.display !== 'inline-block') break;
      host = host.parentNode;
    }
    if(!host) host = first.parentNode || document.body;

    const wrapper = document.createElement('div'); wrapper.className = 'bmc-carousel-wrapper';
    const nav = document.createElement('div'); nav.className = 'bmc-carousel-nav';
    const prevWrap = document.createElement('div'); const nextWrap = document.createElement('div');
    prevWrap.className='bmc-prev-wrap'; nextWrap.className='bmc-next-wrap';
    const btnPrev = document.createElement('button'); btnPrev.type='button'; btnPrev.setAttribute('aria-label','Anterior'); btnPrev.innerHTML='‹';
    const btnNext = document.createElement('button'); btnNext.type='button'; btnNext.setAttribute('aria-label','Siguiente'); btnNext.innerHTML='›';
    prevWrap.appendChild(btnPrev); nextWrap.appendChild(btnNext); nav.appendChild(prevWrap); nav.appendChild(nextWrap);

    const track = document.createElement('div'); track.className = 'bmc-carousel-track'; track.setAttribute('role','list');

    host.insertBefore(wrapper, first);
    wrapper.appendChild(nav);
    wrapper.appendChild(track);

    items.forEach(n => {
      n.classList.add('bmc-carousel-item');
      track.appendChild(n);
    });

    const hostWidth = host.clientWidth || host.getBoundingClientRect().width;
    if(hostWidth < MIN_HOST_WIDTH){
      const rect = wrapper.getBoundingClientRect();
      document.body.appendChild(wrapper);
      wrapper.classList.add('bmc-carousel-fw'); track.classList.add('bmc-fw');
      const leftOffset = Math.round(rect.left);
      const rightOffset = Math.round(window.innerWidth - rect.right);
      track.style.paddingLeft = leftOffset + 'px';
      track.style.paddingRight = rightOffset + 'px';
    }

    function scrollByStep(direction = 1){
      const firstItem = track.querySelector('.bmc-carousel-item');
      if(!firstItem) return;
      const gap = parseInt(getComputedStyle(track).gap || 18, 10) || 18;
      const step = Math.round(firstItem.getBoundingClientRect().width + gap);
      track.scrollBy({ left: step * direction, behavior: 'smooth' });
    }
    btnPrev.addEventListener('click', () => scrollByStep(-1));
    btnNext.addEventListener('click', () => scrollByStep(1));

    window.addEventListener('keydown', (e)=>{
      const active = document.activeElement && document.activeElement.tagName;
      if(active === 'INPUT' || active === 'TEXTAREA') return;
      if(e.key === 'ArrowLeft') scrollByStep(-1);
      if(e.key === 'ArrowRight') scrollByStep(1);
    });

    let isDown=false, startX=0, scrollLeft=0;
    track.addEventListener('mousedown', (e)=>{ isDown=true; track.classList.add('bmc-dragging'); startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; pauseAutoplay(); e.preventDefault(); });
    track.addEventListener('mouseleave', ()=>{ isDown=false; track.classList.remove('bmc-dragging'); resumeAutoplay(); });
    track.addEventListener('mouseup', ()=>{ isDown=false; track.classList.remove('bmc-dragging'); resumeAutoplay(); });
    track.addEventListener('mousemove', (e)=>{ if(!isDown) return; const x = e.pageX - track.offsetLeft; const walk = (x - startX) * 1.2; track.scrollLeft = scrollLeft - walk; });

    let startTouchX=0, startTouchScroll=0;
    track.addEventListener('touchstart', (e)=>{ if(!e.touches || !e.touches[0]) return; startTouchX=e.touches[0].pageX; startTouchScroll=track.scrollLeft; pauseAutoplay(); }, {passive:true});
    track.addEventListener('touchmove', (e)=>{ if(!e.touches || !e.touches[0]) return; const x=e.touches[0].pageX; const delta=(x-startTouchX)*1.0; track.scrollLeft = startTouchScroll - delta; }, {passive:true});
    track.addEventListener('touchend', ()=>resumeAutoplay());

    function toggleNavVisibility(){
      const atStart = track.scrollLeft <= 5;
      const atEnd = Math.abs(track.scrollWidth - track.clientWidth - track.scrollLeft) <= 5;
      prevWrap.style.display = atStart ? 'none' : 'block';
      nextWrap.style.display = atEnd ? 'none' : 'block';
      if(track.scrollWidth <= track.clientWidth + 2) nav.style.display = 'none';
      else nav.style.display = 'flex';
    }
    track.addEventListener('scroll', toggleNavVisibility);
    setTimeout(toggleNavVisibility, 160);
    window.addEventListener('resize', ()=>{ setTimeout(toggleNavVisibility, 200); });

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

    debug('Carrusel creado con', track.children.length, 'items');
    return wrapper;
  }

  // attempt build + MutationObserver fallback
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