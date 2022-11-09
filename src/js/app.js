import handleMenu from "./helpers/handleMenu.js";
import handleNotification from "./helpers/handleNotification.js";
import handleSearcher from "./helpers/handleSearcher.js";
import handlePropertyStatus from "./helpers/handlePropertyStatus.js";

document.addEventListener("DOMContentLoaded", (e) => {
  console.log("Cargando Scripts...");

  handlePropertyStatus();

  handleMenu("#nav-menu", "#nav-menu-btn");
  handleSearcher("#searcher", "#searcher-btn");

  handleNotification("#deletePropertyAction", (element, notie) => {
    if (!element) return;

    element.addEventListener("submit", (e) => {
      e.preventDefault();

      notie.confirm({
        text: "¿Está seguro que desea eliminar está propiedad?",
        cancelText: "Cancelar",
        submitText: "Si, eliminar",
        cancelCallback: function () {
          notie.alert({ type: 3, text: "Eliminación cancelada", time: 2 });
        },
        submitCallback: function () {
          notie.alert({ type: 1, text: "Eliminación exitosa", time: 2 });
          e.target.submit();
        },
      });
    });
  });
});
