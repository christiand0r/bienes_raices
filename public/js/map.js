(() => {
  // src/js/map.js
  var leaflet = L;
  var formMap = {
    address: "LongLabel",
    latitude: "lat",
    longitude: "lng",
    street: "Address"
  };
  var createMap = (id = String, coords = Array, zoom = Number) => {
    const $container = document.getElementById(id);
    if (!$container)
      return null;
    return leaflet.map($container).setView(coords, zoom);
  };
  var createMarker = (map = leaflet.Map, coords = Array, options = leaflet.Marker, popup = String) => {
    const marker = new leaflet.marker(coords, options);
    return !popup ? marker.addTo(map) : marker.addTo(map).bindPopup(popup).openPopup();
  };
  var positionToString = (position, callback) => {
    const { Geocoding } = leaflet.esri;
    const geocodeService = Geocoding.geocodeService();
    geocodeService.reverse().latlng(position, 13).run((error, result) => {
      const { address, latlng: coords } = result;
      callback(address, coords);
    });
  };
  var assingDataToForm = (mapBinding = Object, locationData = Object) => {
    Object.keys(mapBinding).forEach((key) => {
      const $input = document.querySelector(`#${key}`);
      if (!$input)
        return console.warn(`The input with id #${key} don't exist`);
      $input.value = locationData?.[mapBinding[key]] ?? "";
    });
  };
  var getPosition = (options = {}) => {
    const { geolocation } = window.navigator;
    return new Promise((resolve, reject) => {
      const success = (pos) => {
        const { accuracy, latitude, longitude } = pos.coords;
        resolve({
          accuracy,
          latitude,
          longitude,
          error: false,
          msg: "Position obtained succesfully"
        });
      };
      const error = (err) => {
        reject({
          accuracy: 0,
          latitude: null,
          longitude: null,
          error: true,
          msg: `Error trying to get position(${err.code}): ${err.message}`
        });
      };
      geolocation.getCurrentPosition(success, error, options);
    });
  };
  (async function() {
    const position = await getPosition();
    if (position.error)
      return;
    const lat = document.querySelector("input#latitude").value || position.latitude;
    const lng = document.querySelector("input#longitude").value || position.longitude;
    const map = createMap("property-location", [lat, lng], 12);
    if (!map)
      return;
    const layer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const options = {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    };
    leaflet.tileLayer(layer, options).addTo(map);
    const marker = createMarker(
      map,
      [lat, lng],
      {
        draggable: true,
        autoPan: true
      },
      "Arrastra para cambiar la ubicaci\xF3n"
    );
    marker.on("moveend", (e) => {
      const marker2 = e.target;
      const position2 = marker2.getLatLng();
      map.panTo(position2);
      positionToString(position2, (address, coords) => {
        const { LongLabel } = address;
        marker2.bindPopup(LongLabel).openPopup();
        assingDataToForm(formMap, { ...address, ...coords });
      });
    });
  })();
})();
