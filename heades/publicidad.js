// Inyectar la publicidad en el head de la página solo si de donde se esta accediendo tiene localStorage

// Si el usuario tiene localStorage

if (localStorage.getItem('publicidad')) {
    try {
        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != 'dataLayer' ? '&l=' + l : '';
          j.async = true;
          j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-MJB87NX');
        //Captura variables para DFP desde la url
        var getQueryString = function (field, url) {
          var href = url ? url : window.location.href;
          var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
          var string = reg.exec(href);
          return string ? string[1] : null;
        };
        dfp_demo = getQueryString("demo");
        var VI_Seccion = '${secPub}';
        var VI_Tipo = 'Portada';
        var VI_Subseccion = '';
        var VI_Articulo = '';
        var VI_Tag = '';
        window.googletag = window.googletag || { cmd: [] };
        googletag.cmd.push(function () {
          //required variable for refresh
          var REFRESH_KEY = "refresh";
          var REFRESH_VALUE = "true";
    
          var mappingbill = googletag.sizeMapping()
            .addSize([992, 0], [[970, 250], [970, 180], [970, 90], [728, 250], [728, 180], [728, 90]]).addSize([768, 0], [[728, 250], [728, 180], [728, 90]]).addSize([320, 0], [[320, 100], [320, 50], [300, 100], [300, 50]]).addSize([0, 0], [[300, 100], [300, 250], [320, 100]]).build();
          var mappingbox = googletag.sizeMapping()
            .addSize([992, 0], [[300, 600], [300, 250]]).addSize([768, 0], [[300, 600], [300, 250]]).addSize([320, 0], [[300, 250], [320, 100], [320, 50], [300, 100], [300, 50]]).addSize([0, 0], [[300, 250], [300, 100], [300, 50]]).build();
          var mappingcenter = googletag.sizeMapping()
            .addSize([992, 0], [[728, 90], [728, 180], [728, 250]]).addSize([768, 0], [[728, 90], [728, 180], [728, 250]]).addSize([320, 0], [[320, 100], [300, 100], [300, 250]]).addSize([0, 0], [[320, 100], [300, 100], [300, 250]]).build();
          //adUnits
          googletag.defineSlot('/21839199781/Vistazo/Vistazo_Top1', [[300, 100], [300, 250], [320, 100], [728, 90], [970, 90], [970, 250]], 'Top1').defineSizeMapping(mappingbill).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
          googletag.defineSlot('/21839199781/Vistazo/Vistazo_Center1', [[320, 100], [300, 100], [300, 250], [728, 90]], 'Center1').defineSizeMapping(mappingcenter).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
          googletag.defineSlot('/21839199781/Vistazo/Vistazo_Center2', [[320, 100], [300, 100], [300, 250], [728, 90]], 'Center2').defineSizeMapping(mappingcenter).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
          googletag.defineSlot('/21839199781/Vistazo/Vistazo_Center3', [[320, 100], [300, 100], [300, 250], [728, 90]], 'Center3').defineSizeMapping(mappingcenter).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
          //Reemplaza al Box de la home -------
          googletag.defineSlot('/21839199781/Vistazo/Vistazo_Middle1', [[300, 600], [300, 250]], 'Middle1').defineSizeMapping(mappingbox).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
          //-----------------------------------
          googletag.defineSlot('/21839199781/Vistazo/Vistazo_Middle2', [300, 250], 'Middle2').defineSizeMapping(mappingbox).setTargeting(REFRESH_KEY, REFRESH_VALUE).addService(googletag.pubads());
          googletag.defineSlot('/21839199781/Vistazo/Floating', [1, 1], 'Floating').addService(googletag.pubads());
          googletag.defineSlot('/21839199781/Vistazo/Zocalo', [1, 3], 'Zocalo').addService(googletag.pubads());
          //Start refresh
          var SECONDS_TO_WAIT_AFTER_VIEWABILITY = 30; // 30 seconds
          googletag.pubads().addEventListener("impressionViewable", function (event) {
            var slot = event.slot;
            if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
              setTimeout(function () {
                googletag.pubads().refresh([slot]);
              }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
            }
          });
          //End refresh
          if (jQryIter.contextIsArticlePage()) {
            VI_Tipo = 'Artículo';
            VI_Subseccion = '${SectionName}';
            var urltemp = window.location.href;
            var n = urltemp.lastIndexOf("-");
            VI_Articulo = urltemp.substring(n + 3);
          }
          // metadatos
          $("meta[data-voc-name=topic]").each(function () {
            if (VI_Tag == '') {
              VI_Tag = $(this).attr('content');
            }
            else {
              VI_Tag = VI_Tag + "," + $(this).attr('content');
            }
          });
    
          parts = (window.location.href.split("/"));
          console.log("parts", parts[3]);
    
          if (parts[3] == 'hogar' && parts.length <= 4) {
            VI_Seccion = 'Home-hogar';
          }
          if (parts[3].includes('taller-cocina-colada-morada-guaguas-pan')) {
    
            VI_Seccion = 'formulariod4';
          }
    
          if (parts[4] && parts[4] != "") {
            VI_Seccion = 'Home-hogar';
            VI_Subseccion = parts[4] + '-hogar';
          }
    
          console.log('VI_Seccion:' + VI_Seccion);
          console.log('VI_Subec:' + VI_Subseccion);
          console.log('VI_Tipo:' + VI_Tipo);
          console.log('VI_Articulo:' + VI_Articulo);
          console.log('VI_Tag:' + VI_Tag);
          console.log('dfp_demo:' + dfp_demo);
          googletag.pubads().setTargeting('VI_Seccion', VI_Seccion);
          googletag.pubads().setTargeting('VI_Subseccion', VI_Subseccion);
          googletag.pubads().setTargeting('VI_Tipo', VI_Tipo);
          googletag.pubads().setTargeting('VI_Articulo', VI_Articulo);
          googletag.pubads().setTargeting('VI_Tag', VI_Tag);
          googletag.pubads().setTargeting('VI_Demo', dfp_demo);
          googletag.pubads().setTargeting('censurado', 'no');
          googletag.pubads().enableSingleRequest();
          googletag.pubads().collapseEmptyDivs();
          googletag.enableServices();
        });
        console.log('0P');
    
        var interstitialSlot, bottomAnchorSlot;
        googletag.cmd.push(function () {
          interstitialSlot = googletag.defineOutOfPageSlot(
            "/21839199781/Vistazo_Web-ITT",
            googletag.enums.OutOfPageFormat.INTERSTITIAL
          );
          interstitialSlot && interstitialSlot.addService(googletag.pubads());
          bottomAnchorSlot = googletag.defineOutOfPageSlot(
            "/21839199781/Vistazo_Bottom_Anchor",
            googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR
          );
          bottomAnchorSlot && bottomAnchorSlot.addService(googletag.pubads());
        });
    
        googletag.cmd.push(function () {
          interstitialSlot && googletag.display(interstitialSlot);
          bottomAnchorSlot && googletag.display(bottomAnchorSlot);
        });
    
    
        _atrk_opts = { atrk_acct: "fxUuj1aEsk00aa", domain: "vistazo.com", dynamic: true };
        (function () {
          var as = document.createElement('script'); as.type = 'text/javascript';
          as.async = true;
          as.src = "https://certify-js.alexametrics.com/atrk.js";
          var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(as, s);
        })();
    } catch (error) {
    }
}

if (localStorage.getItem('publicidad')) {
    try {
        // <scrip async src="https://mowplayer.com/js/player/mM9CsntrQm.js"></script> inyectar en el header para que funcione el video
        var script = document.createElement('script');
        script.src = 'https://mowplayer.com/js/player/mM9CsntrQm.js';
        script.async = true;
        document.head.appendChild(script);
        // taboola
        window._taboola = window._taboola || [];
        _taboola.push({ article: 'auto' });
        !function (e, f, u, i) {
          if (!document.getElementById(i)) {
            e.async = 1;
            e.src = u;
            e.id = i;
            f.parentNode.insertBefore(e, f);
          }
        }(document.createElement('script'),
          document.getElementsByTagName('script')[0],
          '//cdn.taboola.com/libtrc/adops-vistazo/loader.js',
          'tb_loader_script');
        if (window.performance && typeof window.performance.mark == 'function') { window.performance.mark('tbl_ic'); }
    
        var scripTag = document.createElement('script');
        // <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
        scripTag.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
        scripTag.async = true;
        document.head.appendChild(scripTag);
    } catch (error) {
        console.log("error InyectarEnHeader: ", error)
    }
}