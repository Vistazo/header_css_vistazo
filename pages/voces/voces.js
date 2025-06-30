document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu-desplegable");

    menuToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            menu.classList.remove("show");
        }
    });

    document.querySelectorAll('#menu-desplegable a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('show');
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const searchToggle = document.getElementById("search-toggle");
    const searchBox = document.getElementById("search-box");
    const searchInput = document.getElementById("search-input");
    const suggestionsList = document.getElementById("suggestions-list");

    // Mostrar/ocultar buscador
    searchToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        searchBox.classList.toggle("d-none");
        suggestionsList.innerHTML = "";
        if (!searchBox.classList.contains("d-none")) {
            setTimeout(() => searchInput.focus(), 100);
        }
    });

    // Cerrar si se hace click fuera
    document.addEventListener("click", function (e) {
        if (!searchBox.contains(e.target) && !searchToggle.contains(e.target)) {
            searchBox.classList.add("d-none");
        }
    });

    // Buscar coincidencias y mostrar sugerencias
    searchInput.addEventListener("input", function () {
        const query = this.value.trim().toLowerCase();
        suggestionsList.innerHTML = "";

        if (query.length < 2) return;

        const searchables = Array.from(document.querySelectorAll("h1, h2, h3, p, a, li, span"));
        const seen = new Set();
        const matches = [];

        searchables.forEach(el => {
            const text = el.innerText.trim();
            const lowerText = text.toLowerCase();

            // Solo si contiene el texto y aún no ha sido mostrado
            if (lowerText.includes(query) && !seen.has(lowerText) && text.length > 0) {
                seen.add(lowerText);
                matches.push({ element: el, text });
            }
        });

        matches.slice(0, 10).forEach(match => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.innerText = match.text.length > 60 ? match.text.slice(0, 60) + "..." : match.text;
            li.addEventListener("click", () => {
                match.element.scrollIntoView({ behavior: "smooth", block: "center" });
                searchBox.classList.add("d-none");
                searchInput.value = "";
                suggestionsList.innerHTML = "";
            });
            suggestionsList.appendChild(li);
        });
    });


    // Enter activa primer match
    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const firstSuggestion = suggestionsList.querySelector("li");
            if (firstSuggestion) firstSuggestion.click();
        }
    });
});