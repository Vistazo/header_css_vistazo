(function () {
    'use strict';

    const root = document.documentElement;
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const btnOpen = document.getElementById('btnOpen');
    const btnClose = document.getElementById('btnClose');

    let focusableEls;
    let prevFocus;

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
        focusableEls = getFocusable();
        const first = focusableEls[0];
        const last = focusableEls[focusableEls.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    }

    function toggleSubmenu(btn) {
        const li = btn.closest('li');
        const isOpen = li.classList.contains('open');
        document.querySelectorAll('.sidebar__has-sub.open').forEach(function (el) {
            el.classList.remove('open');
            el.querySelector('button').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            li.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    }

    btnOpen.addEventListener('click', openSidebar);
    btnClose.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    sidebar.querySelector('.sidebar__nav').addEventListener('click', function (e) {
        const btn = e.target.closest('.sidebar__has-sub > button');
        if (btn) toggleSubmenu(btn);
    });

}());