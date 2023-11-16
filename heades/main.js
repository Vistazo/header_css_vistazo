document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");

    try {
        register = document.querySelector(".nav-dropdown.nav.noSubNav")
        if(register){
            copi = register.innerHTML
            logo = `<div><a class="site-logo" href="/" aria-label="Vistazo">vistazo</a></div>`
            register.innerHTML=""
            register.innerHTML=`${logo}${copi}<div class="login_menu_bm">
                    <div class="login">
                        <a class=""
                            href="https://suscripciones.vistazo.com/id/login/?continue=https%3A%2F%2Fwww.vistazo.com%2F">
                            <img src="https://suscripciones.vistazo.com/img/id/ic-user.svg"
                            width=20"
                            height="auto"
                            alt="icono-vtz"
                            arial-label="Vistazo"
                            title="img-login"
                            loading="lazy">Login
                        </a>
                    </div>
                    <div class="hamburg_bm" style='color: white' id='menu_1'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="burger" width="24" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="lupin" style='color: white' width="25" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </div>
            </div>`
        }

        opinion = document.querySelector(".sect-ed616e97416bbb72f2a42fa530435804");
        div= `<div class="tab-grp">
                ${opinion.innerHTML}
                <span class="hasChildsIcon"></span>
                <div class="child-nav cf">
                </div>
            </div>`
        opinion.innerHTML = div;
        e2 = document.querySelector(".sect-262e52091545304582cf18882fc67b4f");
        div2= `<div class="tab-grp">
                ${e2.innerHTML}
                <span class="hasChildsIcon"></span>
                <div class="child-nav cf">
                </div>
            </div>`
        e2.innerHTML = div2;
    
        e3 = document.querySelector(".sect-0903d1806e4bd8bf290229a78d484445");
        div3= `<div class="tab-grp">
                ${e3.innerHTML}
                <span class="hasChildsIcon"></span>
                <div class="child-nav cf">
                </div>
            </div>`
        e3.innerHTML = div3;
    
        e4 = document.querySelector(".sect-74b11848b5e1a47d79fed2bc56e2a9fc");
        div4= `<div class="tab-grp">
                ${e4.innerHTML}
                <span class="hasChildsIcon"></span>
                <div class="child-nav cf">
                </div>
            </div>`
        e4.innerHTML = div4;
    
        e5 = document.querySelector(".sect-a4306ce1cba409d40f6649f40a27a166");
        div5= `<div class="tab-grp">
                ${e5.innerHTML}
                <span class="hasChildsIcon"></span>
                <div class="child-nav cf">
                </div>
            </div>`
        e5.innerHTML = div5;
    
        var elems = document.querySelector('.lst-item.tabnav.sect-1824.sect-262e52091545304582cf18882fc67b4f div a strong');
        elems.innerHTML = "";
        hogar = document.querySelector(".lst-item.tabnav.sect-529.sect-0903d1806e4bd8bf290229a78d484445 a");
        hogar.innerHTML = "";
        console.log(hogar);
        enfoque = document.querySelector(".lst-item.tabnav.sect-247.sect-74b11848b5e1a47d79fed2bc56e2a9fc a");
        enfoque.innerHTML = "";
        estadio = document.querySelector(".lst-item.tabnav.sect-246.sect-a4306ce1cba409d40f6649f40a27a166 a");
        estadio.innerHTML = "";
    
    
        close_burguer = document.querySelector(".burger");
        if(close_burguer){
            close_burguer.addEventListener("click", function() {
                ver = document.querySelector(".menu_burguer_bm")
                if (ver.style.display == "none" || ver.style.display == "") {
                    ver.style.display = "block";
                }else{
                    ver.style.display = "none";
                }
            });
        }
    
        // para que tambien se cierre el menu cuando se haga click en cualquier parte de la pantalla
        window.addEventListener("click", function(event) {
            if (event.target == document.querySelector(".menu_burguer_bm")) {
                document.querySelector(".menu_burguer_bm").style.display = "none";
            }
        });
    
        buecador = document.querySelector(".lupin");
        if(buecador){
            buecador.addEventListener("click", function() {
                ver = document.querySelector(".basic_search_bm")
                if (ver.style.display == "none" || ver.style.display == "") {
                    ver.style.display = "block";
                }else{
                    ver.style.display = "none";
                }
            });
        }
    
        // para que tambien se cierre el menu cuando se haga click en cualquier parte de la pantalla
        window.addEventListener("click", function(event) {
            if (event.target == document.querySelector(".basic_search_bm")) {
                document.querySelector(".basic_search_bm").style.display = "none";
            }
        });
    
        tabgrp = document.querySelectorAll(".tab-grp");
        console.log(tabgrp);
        // if(tabgrp.length > 0){
            tabgrp.forEach(e => {
                e.addEventListener("mouseover", function() {
                    e.style.clipPath="polygon(11.5% -25.13%,96.50% -24.00%,88% 100%,0% 100%)";
                    e.style.backgroundColor="#fd0f03";
                    e.style.textAlign="center";
                    e.style.margin="0px"
                    e.style.colo="white"
                    e.style.padding="0px";
                    e.style.height="100%";
                });
    
                e.addEventListener("mouseout", function() {
                    e.style.clipPath="polygon(0% 0, 100% 0%, 100% 100%, 0% 100%)";
                    e.style.backgroundColor="#000";
                    e.style.padding="0px";
                });
        
            });
        // }
    
    } catch (error) {
        console.log("Error: ",error);
    }

    register2 = document.querySelector(".registro")
    if(register2){
        register2.style.innerHTML=""
    }
});
