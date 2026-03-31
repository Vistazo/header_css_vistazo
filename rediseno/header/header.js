(function () {
    'use strict';

    /* ═══════════════════════════════════════════
       ARRAY 1 — PRIMARY NAV (rnav-links)
       Solo enlaces planos, sin sub-menú.
       Propiedades:
         label   → texto visible
         href    → URL del enlace
         live    → (opcional) true activa el badge animado "En VIVO"
    ═══════════════════════════════════════════ */
    var RNAV_ITEMS = [
        // { label: 'En Vivo',          href: '#', live: false },
        { label: 'Últimas Noticias', href: '#' },
        { label: 'Actualidad', href: '/actualidad' },
        { label: 'Política', href: '/politica' },
        // { label: 'Seguridad',        href: '#' },
        // { label: 'Mundo', href: '/actualidad/internacional' },
        // { label: 'Investigación',    href: '#' },
        { label: 'Opinión', href: '/opinion' },
        { label: 'Estilo de vida', href: '/estilo-de-vida' },
        { label: 'Deportes', href: '/deportes' },
        // { label: 'Tendencias', href: '/estilo-de-vida/tendencias' },
        // { label: 'Entretenimiento',  href: '#' },
        { label: 'Enfoque', href: '/enfoque' },
        { label: 'Hogar', href: '/hogar' },
    ];

    /* ═══════════════════════════════════════════
       DATA SOURCE — SIDEBAR NAV (sidebar__nav)
       Se consume desde API externa con la misma estructura
       que el antiguo SIDEBAR_ITEMS.
    ═══════════════════════════════════════════ */
    var SIDEBAR_API_URL = 'https://backoffice.bmcodigo.com/api/v1/headervistazo';

    /* ═══════════════════════════════════════════
       ARRAY 3 — SECONDARY NAV (secondary-nav)
       Solo enlaces planos.
       Propiedades:
         label  → texto visible
         href   → URL del enlace
    ═══════════════════════════════════════════ */
    var SECONDARY_ITEMS = [
        { label: 'Eventos', href: '/eventos' },
        { label: 'Patrocinado', href: '/patrocinado' },
        { label: 'Podcast', href: '/podcast' },
        // { label: 'Videos', href: '#' },
        { label: '500 Mejores Empresas', href: '/portafolio/500-mayores-empresas' },
    ];

    /* ─── SVG: flecha sub-menú ─── */
    var ARROW_SVG =
        '<svg class="sidebar__arrow" viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">' +
        '<path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>';

    /* ═══════════════════════════════════════════
       RENDER — rnav-links (primary nav desktop)
       Solo enlaces planos; badge para item live.
    ═══════════════════════════════════════════ */
    function buildRnavLinks(items) {
        var container = document.getElementById('rnavLinks');
        if (!container) return;

        var html = '';

        items.forEach(function (item) {
            html += '<a href="' + item.href + '">';
            html += item.live
                ? '<span class="sidebar__live-badge">' + item.label + '</span>'
                : item.label;
            html += '</a>';
        });

        container.innerHTML = html;
    }

    /* ═══════════════════════════════════════════
       RENDER — secondary-nav
    ═══════════════════════════════════════════ */
    function buildSecondaryNav(items) {
        var nav = document.getElementById('secondaryNav');
        if (!nav) return;

        var html = '';
        items.forEach(function (item) {
            html += '<a href="' + item.href + '">' + item.label + '</a>';
        });
        nav.innerHTML = html;
    }

    /* ═══════════════════════════════════════════
       RENDER — sidebar__nav
       Soporta items con children → sub-menú desplegable.
    ═══════════════════════════════════════════ */
    function buildSidebarNav(items) {
        var ul = document.getElementById('sidebarNav');
        if (!ul) return;

        var html = '';

        items.forEach(function (item) {
            if (item.children && item.children.length) {
                /* ── Item con sub-menú ── */
                var slug = item.label.replace(/\s+/g, '').toLowerCase();
                var subId = 'sub-' + slug;
                var liId = 'menu-' + slug;

                html += '<li class="sidebar__has-sub" id="' + liId + '">';
                html += '<div class="sidebar__has-sub-row">';
                html += '<a href="' + item.href + '" class="sidebar__has-sub-label">' + item.label + '</a>';
                html += '<button class="sidebar__toggle" aria-expanded="false" aria-controls="' + subId + '" aria-label="Expandir ' + item.label + '">' + ARROW_SVG + '</button>';
                html += '</div>';
                html += '<ul class="sidebar__submenu" id="' + subId + '" role="list">';
                item.children.forEach(function (child) {
                    html += '<li><a href="' + child.href + '">' + child.label + '</a></li>';
                });
                html += '</ul>';
                html += '</li>';

            } else {
                /* ── Item simple ── */
                html += '<li><a href="' + item.href + '">';
                html += item.live
                    ? '<span class="sidebar__live-badge">' + item.label + '</span>'
                    : item.label;
                html += '</a></li>';
            }
        });

        ul.innerHTML = html;
    }

    function loadSidebarNavFromApi() {
        var request = new XMLHttpRequest();

        request.open('GET', SIDEBAR_API_URL, true);
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;

            if (request.status >= 200 && request.status < 300) {
                try {
                    var parsed = JSON.parse(request.responseText);
                    if (Array.isArray(parsed)) {
                        buildSidebarNav(parsed);
                        return;
                    }
                } catch (e) {
                    console.error('Error parseando menú sidebar:', e);
                }
            }

            console.error('No se pudo cargar el menú sidebar desde API.');
            buildSidebarNav([]);
        };

        request.send();
    }

    /* ═══════════════════════════════════════════
       SIDEBAR — open / close / focus trap
    ═══════════════════════════════════════════ */
    var root = document.documentElement;
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var btnOpen = document.getElementById('btnOpen');
    var btnClose = document.getElementById('btnClose');

    var prevFocus;

    function getFocusable() {
        return Array.from(
            sidebar.querySelectorAll(
                'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
            )
        );
    }

    function openSidebar() {
        root.classList.add('sidebar-open');
        btnOpen.setAttribute('aria-expanded', 'true');
        sidebar.removeAttribute('aria-hidden');
        prevFocus = document.activeElement;
        btnClose.focus();
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', trapFocus);
    }

    function closeSidebar() {
        root.classList.remove('sidebar-open');
        btnOpen.setAttribute('aria-expanded', 'false');
        sidebar.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', trapFocus);
        if (prevFocus) prevFocus.focus();
    }

    function trapFocus(e) {
        if (e.key === 'Escape') { closeSidebar(); return; }
        if (e.key !== 'Tab') return;
        var els = getFocusable();
        var first = els[0];
        var last = els[els.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    }

    function toggleSubmenu(btn) {
        var li = btn.closest('li');
        var isOpen = li.classList.contains('open');
        /* Cierra cualquier otro sub-menú abierto */
        document.querySelectorAll('.sidebar__has-sub.open').forEach(function (el) {
            el.classList.remove('open');
            el.querySelector('.sidebar__toggle').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            li.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    }

    /* ── Init ── */
    buildRnavLinks(RNAV_ITEMS);
    loadSidebarNavFromApi();
    buildSecondaryNav(SECONDARY_ITEMS);

    btnOpen.addEventListener('click', openSidebar);
    btnClose.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    document.getElementById('sidebarNav').addEventListener('click', function (e) {
        var btn = e.target.closest('.sidebar__has-sub .sidebar__toggle');
        if (btn) toggleSubmenu(btn);
    });

}());