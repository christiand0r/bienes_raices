// @Instance leaflet
const leaflet = L;

(function () {
  const latitude = document.getElementById("lat").value;
  const longitude = document.getElementById("lng").value;

  const map = L.map("map").setView([latitude, longitude], 16);
  const marker = new leaflet.marker([latitude, longitude], { autoPan: true });

  // Add layer map for render
  const layer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const options = {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  };

  marker.addTo(map);
  leaflet.tileLayer(layer, options).addTo(map);
})();
