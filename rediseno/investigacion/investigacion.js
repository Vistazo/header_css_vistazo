(function () {
    'use strict';

    /* ═══════════════════════════════════════════
       DROP CAP — primera letra del primer párrafo
       del cuerpo del artículo.
    ═══════════════════════════════════════════ */
    function applyDropCap() {
        var articleBody = document.querySelector('.text.resizable[itemprop="articleBody"]');
        if (!articleBody) return;

        var firstParagraph = articleBody.querySelector('.paragraph.texto p');
        if (!firstParagraph || firstParagraph.classList.contains('vz-dropcap')) return;

        firstParagraph.classList.add('vz-dropcap');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyDropCap);
    } else {
        applyDropCap();
    }
}());
