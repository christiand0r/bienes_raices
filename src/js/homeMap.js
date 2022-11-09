(async function () {
  const Leaflet = L;
  let properties = [];
  const filters = { price: "", category: "" };

  const getPosition = (options = {}) => {
    const { geolocation } = window.navigator;

    return new Promise((resolve, reject) => {
      const success = (pos) => {
        const { accuracy, latitude, longitude } = pos.coords;

        resolve({
          accuracy,
          latitude,
          longitude,
          error: false,
          msg: "Position obtained succesfully",
        });
      };

      const error = (err) => {
        reject({
          accuracy: 0,
          latitude: null,
          longitude: null,
          error: true,
          msg: `Error trying to get position(${err.code}): ${err.message}`,
        });
      };

      geolocation.getCurrentPosition(success, error, options);
    });
  };

  const position = await getPosition();
  if (position.error) return console.warn(new Error(position.msg));

  const lat = position.latitude;
  const lng = position.longitude;

  const map = Leaflet.map("homeMap").setView([lat, lng], 12);
  let markers = Leaflet.featureGroup().addTo(map);

  // Add layer map for render
  const layer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const options = {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  };

  const getPropertiesLocation = async (queryStrings = "") => {
    try {
      const URL = !queryStrings
        ? "/api/properties"
        : `/api/properties?${queryStrings}`;

      const response = await fetch(URL);

      if (!response.ok)
        throw {
          code: response.status,
          error: response.statusText,
        };

      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const generateFilters = () => {
    const priceInput = document.getElementById("price");
    const categoriesInput = document.getElementById("categories");

    let debounceTimer;

    priceInput.addEventListener("input", (e) => {
      if (debounceTimer) clearTimeout(debounceTimer);

      debounceTimer = setTimeout(async () => {
        filters.price = e.target.valueAsNumber || null;

        const queryStrings = new URLSearchParams(filters).toString();

        properties = await getPropertiesLocation(queryStrings).then(
          (res) => res.properties
        );
        renderProperties(properties, markers);
      }, 500);
    });

    categoriesInput.addEventListener("change", async (e) => {
      if (!e.target.value) return;

      filters.category = e.target.value;
      const queryStrings = new URLSearchParams(filters).toString();

      properties = await getPropertiesLocation(queryStrings).then(
        (res) => res.properties
      );
      renderProperties(properties, markers);
    });
  };

  const renderProperties = (properties, layer) => {
    // Clear prev markers
    layer.clearLayers();

    properties.forEach((property) => {
      const { id, image, price, category, latitude, longitude, title } =
        property;

      const popupHTML = `
        <div class="flex gap-2 min-w-[16rem]">
          <div class="w-1/2">
            <p class="text-xs font-bold !m-0 text-sky-700">${category.name}</p>
            <h3 class="text-xs font-extrabold uppercase my-1">${title}</h3>
            <p class="text-xs !font-semibold !m-0 text-slate-700">
              Precio: ${price}
            </p>
  
            <a href="/properties/${id}" target="_blank" rel="noopener" class="block text-center rounded-lg px-2 py-1 mt-4 bg-sky-600 !text-white">Ver propiedad</a>
          </div>
          <img
            alt="Imagen de ${title}"
            src="${image ? `/uploads/${image}` : "/img/empty_photo.png"}"
            class="block object-cover object-center w-1/2"/>
        </div>
      `;

      const marker = new Leaflet.marker([latitude, longitude], {
        autoPan: true,
      })
        .addTo(map)
        .bindPopup(popupHTML);

      layer.addLayer(marker);
    });
  };

  Leaflet.tileLayer(layer, options).addTo(map);

  generateFilters();
  properties = await getPropertiesLocation().then((res) => res.properties);

  renderProperties(properties, markers);
})();
