
document.addEventListener("DOMContentLoaded", function () {

    document.querySelector(".portlet-boundary.portlet-static-end.menu-portlet.menu_header_bm").remove()
    document.querySelector(".portlet-boundary.portlet-static-end.adcontainer-portlet").remove()
    document.querySelector(".portlet-boundary.portlet-static-end.adcontainer-portlet").remove()
    document.querySelector(".portlet-boundary.portlet-static-end.htmlcontainer-portlet.icon_burguer_mobile_bm").remove()
    document.querySelector(".portlet-boundary.portlet-static-end.htmlcontainer-portlet.search_icon_mobile_bm").remove()
    document.querySelector(".portlet-boundary.portlet-static-end.menu-portlet.menu_burguer_mobile_bm").remove()
    document.querySelector(".portlet-boundary.portlet-static-end.adcontainer-portlet").remove()


    var navbar = document.querySelector(".portlet-boundary.portlet-static-end.portlet-nested-portlets.header_contain_dm")
    if(navbar){
        navbar.style.height="60px"
        navbar.style.background="#000"
        navbar.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "d-flex", "row", "align-items-center", "justify-content-between")
    }
    // buscar todo esta clase col-100-top-one-col col-xs-12 portlet-column nopadding y agregarle d-flex align-items-center justify-content-between
    var col100 = document.querySelector(".col-100-top-one-col.col-xs-12.portlet-column.nopadding")
    if(col100){
        col100.classList.add("d-flex","align-items-center","justify-content-between",)
        col100.style.width="100%"
        col100.style.height="60px"
        col100.style.padding="0px"
    }

    var conteFlui = document.querySelector("#col-100-top-one-col")
    if(conteFlui){
        // conteFlui.classList.add("container-fluid")
    }

    // //class="collapse navbar-collapse" id="navbarSupportedContent">
    var collapse = document.querySelector(".portlet-boundary.portlet-static-end.menu-portlet.menu_header_bm")
    if(collapse){
        // collapse.classList.add("collapse","navbar-collapse")
        // collapse.id="navbarSupportedContent"
        // collapse.style.width="60%"
    }

    var extraUl = document.querySelector(".menu_header_bm div div").innerHTML
    if(extraUl){
        menbm = document.querySelector(".menu_header_bm")
        menbm.innerHTML = extraUl
        ulclas = document.querySelector(".menu_header_bm ul")
        ulclas.classList.value=""
        ulclas.classList.add("navbar-nav","me-auto","mb-2","mb-lg-0")
        // cada li que este dentro de ul remover la clase y agregarle la clase nav-item
        var li = document.querySelectorAll(".menu_header_bm ul li")
        li.forEach(function(l){
            l.classList.value=""
            l.classList.add("nav-item", "dropdown")
        })






        ahref = document.querySelectorAll(".tab-item.lnk")
        ahref.forEach(function(a){
            // obtener el valor del atributo title 
            var title = a.getAttribute("title")
            a.setAttribute("id","navbarDropdown"+title.replace(/\s/g, ''))
            a.classList.add("nav-link", "dropdown-toggle")
            a.setAttribute("role","button")
            a.setAttribute("data-bs-toggle","dropdown")
            a.setAttribute("aria-expanded","false")
            a.style.color="#fff"
            a.style.fontWeight="normal"
            // a.style.padding="0px"
            // a.style.fontSize="19px"
            a.style.fontFamily="Crete Round"
            a.style.transition="transform 0.2s ease-in-out"
            // a.style.height="50px"
            a.style.position="relative"
            // a.style.marginTop="170px"
            // espacio entre cada elemento
            a.style.marginLeft="5px"
            a.style.marginRight="5px"

            // hacer un hover que al pasar el mouse por encima se mostrar el contenido childnavcf del elemento por el cual se esta pasando el mouse
            a.addEventListener("mouseover",function(e){
                console.log("e: ",e)
                // como

            })
            // y cuando se quite el mouse vuelva al color original
            a.addEventListener("mouseout",function(){
                a.firstChild.style.display="none"
                a.style.alignItems="center"
            })


        })

        childnavcf = document.querySelectorAll(".child-nav.cf")
        childnavcf.forEach(function(c){
            // c.style.display="none"
            c.style.padding="0px"
        })

        menu_burguer_bm = document.querySelector(".menu_burguer_bm")
        // hacer que apareza el menu de hamburguesa
        // anadirle un svg al menu de hamburguesa

        
        

        if(menu_burguer_bm){
            // menu_burguer_bm.style.display="none"
        }

        login_menu = document.querySelector(".menu_burguer_bm")
        login_menuPotcap = document.querySelector(".menu_burguer_bm div div")
        login_menu.innerHTML=""
        login_menu.innerHTML=`<div class="login_menu_bm">
        <div class="registro_bm">
        <div class="login">
            <a class=" "
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
        </div>
        <div class="hamburg_bm" style='color: white' id='menu_1'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            ${login_menuPotcap.innerHTML}
        </div>
        </div>`
    }

    var actualidad1 = document.querySelector("#collapseWidthExample")
    // hacer que cuando se haga click en el boton de actualidad se abra el menu
    if(actualidad1){
        // z-index: 1000;
        actualidad1.style.zIndex="1000"
    }

    var actualidad = document.querySelector("#navbarDropdownActualidad")
    if(actualidad){
        actualidad.style.color="#fff"
        actualidad.style.fontWeight="normal"
        actualidad.style.fontSize="19px"
        actualidad.style.fontFamily="Crete Round"
        actualidad.style.transition="transform 0.2s ease-in-out"

        // hacer un hover que al pasar el mouse por encima cambie el color el contenido
        // actualidad.addEventListener("mouseover",function(){
        //     actualidad.style.background="#B00000"
        //     actualidad.style.transform="skew(-30deg)"
        // })
        // y cuando se quite el mouse vuelva al color original

        actualidad.addEventListener("mouseout",function(){
            actualidad.style.background="none"
            actualidad.style.transform="none "
        })
        // hacer que se los lado sean diagonales algo asi
        actualidad.style.width="100px"
        actualidad.style.height="50px"


    }
    var politica = document.querySelector("#navbarDropdownPolitica")
    if(politica){
        politica.style.color="#fff"
        politica.style.fontWeight="normal"
        politica.style.fontSize="19px"
        politica.style.fontFamily="Crete Round"
    }
    var opinion = document.querySelector('.tab-item[title="Opinión"]');
    if(opinion){
        opinion.style.color="#fff"
        opinion.style.fontWeight="normal"
        opinion.style.fontSize="19px"
        opinion.style.fontFamily="Crete Round"
    }
    var hogar = document.querySelector('.tab-item[title="Hogar"]')
    if(hogar){
        hogar.innerHTML=""
        hogar.style.textDecoration="none"
        hogar.style.text="none"
        hogar.style.backgroundImage="url(https://www.vistazo.com/base-portlet/webrsrc/theme/d8b88de3cfb5c95f245841155cba993a.png)"
        hogar.style.backgroundRepeat="no-repeat"
        hogar.style.backgroundSize="contain"
        hogar.style.width="95px"
        hogar.style.height="35px"
        hogar.style.backgroundPosition="center center"
    }

    var estilo = document.querySelector("#navbarDropdownEstiloDeVida")
    if(estilo){
        estilo.style.color="#fff"
        estilo.style.fontWeight="normal"
        estilo.style.fontSize="19px"
        estilo.style.fontFamily="Crete Round"
    }

    var portafolio = document.querySelector("#navbarDropdownPortafolio")
    if(portafolio){
        portafolio.innerHTML=""
        portafolio.style.textDecoration="none"
        portafolio.style.text="none"
        portafolio.style.backgroundImage="url(https://www.vistazo.com/base-portlet/webrsrc/ctxvar/9e921527-7c01-4ccc-922e-ca6d5b7b2957.png)"
        portafolio.style.backgroundRepeat="no-repeat"
        portafolio.style.backgroundSize="contain"
        portafolio.style.width="95px"
        portafolio.style.height="35px"
        portafolio.style.backgroundPosition="center center"
    }

    var estadio = document.querySelector('.tab-item[title="Estadio"]')
    if(estadio){
        estadio.innerHTML=""
        estadio.style.textDecoration="none"
        estadio.style.text="none"
        estadio.style.backgroundImage="url(https://www.vistazo.com/base-portlet/webrsrc/ctxvar/2efe3a01-c41f-40d4-a373-c46a0730f3cb.png)"
        estadio.style.backgroundRepeat="no-repeat"
        estadio.style.backgroundSize="contain"
        estadio.style.width="95px"
        estadio.style.height="35px"
        estadio.style.backgroundPosition="center center"
    }

    var enfoque = document.querySelector('.tab-item[title="Enfoque"]')
    if(enfoque){
        enfoque.innerHTML=""
        enfoque.style.textDecoration="none"
        enfoque.style.text="none"
        enfoque.style.backgroundImage="url(https://www.vistazo.com/base-portlet/webrsrc/ctxvar/c607a3ce-c67c-44a9-873c-81f2200d1fee.png)"
        enfoque.style.backgroundRepeat="no-repeat"
        enfoque.style.backgroundSize="contain"
        enfoque.style.width="95px"
        enfoque.style.height="35px"
        enfoque.style.backgroundPosition="center center"
    }

    header_suscribete = document.querySelector(".header_suscribete_bm")
    header_suscribete2 = document.querySelector(".header_suscribete_bm div")
    header_suscribete3 = document.querySelector(".header_suscribete_bm div a")
    linearoja = document.querySelector(".linearoja")
    if(header_suscribete){
        header_suscribete.style.background="#fff"
        header_suscribete.style.position="relative"
        header_suscribete.style.padding="6px"
        header_suscribete.style.width="100px"
        header_suscribete.style.clipPath="polygon(27% 0, 100% 0, 100% 100%, 0% 100%)"
        header_suscribete.style.display="flex"
        header_suscribete.style.alignItems="center"
        header_suscribete.style.justifyContent="center"
        // hacer que se valla a la derecha
        header_suscribete.style.marginLeft="auto"
        header_suscribete.style.paddingLeft="15px"
        header_suscribete.style.paddingRight="15px"
        
        header_suscribete2.style.width="100%"
        header_suscribete2.style.display="flex"
        header_suscribete2.style.flexDirection="column"
        header_suscribete2.style.justifyItems="center"
        header_suscribete2.style.justifyContent="center"
        header_suscribete2.style.alignItems="center"
        header_suscribete2.style.height="60px"
        header_suscribete2.style.fontSize="14px"
        header_suscribete2.style.fontFamily="Crete Round"

        header_suscribete3.style.color="#000"
        header_suscribete3.style.textDecoration="none"
        header_suscribete3.style.fontWeight="600"
        header_suscribete3.style.bordenButton="2px solid #000"
        header_suscribete3.style.paddingLeft="10px"
        header_suscribete3.style.paddingRight="10px"
    }

    // buscador 
    basic_search = document.querySelector(".portlet-boundary.portlet-static-end.advanced-search-portlet.basic_search")
    if(basic_search){
        basic_search.style.display="none"
    }

    menuHambu = document.querySelector(".hamburg_bm svg")
    menuHambuActiva = document.querySelector(".login_menu_bm ul")
    menuHambu.addEventListener("click",function(){
        console.log("menuHambuActiva: ",menuHambuActiva.style.display)
        if(menuHambuActiva.style.display=="none" || menuHambuActiva.style.display==""){
                menuHambuActiva.style.display="block"
        }else{
            menuHambuActiva.style.display="none"
        }
    })

    // cuando aga click en cualquier parte de la pagina que no sea el menu hamburguesa se cierre el menu hamburguesa
    document.addEventListener("click",function(e){
        if(e.target != menuHambu){
            menuHambuActiva.style.display="none"
        }
    })

})
// clip-path: polygon(38% 0, 100% 0, 100% 100%, 0% 100%);
function buildHeader() {

    list = document.querySelector('.lst-items').innerHTML;
    listContainer = document.querySelector('.child-nav.cf ul');
    listContainer.innerHTML = list

    chil = document.querySelector('.child-nav.cf').innerHTML;
    chilContainer = document.querySelector('.tab-grp');
    chilContainer.innerHTML = chil

}






// creación de scripts con vanilla   
	// const script = document.createElement('script');
	// script.src = 'script.js'; // si el archivo es local escribir directamente el archivo
	// script.src = 'https://vzheaders.netlify.app/heades/main.js'; // si es cdn usar todo el protocolo
	// script.async = true; // habilitamos el atributo async
	// script.type = 'module';// hace que el script sea tratado como si fuera un módulo de JavaScript
	// script.onload = () => { console.log('Script loaded successfuly'); }; //mensaje en caso de exito (consola)
	// script.onerror = () => { console.log('ha ocurrido un error'); }; //mensaje en caso de error (consola)
	// document.body.appendChild(script);
// fin de creación de scripts con vanilla
