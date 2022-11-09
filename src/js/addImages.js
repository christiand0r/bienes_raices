import { Dropzone } from "dropzone";

const token = document
  .querySelector('meta[name="csrf-token"')
  .getAttribute("content");

Dropzone.options.formPropertyImage = {
  acceptedFiles: ".png,.jpg,.jpeg",
  addRemoveLinks: true,
  autoProcessQueue: false,
  maxFiles: 1,
  maxFilesize: 8,
  parallelUploads: 1,
  paramName: "images",
  dictDefaultMessage: "Arrastra y suelta tus imágenes aquí",
  dictRemoveFile: "Borrar imagen",
  dictMaxFilesExceeded: "El máximo de imágenes que puede subir es 1",
  headers: {
    "X-CSRF-Token": token,
  },

  init() {
    const dropzone = this;

    const $form = document.getElementById("formPropertyImage");

    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      dropzone.processQueue();
    });

    dropzone.on("queuecomplete", () => {
      if (dropzone.getActiveFiles().length > 0) return;

      window.location.href = "/my-properties";
    });
  },
};
