const map = L.map('map').setView([-5.09, -42.80], 17);

// 🗺️ Mapa base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// 📌 marcador no centro de Teresina
// L.marker([-5.09, -42.80])
//   .addTo(map)
//   .bindPopup("Teresina - PI")
//   .openPopup();

// // 🖱️ clicar no mapa mostra coordenadas
// map.on('click', function(e) {
//   const lat = e.latlng.lat;
//   const lng = e.latlng.lng;

//   L.popup()
//     .setLatLng(e.latlng)
//     .setContent("Latitude: " + lat + "<br>Longitude: " + lng)
//     .openOn(map);
// });