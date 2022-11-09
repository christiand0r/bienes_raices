// @Instance leaflet
const leaflet = L;

// This map use the "name" attribute of input as key and the value is the key of object result for call the geocoding method
const formMap = {
  address: "LongLabel",
  latitude: "lat",
  longitude: "lng",
  street: "Address",
};

// @Utils
const createMap = (id = String, coords = Array, zoom = Number) => {
  const $container = document.getElementById(id);

  if (!$container) return null;

  return leaflet.map($container).setView(coords, zoom);
};

const createMarker = (
  map = leaflet.Map,
  coords = Array,
  options = leaflet.Marker,
  popup = String
) => {
  const marker = new leaflet.marker(coords, options);

  return !popup
    ? marker.addTo(map)
    : marker.addTo(map).bindPopup(popup).openPopup();
};

const positionToString = (position, callback) => {
  const { Geocoding } = leaflet.esri;
  const geocodeService = Geocoding.geocodeService();

  geocodeService
    .reverse()
    .latlng(position, 13)
    .run((error, result) => {
      const { address, latlng: coords } = result;

      callback(address, coords);
    });
};

const assingDataToForm = (mapBinding = Object, locationData = Object) => {
  Object.keys(mapBinding).forEach((key) => {
    const $input = document.querySelector(`#${key}`);

    if (!$input) return console.warn(`The input with id #${key} don't exist`);

    $input.value = locationData?.[mapBinding[key]] ?? "";
  });
};

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

// @Autoinkove the function
(async function () {
  const position = await getPosition();

  if (position.error) return;

  const lat =
    document.querySelector("input#latitude").value || position.latitude;
  const lng =
    document.querySelector("input#longitude").value || position.longitude;

  const map = createMap("property-location", [lat, lng], 12);

  if (!map) return;

  // Add layer map for render
  const layer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const options = {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  };
  leaflet.tileLayer(layer, options).addTo(map);

  // Create draggable marker
  const marker = createMarker(
    map,
    [lat, lng],
    {
      draggable: true,
      autoPan: true,
    },
    "Arrastra para cambiar la ubicación"
  );

  // Assign event to detect marker movement
  marker.on("moveend", (e) => {
    const marker = e.target;
    const position = marker.getLatLng();

    map.panTo(position);

    // Transform the coordinates to string address
    positionToString(position, (address, coords) => {
      const { LongLabel } = address;
      marker.bindPopup(LongLabel).openPopup();

      assingDataToForm(formMap, { ...address, ...coords });
    });
  });
})();
