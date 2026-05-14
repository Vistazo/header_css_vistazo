(function () {
  var API_URL = "https://backoffice.bmcodigo.com/api/letters";
  var UPLOAD_API_URL = "https://backoffice.bmcodigo.com/api/public/upload";
  var AUTH_API_URL = "https://backoffice.bmcodigo.com/api/public/auth/token";
  var BASE_DOMAIN = "https://backoffice.bmcodigo.com";
  var AUTH_CREDENTIALS = {
    email: "eriveraec@gmail.com",
    password: "123456",
    name: "Mi Sitio Web"
  };
  var authToken = "";

  var mountNode = document.querySelector(".main-form-letter");

  if (!mountNode) {
    return;
  }

  mountNode.innerHTML = [
    '<form id="letterForm">',
    '',
    '  <label class="label_ant">Título</label><br/>',
    '  <input type="text" name="title" class="field_elem" required /><br/><br/>',
    '',
    '  <label class="label_ant">Contenido de la carta</label><br/>',
    '  <textarea name="content" rows="6" class="field_elem" required></textarea><br/><br/>',
    '',
    '  <label class="label_ant">Autor de la carta</label><br/>',
    '  <input type="text" name="authorName" class="field_elem" required /><br/><br/>',
    '',
    '  <label class="label_ant">Ubicación</label><br/>',
    '  <input type="text" name="authorLocation" class="field_elem" required /><br/><br/>',
    '',
    '  <label class="label_ant">Email</label><br/>',
    '  <input type="email" name="authorEmail" class="field_elem" required /><br/><br/>',
    '  <label class="label_ant">Fecha de publicación</label><br/>',
    '  <input type="date" name="publishDate" class="field_elem" required /><br/><br/>',
    // '',
    // '  <label class="label_ant">Categoria</label><br/>',
    // '  <input type="text" name="category" class="field_elem" required /><br/><br/>',
    // '',
    '  <label class="label_ant">Subir PDF (Opcional)</label><br/>',
    '  <input type="file" name="pdfFile" class="field_elem" accept="application/pdf,.pdf" required /><br/>',
    '  <small id="pdfUploadStatus"></small><br/><br/>',
    '',
    '  <input type="hidden" name="pdfUrl" />',
    '  <div class="btts_forms"> <input type="submit" value="Enviar"> </div>',
    '</form>',
    '<div id="modalOverlay" class="modal-overlay">',
    '  <div id="modalContent" class="modal-content">',
    // '    <h3 class="modal-title" id="modalTitle"></h3>',
    '    <p class="modal-message" id="modalMessage"></p>',
    '    <button class="modal-button" id="modalCloseBtn">Cerrar</button>',
    '  </div>',
    '</div>'
  ].join("\n");

  var form = document.getElementById("letterForm");
  var modalOverlay = document.getElementById("modalOverlay");
  var modalContent = document.getElementById("modalContent");
  var modalTitle = document.getElementById("modalTitle");
  var modalMessage = document.getElementById("modalMessage");
  var modalCloseBtn = document.getElementById("modalCloseBtn");
  var pdfFileInput = form.elements.pdfFile;
  var pdfUrlInput = form.elements.pdfUrl;
  var pdfUploadStatus = document.getElementById("pdfUploadStatus");
  var submitButton = form.querySelector('input[type="submit"]');

  function showModal(isSuccess, title, message) {
    if (modalTitle) {
      modalTitle.textContent = title;
    }
    modalMessage.textContent = message;
    modalContent.classList.remove("success", "error");
    modalContent.classList.add(isSuccess ? "success" : "error");
    modalOverlay.classList.add("active");
  }

  function closeModal() {
    modalOverlay.classList.remove("active");
  }

  function formatPublishDateToUtcFromEcuador(dateValue) {
    var parts = (dateValue || "").split("-");

    if (parts.length !== 3) {
      return "";
    }

    var year = Number(parts[0]);
    var month = Number(parts[1]);
    var day = Number(parts[2]);

    if (!year || !month || !day) {
      return "";
    }

    // Ecuador is UTC-5; midnight in Ecuador equals 05:00:00.000Z.
    var ecuatorUtcHour = 5;
    return new Date(Date.UTC(year, month - 1, day, ecuatorUtcHour, 0, 0, 0)).toISOString();
  }

  async function uploadPdfFile(file) {
    var token = await getAuthToken();
    var formData = new FormData();
    formData.append("file", file);

    var uploadResponse = await fetch(UPLOAD_API_URL, {
      method: "POST",
      headers: {
        "Authorization": token
      },
      body: formData
    });

    var uploadResult = await uploadResponse.json();

    if (!uploadResponse.ok || !uploadResult.success || !uploadResult.file || !uploadResult.file.filePath) {
      var apiMessage = uploadResult && uploadResult.message ? uploadResult.message : "No se pudo subir el PDF.";
      throw new Error(apiMessage);
    }

    return uploadResult.file.filePath;
  }

  async function getAuthToken() {
    if (authToken) {
      return authToken;
    }

    var tokenResponse = await fetch(AUTH_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(AUTH_CREDENTIALS)
    });

    var tokenResult = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenResult || !tokenResult.token) {
      var authErrorMessage = tokenResult && tokenResult.message ? tokenResult.message : "No se pudo obtener el token de autenticacion.";
      throw new Error(authErrorMessage);
    }

    authToken = "Bearer " + tokenResult.token;
    return authToken;
  }

  modalCloseBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  pdfFileInput.addEventListener("change", async function () {
    var selectedFile = pdfFileInput.files && pdfFileInput.files[0];

    pdfUrlInput.value = "";

    if (!selectedFile) {
      pdfUploadStatus.textContent = "";
      return;
    }

    submitButton.disabled = true;
    pdfUploadStatus.textContent = "Subiendo PDF...";

    try {
      var uploadedFilePath = await uploadPdfFile(selectedFile);
      pdfUrlInput.value = BASE_DOMAIN + uploadedFilePath;
      pdfUploadStatus.textContent = "PDF subido correctamente.";
    } catch (error) {
      pdfUploadStatus.textContent = "Error al subir PDF: " + error.message;
      showModal(false, "Error", "No se pudo subir el PDF. " + error.message);
    } finally {
      submitButton.disabled = false;
    }
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!pdfUrlInput.value.trim()) {
      showModal(false, "Error", "Debes subir un PDF antes de enviar la carta.");
      return;
    }

    var payload = {
      title: form.title.value.trim(),
      content: form.content.value.trim(),
      authorName: form.authorName.value.trim(),
      authorLocation: form.authorLocation.value.trim(),
      authorEmail: form.authorEmail.value.trim(),
      publishDate: formatPublishDateToUtcFromEcuador(form.publishDate.value),
      // category: form.category.value.trim(),
      pdfUrl: pdfUrlInput.value.trim(),
      status: "pending"
    };

    try {
      var token = await getAuthToken();
      var response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify(payload)
      });

      var responseText = await response.text();
      var parsedResponse;

      try {
        parsedResponse = JSON.parse(responseText);
      } catch (e) {
        parsedResponse = responseText;
      }

      if (response.ok) {
        showModal(true, "Éxito", "Tu carta ha sido enviada correctamente.");
        form.reset();
      } else {
        showModal(false, "Error", "Hubo un problema al enviar tu carta. Estado: " + response.status);
      }
    } catch (error) {
      showModal(false, "Error", "Ocurrió un error: " + error.message);
    }
  });
})();