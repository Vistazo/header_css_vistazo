/* ─── Notificaciones Push — Vistazo ─── */
(function () {

    var pushHtml = '<div id="pushNotice" class="vtz-push-banner" style="display:none;">' +
        '<img class="vtz-push-banner__logo" src="https://codigomarret.online/upload/img/logovistazo.png" alt="Vistazo">' +
        '<strong class="vtz-push-banner__title">¡Activa las notificaciones!</strong>' +
        '<p class="vtz-push-banner__text">Recibe al instante las noticias más importantes, coberturas de última hora y los contenidos más relevantes de Vistazo.</p>' +
        '<p class="vtz-push-banner__hint" id="vtzPushHint" style="display:none;"></p>' +
        '<div class="vtz-push-banner__btns">' +
        '<button class="vtz-push-banner__btn" id="vtzPushDeclineBanner">Ahora no</button>' +
        '<button class="vtz-push-banner__btn vtz-push-banner__btn--accept" id="vtzPushAccept">Activar</button>' +
        '</div></div>' +
        '<div id="vtzPushOverlay" style="display:none;">' +
        '<div class="vtzpush-modal">' +
        '<img class="vtzpush-logo" src="https://codigomarret.online/upload/img/logovistazo.png" alt="Vistazo">' +
        '<strong class="vtzpush-title">¡Activa las notificaciones!</strong>' +
        '<p class="vtzpush-desc">Recibe al instante las noticias más importantes, coberturas de última hora y los contenidos más relevantes de Vistazo.</p>' +
        '<div class="vtzpush-btns">' +
        '<button onclick="declinePushConsent()">Volver al inicio</button>' +
        '<button class="accept" onclick="acceptPushConsent()">Activar notificaciones</button>' +
        '</div></div></div>';

    /* ─── Claves ─── */
    var VTZ_PUSH_TS      = "vtz_push_ts";
    var VTZ_PUSH_GRANTED = "vtz_push_granted";
    var THIRTY_DAYS_MS   = 30 * 24 * 60 * 60 * 1000;
    var _pushScrollTriggered = false;

    /* ─── Helpers ─── */
    function isPushSupported() {
        return 'Notification' in window;
    }
    function isPushGranted() {
        return (isPushSupported() && Notification.permission === 'granted') ||
               !!localStorage.getItem(VTZ_PUSH_GRANTED);
    }
    function isPushDismissed() {
        var ts = localStorage.getItem(VTZ_PUSH_TS);
        return !!(ts && (Date.now() - parseInt(ts, 10)) < THIRTY_DAYS_MS);
    }

    /* ─── Mostrar banner ─── */
    function checkPush() {
        if (!isPushSupported() || isPushGranted() || isPushDismissed()) return;
        var el = document.getElementById("pushNotice");
        if (el) el.style.display = "block";
    }

    /* ─── Init: inyectar HTML y arrancar ─── */
    function init() {
        var container = document.createElement("div");
        container.innerHTML = pushHtml;
        document.body.appendChild(container);

        checkPush();

        /* Botón Activar */
        document.getElementById("vtzPushAccept").addEventListener("click", function () {
            window.acceptPushConsent();
        });

        /* Botón Ahora no */
        document.getElementById("vtzPushDeclineBanner").addEventListener("click", function () {
            var el = document.getElementById("pushNotice");
            if (el) el.style.display = "none";
            localStorage.setItem(VTZ_PUSH_TS, Date.now().toString());
        });
    }

    /* Esperar a que el body esté disponible */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

/* ─── Funciones globales (usadas en onclick del HTML) ─── */
function acceptPushConsent() {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'denied') {
        var hint = document.getElementById("vtzPushHint");
        if (hint) {
            hint.innerHTML = '🔒 Haz clic en el candado de la barra de dirección → <strong>Permisos del sitio</strong> → <strong>Notificaciones</strong> → Permitir. Luego recarga la página.';
            hint.style.display = "block";
        }
        return;
    }

    function onPermission(permission) {
        var notice = document.getElementById("pushNotice");
        var overlay = document.getElementById("vtzPushOverlay");
        if (notice) notice.style.display = "none";
        if (overlay) overlay.style.display = "none";
        document.body.style.overflow = "";
        if (permission === 'granted') {
            localStorage.setItem("vtz_push_granted", "1");
            localStorage.setItem("vtz_push_ts", Date.now().toString());
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(function () {});
            }
        }
    }

    var result = Notification.requestPermission(onPermission);
    if (result && typeof result.then === 'function') {
        result.then(onPermission);
    }
}

function declinePushConsent() {
    var overlay = document.getElementById("vtzPushOverlay");
    var notice = document.getElementById("pushNotice");
    if (overlay) overlay.style.display = "none";
    document.body.style.overflow = "";
    if (notice) notice.style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
