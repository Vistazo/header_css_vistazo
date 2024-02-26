document.addEventListener('DOMContentLoaded', function() {
    // Obtener todas las etiquetas iframe
    var iframes = document.getElementsByTagName('iframe');
    
    // Convertir cada etiqueta iframe a amp-iframe
    for (var i = 0; i < iframes.length; i++) {
        if(ValidarAmp){
            var iframe = iframes[i];
            // Crear una nueva etiqueta amp-iframe
            var ampIframe = document.createElement('amp-iframe');
            // Copiar todos los atributos de la etiqueta iframe a la etiqueta amp-iframe
            for (var j = 0; j < iframe.attributes.length; j++) {
                var attribute = iframe.attributes[j];
                ampIframe.setAttribute(attribute.name, attribute.value);
            }
            // Reemplazar la etiqueta iframe con la etiqueta amp-iframe
            iframe.parentNode.replaceChild(ampIframe, iframe);
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
