document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelector('.lst-item.tabnav.sect-1824.sect-262e52091545304582cf18882fc67b4f div a strong');
    elems.innerHTML = "";
    hogar = document.querySelector(".lst-item.tabnav.sect-529.sect-0903d1806e4bd8bf290229a78d484445 a");
    hogar.innerHTML = "";
    console.log(hogar);
    enfoque = document.querySelector(".lst-item.tabnav.sect-247.sect-74b11848b5e1a47d79fed2bc56e2a9fc a");
    enfoque.innerHTML = "";
    estadio = document.querySelector(".lst-item.tabnav.sect-246.sect-a4306ce1cba409d40f6649f40a27a166 a");
    estadio.innerHTML = "";


    close_burguer = document.querySelector(".close_burguer");
    close_burguer.addEventListener("click", function() {
        ver = document.querySelector(".menu_burguer_bm")
        if (ver.style.display == "none" || ver.style.display == "") {
            ver.style.display = "block";
        }else{
            ver.style.display = "none";
        }

    });
});

