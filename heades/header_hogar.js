$(document).ready(function () {
    var tendenciasHTML = `
        <li class="lst-item tabnav sect-tendencias">
            <div class="tab-grp">
                <a href="#" class="tab-item lnk" title="">
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

    $('#nav-container .parent-nav').append(tendenciasHTML);
});
