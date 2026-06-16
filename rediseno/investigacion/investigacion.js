(function () {
    'use strict';

    /* ═══════════════════════════════════════════
       DROP CAP — primera letra del primer párrafo
       del cuerpo del artículo.
    ═══════════════════════════════════════════ */
    function applyDropCap() {
        var firstParagraph = document.querySelector('.text_detail .paragraph.texto p.p_0');
        if (!firstParagraph || firstParagraph.classList.contains('vz-dropcap')) return;

        firstParagraph.classList.add('vz-dropcap');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyDropCap);
    } else {
        applyDropCap();
    }
}());
