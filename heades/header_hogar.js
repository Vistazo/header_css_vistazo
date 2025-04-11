document.addEventListener("DOMContentLoaded", function() {
    try {
        var navContainer = document.querySelector('.nav-dropdown .parent-nav');
        // Verificar si navContainer existe
        if (!navContainer) {
            throw new Error('El contenedor de navegación no se encontró.');
        }

        // Ocultar las opciones originales de "Moda" y "Belleza"
        var modaItem = navContainer.querySelector('.sect-4c8eef10f077d984f42db516026ee9e5');
        var bellezaItem = navContainer.querySelector('.sect-35171bd57250da9c6c11190279144063');

        if (modaItem) modaItem.style.display = 'none';
        if (bellezaItem) bellezaItem.style.display = 'none';
        // Inyectar HTML
        var tendenciasHTML = `
            <li class="lst-item tabnav sect-tendencias">
                <div class="tab-grp">
                    <a href="#" class="tab-item lnk tendencia" title="">
                        <span class="iconBefore"></span>
                        <strong class="sectionName">Tendencias</strong>
                        <span class="iconAfter"></span>
                    </a>
                    <span class="hasChildsIcon"></span>
                    <div class="child-nav cf mouseleave">
                        <ul class="lst-std lst level-2">
                            <div class="lst-items">
                                <li class="lst-item sect-belleza">
                                    <a href="/hogar/belleza" class="lnk" title="">
                                        <span class="iconBefore"></span>
                                        <span class="sectionName">Belleza</span>
                                        <span class="iconAfter"></span>
                                    </a>
                                </li>
                                <li class="lst-item sect-moda">
                                    <a href="/hogar/moda" class="lnk" title="">
                                        <span class="iconBefore"></span>
                                        <span class="sectionName">Moda</span>
                                        <span class="iconAfter"></span>
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </li>
        `;

        navContainer.insertAdjacentHTML('afterbegin', tendenciasHTML);

    } catch (error) {
        console.error(error.message);
    } finally {
        console.log('Script de inyección de tendencias ejecutado.');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let viaja = document.getElementById('3533742219');
    if(viaja){
        viaja.style.display = 'none';
    }
});


// Ocultar Nota en Hogar 
const HomeHogar = "https://www.vistazo.com/hogar"
const url = [
    'https://www.vistazo.com/hogar/personajes/david-daxsen-el-visionario-ecuatoriano-que-trabaja-para-las-naciones-unidas-GB7298109',
    'https://www.vistazo.com/testing/david-daxsen-el-visionario-ecuatoriano-que-trabaja-para-las-naciones-unidas-GB7298109'
]
document.addEventListener("DOMContentLoaded", function() {
    const currentUrl = window.location.href;
    const isInUrlList = url.some(url => currentUrl.includes(url));
    if (isInUrlList) {
        // lo redirecciona a la home de hogar
        window.location.href = HomeHogar;
    }
});
