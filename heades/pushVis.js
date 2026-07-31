/* ─── Banner notificaciones push ─── */
var pushHtml = `
<div id="pushNotice" class="vtz-push-banner" style="display:none;">
  <img class="vtz-push-banner__logo" src="https://codigomarret.online/upload/img/logovistazo.png" alt="Vistazo">
  <strong class="vtz-push-banner__title">¡Activa las notificaciones!</strong>
  <p class="vtz-push-banner__text">
    Recibe al instante las noticias más importantes, coberturas de última hora y los contenidos más relevantes de Vistazo.
  </p>
  <div class="vtz-push-banner__btns">
    <button class="vtz-push-banner__btn" id="vtzPushDeclineBanner">Ahora no</button>
    <button class="vtz-push-banner__btn vtz-push-banner__btn--accept" id="vtzPushAccept">Activar</button>
  </div>
</div>

<div id="vtzPushOverlay" style="display:none;">
  <div class="vtzpush-modal">
    <img class="vtzpush-logo" src="https://codigomarret.online/upload/img/logovistazo.png" alt="Vistazo">
    <strong class="vtzpush-title">¡Activa las notificaciones!</strong>
    <p class="vtzpush-desc">Recibe al instante las noticias más importantes, coberturas de última hora y los contenidos más relevantes de Vistazo.</p>
    <div class="vtzpush-btns">
      <button onclick="declinePushConsent()">Volver al inicio</button>
      <button class="accept" onclick="acceptPushConsent()">Activar notificaciones</button>
    </div>
  </div>
</div>
`;

var pushContainer = document.createElement("div");
pushContainer.innerHTML = pushHtml;
document.body.appendChild(pushContainer);

/* ─── Claves de almacenamiento ─── */
var VTZ_PUSH_TS      = "vtz_push_ts";
var VTZ_PUSH_GRANTED = "vtz_push_granted";
var THIRTY_DAYS_MS   = 30 * 24 * 60 * 60 * 1000;
var _pushScrollTriggered = false;

/* ─── Helpers de estado ─── */
function isPushSupported() {
    return 'Notification' in window;
}

function isPushGranted() {
    return Notification.permission === 'granted' || !!localStorage.getItem(VTZ_PUSH_GRANTED);
}

function isPushDenied() {
    return Notification.permission === 'denied';
}

function isPushDismissed() {
    var ts = localStorage.getItem(VTZ_PUSH_TS);
    return !!(ts && (Date.now() - parseInt(ts, 10)) < THIRTY_DAYS_MS);
}

/* ─── Mostrar banner inicial ─── */
function checkPush() {
    if (!isPushSupported() || isPushGranted() || isPushDenied() || isPushDismissed()) return;
    document.getElementById("pushNotice").style.display = "block";
}
checkPush();

/* ─── Aceptar: solicitar permiso nativo ─── */
function acceptPushConsent() {
    if (!isPushSupported()) return;

    function onPermission(permission) {
        document.getElementById("pushNotice").style.display = "none";
        document.getElementById("vtzPushOverlay").style.display = "none";
        document.body.style.overflow = "";

        if (permission === 'granted') {
            localStorage.setItem(VTZ_PUSH_GRANTED, "1");
            localStorage.setItem(VTZ_PUSH_TS, Date.now().toString());
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(function () {});
            }
        }
    }

    // API antigua devuelve undefined, nueva devuelve Promise
    var result = Notification.requestPermission(onPermission);
    if (result && typeof result.then === 'function') {
        result.then(onPermission);
    }
}

/* ─── Rechazar en overlay → volver al inicio ─── */
function declinePushConsent() {
    document.getElementById("vtzPushOverlay").style.display = "none";
    document.body.style.overflow = "";
    document.getElementById("pushNotice").style.display = "block";
    _pushScrollTriggered = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── Overlay bloqueante al 50% de scroll ─── */
(function () {
    if (!isPushSupported()) return;
    window.addEventListener('scroll', function () {
        if (_pushScrollTriggered || isPushGranted() || isPushDenied() || isPushDismissed()) return;
        var scrolled = window.scrollY || document.documentElement.scrollTop;
        var total = document.documentElement.scrollHeight - window.innerHeight;
        if (total > 0 && (scrolled / total) >= 0.5) {
            _pushScrollTriggered = true;
            document.getElementById("pushNotice").style.display = "none";
            document.getElementById("vtzPushOverlay").style.display = "flex";
            document.body.style.overflow = "hidden";
        }
    }, { passive: true });
})();

/* ─── Eventos de botones ─── */
document.getElementById("vtzPushAccept").addEventListener("click", acceptPushConsent);

document.getElementById("vtzPushDeclineBanner").addEventListener("click", function () {
    document.getElementById("pushNotice").style.display = "none";
    localStorage.setItem(VTZ_PUSH_TS, Date.now().toString()); // ocultar 30 días
});
