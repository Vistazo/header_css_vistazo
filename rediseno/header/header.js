(function () {
    'use strict';

     /* ═══════════════════════════════════════════
         DATA SOURCE — PRIMARY NAV (rnav-links)
         Se consume desde API externa con estructura:
         [{ label: string, href: string, live?: boolean, children?: [...] }]
     ═══════════════════════════════════════════ */
     var RNAV_API_URL = 'https://backoffice.bmcodigo.com/api/v1/header-principal-2';

    /* ═══════════════════════════════════════════
       DATA SOURCE — SIDEBAR NAV (sidebar__nav)
       Se consume desde API externa con la misma estructura
       que el antiguo SIDEBAR_ITEMS.
    ═══════════════════════════════════════════ */
    var SIDEBAR_API_URL = 'https://backoffice.bmcodigo.com/api/v1/header-sidebar';

    /* ═══════════════════════════════════════════
       DATA SOURCE — SECONDARY NAV (secondary-nav)
       Se consume desde API externa con estructura:
       [{ label: string, href: string }]
    ═══════════════════════════════════════════ */
    var SECONDARY_API_URL = 'https://backoffice.bmcodigo.com/api/public/topics';

    /* ─── SVG: flecha sub-menú ─── */
    var ARROW_SVG =
        '<svg class="sidebar__arrow" viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">' +
        '<path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</svg>';

    function escapeHtml(value) {
        return String(value == null ? '' : value).replace(/[&<>"]|'/g, function (character) {
            switch (character) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#39;';
                default: return character;
            }
        });
    }

    function buildRnavLinkLabel(item) {
        return item.live
            ? '<span class="sidebar__live-badge">' + escapeHtml(item.label) + '</span>'
            : escapeHtml(item.label);
    }

    /* ═══════════════════════════════════════════
       RENDER — rnav-links (primary nav desktop)
       Enlaces planos y dropdown por hover/focus para items con children.
    ═══════════════════════════════════════════ */
    function buildRnavLinks(items) {
        var container = document.getElementById('rnavLinks');
        if (!container) return;

        var html = '';

        items.forEach(function (item) {
            var hasChildren = Array.isArray(item.children) && item.children.length > 0;

            if (hasChildren) {
                html += '<div class="rnav-item rnav-item--submenu">';
                html += '<a class="rnav-link" href="' + escapeHtml(item.href) + '">';
                html += buildRnavLinkLabel(item);
                html += '<span class="rnav-link__caret" aria-hidden="true"></span>';
                html += '</a>';
                html += '<div class="rnav-dropdown" role="menu">';

                item.children.forEach(function (child) {
                    html += '<a class="rnav-dropdown__link" href="' + escapeHtml(child.href) + '">';
                    html += escapeHtml(child.label);
                    html += '</a>';
                });

                html += '</div>';
                html += '</div>';
                return;
            }

            html += '<a class="rnav-link" href="' + escapeHtml(item.href) + '">';
            html += buildRnavLinkLabel(item);
            html += '</a>';
        });

        container.innerHTML = html;
    }

    function loadRnavFromApi() {
        var request = new XMLHttpRequest();

        request.open('GET', RNAV_API_URL, true);
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;

            if (request.status >= 200 && request.status < 300) {
                try {
                    var parsed = JSON.parse(request.responseText);
                    if (Array.isArray(parsed)) {
                        buildRnavLinks(parsed);
                        return;
                    }
                } catch (e) {
                    console.error('Error parseando menú principal:', e);
                }
            }

            console.error('No se pudo cargar el menú principal desde API.');
            buildRnavLinks([]);
        };

        request.send();
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

    function loadSecondaryNavFromApi() {
        var request = new XMLHttpRequest();

        //Token lleva esta en el header de autorización, pero la API no lo valida actualmente. Se deja por si en el futuro se requiere autenticación.
        let token = "465fb9d558c23515d37c7d3a63d59e2543e2ebaac7d7c81e4ae24c33b942f4ac"
        request.open('GET', SECONDARY_API_URL, true);
        request.setRequestHeader('Authorization', 'Bearer ' + token);
        request.onreadystatechange = function () {
            if (request.readyState !== 4) return;

            if (request.status >= 200 && request.status < 300) {
                try {
                    var parsed = JSON.parse(request.responseText);
                    // La API devuelve { data: [...] }
                    var items = Array.isArray(parsed) ? parsed : (parsed.data || []);
                    buildSecondaryNav(items);
                    return;
                } catch (e) {
                    console.error('Error parseando menú secundario:', e);
                }
            }

            console.error('No se pudo cargar el menú secundario desde API.');
            buildSecondaryNav([]);
        };

        request.send();
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

    /* ═══════════════════════════════════════════
       BANNER — Mundial 2026
       Se inserta después del iter-header-wrapper.
    ═══════════════════════════════════════════ */
    function buildBanner() {
        var header = document.getElementById('iter-header-wrapper');
        if (!header) return;

        var banner = document.createElement('a');
        banner.href = 'https://www.vistazo.com/deportes/mundial-2026';
        banner.className = 'r-banner-mundial';
        banner.setAttribute('aria-label', 'Todo lo que debes saber antes del Mundial 2026');

        banner.innerHTML =
            '<picture>' +
            '<source media="(max-width: 767px)" srcset="https://codigomarret.online/upload/img/delgadito_abajo_web_1.png">' +
            '<img src="https://codigomarret.online/upload/img/delgadito_1_web_1440_x_200_px_1.png" alt="Todo lo que debes saber antes del Mundial 2026">' +
            '</picture>';

        header.insertAdjacentElement('afterend', banner);
    }

    /* ── Init ── */
    loadRnavFromApi();
    loadSidebarNavFromApi();
    loadSecondaryNavFromApi();
    buildBanner();

    btnOpen.addEventListener('click', openSidebar);
    btnClose.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    document.getElementById('sidebarNav').addEventListener('click', function (e) {
        var btn = e.target.closest('.sidebar__has-sub .sidebar__toggle');
        if (btn) toggleSubmenu(btn);
    });

}());