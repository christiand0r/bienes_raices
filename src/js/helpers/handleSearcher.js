const handleSearcher = (searcher = "", searcherBtn = "") => {
  // nav is where show the menu items
  // and navBtn is the button to show or hide nav element

  document.addEventListener("click", (e) => {
    if (!e.target.matches(`${searcherBtn} *`)) return;

    const $searcher = document.querySelector(searcher);

    if (!$searcher.dataset.status)
      return console.error(
        'Para tener un buscador dinamico debe indicar el data-attribute "status" (data-status) igual a "open" o "close"'
      );

    if ($searcher.dataset.status === "close") {
      $searcher.classList.replace("h-0", "h-auto");

      const $input = $searcher.querySelector('input[type="text"]');
      $input.focus();

      $searcher.dataset.status = "open";
    } else {
      $searcher.classList.replace("h-auto", "h-0");

      $searcher.dataset.status = "close";
    }
  });
};

export default handleSearcher;
