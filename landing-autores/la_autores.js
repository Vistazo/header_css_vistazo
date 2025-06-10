function cargarAutores() {
  const contenedor = document.querySelector('.contenido-autores');
  const rutaActual = window.location.pathname;
  const ultimoSegmentoRuta = rutaActual.split('/').filter(Boolean).pop();

  const iconos = {
    Facebook: 'https://cdn-icons-png.flaticon.com/512/733/733547.png',
    Instagram: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
    Linkedin: 'https://cdn-icons-png.flaticon.com/512/145/145807.png',
    X: 'https://cdn-icons-png.flaticon.com/512/3670/3670151.png'
  };

  fetch('https://header-css-vistazo.vercel.app/landing-autores/data_autores.json')
    .then(res => res.json())
    .then(data => {
      // Buscar autor si la ruta contiene "/periodistas"
      // if (rutaActual.includes('/periodistas')) {
        const autor = data.find(a => {
          try {
            const ultimaParteLink = new URL(a.link).pathname.split('/').filter(Boolean).pop();
            return ultimaParteLink === ultimoSegmentoRuta;
          } catch (e) {
            return false;
          }
        });

        if (autor) {
          console.log('Autor encontrado:', autor.nombre);
        } else {
          console.log('No se encontró coincidencia con esta ruta.');
        }
      // }

      // Mostrar todos los autores
      if (contenedor) {
        data.forEach(autor => {
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <img src="${autor.foto}" alt="${autor.nombre}">
            <div class="card-body">
              <p class="nombre">${autor.nombre}</p>
              <div class="redes">
                ${autor.redes.map(red => `
                  <a href="${red.url}" target="_blank" title="${red.name}">
                    <img src="${iconos[red.name] || ''}" alt="${red.name}">
                  </a>
                `).join('')}
              </div>
              <p class="descripcion">${autor.descripcion}</p>
              <a class="ver-mas" href="${autor.link}" target="_blank">Ver más</a>
            </div>
          `;
          contenedor.appendChild(card);
        });
      }
    })
    .catch(error => {
      console.error('Error al cargar autores:', error);
      if (contenedor) {
        contenedor.innerHTML = '<p>Error al cargar los datos.</p>';
      }
    });
}

cargarAutores();
