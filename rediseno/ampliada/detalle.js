async function solicitarPermisoNotificaciones() {
  if (!("Notification" in window)) {
      console.error("Las notificaciones no están soportadas en este navegador.");
      return;
  }

  // Verificar el estado actual de los permisos
  const permisoActual = Notification.permission;

  if (permisoActual === "granted") {
      console.log("Permisos de notificación ya otorgados.");
      mostrarNotificacion("¡Hola!", "Ya tienes las notificaciones activadas.");
  } else if (permisoActual === "denied") {
      console.warn("Permiso de notificaciones denegado. Por favor, habilítalo manualmente.");
      // Opcional: Mostrar instrucciones al usuario.
      mostrarInstruccionesPermiso();
  } else if (permisoActual === "default") {
      console.log("Permisos de notificación aún no solicitados. Solicitando...");
      try {
          const nuevoPermiso = await Notification.requestPermission();
          if (nuevoPermiso === "granted") {
            console.log("Permisos otorgados por el usuario.");
            mostrarNotificacion("¡Gracias!", "Ahora las notificaciones están habilitadas.");
          } else if (nuevoPermiso === "denied") {
            console.warn("El usuario denegó los permisos de notificación.");
            mostrarInstruccionesPermiso();
          }
      } catch (error) {
          console.error("Error solicitando permisos de notificación:", error);
      }
  }
}

function mostrarNotificacion(titulo, cuerpo) {
  if ("Notification" in window) {
      new Notification(titulo, { body: cuerpo });
  }
}

function mostrarInstruccionesPermiso() {
  // Proporcionar instrucciones amigables al usuario para habilitar permisos manualmente.
  // alert(
  //     "Para activar las notificaciones, ve a la configuración del navegador, busca la sección de notificaciones para este sitio web y habilítalas."
  // );
}

// Llamar automáticamente a la función al cargar la página
solicitarPermisoNotificaciones();



// Activar notificaciones asi la pagina las tenga desactivadas
async function activarNotificaciones() {
  // Verificar el estado actual del permiso
  Notification.requestPermission().then(permission => {
    console.log("Estado de permisos:", permission);
      if (permission === "granted") {
          // Notificaciones ya activadas
          new Notification("¡Notificaciones activadas con éxito!", {
              body: "Ahora recibirás notificaciones importantes.",
              icon: "https://codigomarret.online/upload/img/logo-vis.png" // Reemplaza con la URL del icono de tu aplicación
          });
      } else if (permission === "denied") {
          // Si están denegadas, informa al usuario que debe activarlas manualmente
          alert("Parece que tienes las notificaciones desactivadas. Por favor, actívalas manualmente en la configuración del navegador.");
      } else {
          // Caso "default" o cuando el usuario no interactúa
          alert("Por favor, habilita las notificaciones para recibir actualizaciones.");
      }
  }).catch(error => {
      console.error("Error al solicitar notificaciones:", error);
  });
}
