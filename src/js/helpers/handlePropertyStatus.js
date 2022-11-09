const handlePropertyStatus = () => {
  const changeStatus = (target) => {
    const { parentElement } = target;

    if (parentElement.classList.contains("bg-green-100")) {
      parentElement.classList.replace("bg-green-100", "bg-yellow-100");
      parentElement.classList.replace("text-green-800", "text-yellow-800");

      target.innerHTML = "No publicado";
    } else {
      parentElement.classList.replace("bg-yellow-100", "bg-green-100");
      parentElement.classList.replace("text-yellow-800", "text-green-800");

      target.innerHTML = "Publicado";
    }
  };

  document.addEventListener("click", async (e) => {
    if (!e.target.matches("#statusBtn")) return;

    const { pid: propertyId } = e.target.dataset;

    const token = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    const URL = `/properties/${propertyId}`;

    try {
      const res = await fetch(URL, {
        method: "PUT",
        headers: { "CSRF-Token": token },
      }).then((res) => res.json());

      res.success && changeStatus(e.target);
    } catch (error) {
      console.log(error);
    }
  });
};

export default handlePropertyStatus;
