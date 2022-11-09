const handleMenu = (nav = "", navBtn = "") => {
  // nav is where show the menu items
  // and navBtn is the button to show or hide nav element

  document.addEventListener("click", (e) => {
    if (!e.target.matches(`${navBtn} *`)) return;

    const $navMenu = document.querySelector(nav);

    if (!$navMenu.dataset.status)
      return console.error(
        'Para tener un menú dinamico debe indicar el data-attribute "status" (data-status) igual a "open" o "close"'
      );
    // const $navMenuBtn = document.getElementById(navBtn);

    if ($navMenu.dataset.status === "close") {
      $navMenu.classList.replace("p-0", "p-4");
      $navMenu.classList.replace("h-0", "h-auto");

      $navMenu.dataset.status = "open";
    } else {
      $navMenu.classList.replace("p-4", "p-0");
      $navMenu.classList.replace("h-auto", "h-0");

      $navMenu.dataset.status = "close";
    }
  });
};

export default handleMenu;
