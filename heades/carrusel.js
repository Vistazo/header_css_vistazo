(function(){
  'use strict';
  const LOG = false; // true para debug
  const TARGET_CLASS = 'IMG_INF1_INF2_TIT_CARRUSEL';
  const ALT_CLASS = 'IMG_INF1_INF2_TIT'; // clase existente en tu HTML
  const AUTOPLAY_MS = 4000;
  const MIN_HOST_WIDTH = 500;
  const MAX_WAIT_MS = 3000;
  const RETRY_INTERVAL = 150;
  const LAZY_THRESHOLD = 0.35;

  function debug(...a){ if(LOG) console.log('[bmc-carousel]', ...a); }

  function lazyActivateMedia(root){
    if(!root) return;
    root.querySelectorAll('img').forEach(img => {
      if(img.dataset._lazyLoaded === "1") return;
      if(img.dataset.src){ img.src = img.dataset.src; img.removeAttribute("data-src"); }
      if(img.dataset.srcset){ img.srcset = img.dataset.srcset; img.removeAttribute("data-srcset"); }
      if(img.dataset.sizes){ img.sizes = img.dataset.sizes; img.removeAttribute("data-sizes"); }
      img.dataset._lazyLoaded = "1";
    });

    root.querySelectorAll('source').forEach(s => {
      if(s.dataset._lazyLoaded === "1") return;
      if(s.dataset.srcset){ s.srcset = s.dataset.srcset; s.removeAttribute("data-srcset"); }
      s.dataset._lazyLoaded = "1";
    });
  }

  function createLazyObserver(){
    return new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry => {
        if(entry.isIntersecting && entry.intersectionRatio >= LAZY_THRESHOLD){
          lazyActivateMedia(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold:[LAZY_THRESHOLD] });
  }

  function findItems(){
    return Array.from(document.querySelectorAll('.' + TARGET_CLASS + ', .' + ALT_CLASS));
  }

  function createCarousel(items){
    if(!items || items.length === 0) return;
    if(document.querySelector('.bmc-carousel-wrapper')) return;

    const first = items[0];
    let host = first.parentNode;

    while(host && host !== document.body){
      const cs = window.getComputedStyle(host);
      if(cs.display !== 'inline' && cs.display !== 'inline-block') break;
      host = host.parentNode;
    }
    if(!host) host = first.parentNode || document.body;

    const wrapper = document.createElement('div');
    wrapper.className = 'bmc-carousel-wrapper';

    const nav = document.createElement('div');
    nav.className = 'bmc-carousel-nav';

    const prevWrap = document.createElement('div');
    const nextWrap = document.createElement('div');
    prevWrap.className='bmc-prev-wrap';
    nextWrap.className='bmc-next-wrap';

    const btnPrev = document.createElement('button');
    const btnNext = document.createElement('button');
    btnPrev.innerHTML='‹';
    btnNext.innerHTML='›';
    prevWrap.appendChild(btnPrev);
    nextWrap.appendChild(btnNext);
    nav.appendChild(prevWrap);
    nav.appendChild(nextWrap);

    const track = document.createElement('div');
    track.className = 'bmc-carousel-track';
    wrapper.appendChild(nav);
    wrapper.appendChild(track);

    host.insertBefore(wrapper, first);

    const lazyObserver = createLazyObserver();

    items.forEach(item => {
      item.classList.add('bmc-carousel-item');
      track.appendChild(item);
      lazyObserver.observe(item);
    });

    const hostWidth = host.clientWidth || host.getBoundingClientRect().width;
    if(hostWidth < MIN_HOST_WIDTH){
      const rect = wrapper.getBoundingClientRect();
      document.body.appendChild(wrapper);
      wrapper.classList.add('bmc-carousel-fw');
      track.classList.add('bmc-fw');
      track.style.paddingLeft = rect.left + 'px';
      track.style.paddingRight = (window.innerWidth - rect.right) + 'px';
    }

    function scrollByStep(dir = 1){
      const firstItem = track.querySelector('.bmc-carousel-item');
      if(!firstItem) return;

      const gap = parseInt(getComputedStyle(track).gap || 18, 10);
      const width = firstItem.getBoundingClientRect().width + gap;
      track.scrollBy({ left: width * dir, behavior: 'smooth' });
    }

    btnPrev.onclick = () => scrollByStep(-1);
    btnNext.onclick = () => scrollByStep(1);

    let autoplay = setInterval(()=> scrollByStep(1), AUTOPLAY_MS);
    wrapper.addEventListener('mouseenter', ()=> clearInterval(autoplay));
    wrapper.addEventListener('mouseleave', ()=> autoplay = setInterval(()=> scrollByStep(1), AUTOPLAY_MS));

    return wrapper;
  }

  (function init(){
    const start = Date.now();
    function retry(){
      const nodes = findItems();
      if(nodes.length > 0){ createCarousel(nodes); return; }

      if(Date.now() - start > MAX_WAIT_MS){
        const obs = new MutationObserver((m,o)=>{
          const found = findItems();
          if(found.length > 0){
            o.disconnect();
            createCarousel(found);
          }
        });
        obs.observe(document.body, {childList:true, subtree:true});
        return;
      }

      setTimeout(retry, RETRY_INTERVAL);
    }
    retry();
  })();

})();

/** limpiar duplicados dentro del article */
(function(){
  const TARGET_CLASS = 'IMG_INF1_INF2_TIT_CARRUSEL';
  const ALT_CLASS = 'IMG_INF1_INF2_TIT';
  document.querySelectorAll('article').forEach(article => {
    if(article.querySelector('.' + TARGET_CLASS) || article.querySelector('.' + ALT_CLASS)){
      // eliminar style/script que contengan 'bmc-carousel' o similares
      article.querySelectorAll('style, script').forEach(node => {
        const text = node.innerText || '';
        if(text.includes('bmc-carousel') || text.includes('IMG_INF1_INF2_TIT') || text.includes('IMG_INF1_INF2_TIT_CARRUSEL')){
          node.remove();
        }
      });
    }
  });
})();

