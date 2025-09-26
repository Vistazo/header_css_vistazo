document.addEventListener('DOMContentLoaded', function() {
    // Obtener todas las etiquetas iframe
    var iframes = document.getElementsByTagName('iframe');
    
    // Convertir cada etiqueta iframe a amp-iframe
    for (var i = 0; i < iframes.length; i++) {
        if(ValidarAmp){
            var iframe = iframes[i];
            var ampIframe = document.createElement('amp-iframe');
            for (var j = 0; j < iframe.attributes.length; j++) {
                var attribute = iframe.attributes[j];
                ampIframe.setAttribute(attribute.name, attribute.value);
            }
            var noscriptTag = document.createElement('noscript');
            noscriptTag.appendChild(ampIframe);
            iframe.parentNode.replaceChild(noscriptTag, iframe);
        }
    }
    
    const ValidarAmp = () => {
        // URL a validar
        var url = "https://www.vistazo.com/amp/actualidad/jubilados-de-guayaquil-y-quito-protestan-en-los-exteriores-del-iess-DSVI4674";
        // Expresión regular para buscar "/amp/" después del dominio
        var regex = /^https?:\/\/[^\/]+\/amp\//;
        // Verificar si la URL cumple con el patrón
        if (regex.test(url)) {
            console.log("La URL tiene '/amp/' después del dominio.");
            return true;
        } else {
            console.log("La URL no tiene '/amp/' después del dominio.");
            return false;
        }
    }
});
