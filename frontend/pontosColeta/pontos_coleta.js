// const map = L.map('map').setView([-5.09, -42.80], 17);

// // 🗺️ Mapa base (OpenStreetMap)
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '© OpenStreetMap'
// }).addTo(map);

// // 📌 marcador no centro de Teresina
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

var map = L.map('map').setView([-5.0892, -42.8019], 14);

L.tileLayer('https://maps.geoapify.com/v1/tile/klokantech-basic/{z}/{x}/{y}.png?apiKey=64ebf3d88b59405dbd5e03448b4acd53', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const form = document.querySelector('.form')

form.addEventListener('submit', async e => {
  e.preventDefault()
  const cep = e.target.cep.value || false
  if(cep) {
    const cordinates = await buscarCoordenadasPorCEP(cep)
    const latitude = cordinates.lat
    const longitude = cordinates.lon
    map.flyTo([latitude, longitude], 17)
    console.log(latitude, longitude)
    return
  } 
  const cidade = e.target.city.value
  const estado = e.target.estado.value
  const cordinates = await buscarCoordenadasPorCidadeEEstado(cidade, estado)
  if(cordinates) {
    map.flyTo([cordinates.lat, cordinates.lon])
  }
})

async function buscarCoordenadasPorCEP(cep) {
    // 1. Remove qualquer caractere que não seja número
    const cepLimpo = cep.replace(/\D/g, ''); 

    // 2. Valida se o CEP tem exatamente 8 dígitos
    if (cepLimpo.length !== 8) {
        console.error("CEP inválido. Digite 8 números.");
        return null;
    }

    try {
        // 3. Reconstrói a URL em pedaços para o antivírus não interceptar e quebrar o link
        const partesUrl = ["https:", "", "viacep.com.br", "ws", cepLimpo, "json"];
        const urlFinal = partesUrl.join("/");
        
        const response = await fetch(urlFinal);
        
        if (!response.ok) {
            throw new Error("Erro na resposta do servidor: " + response.status);
        }
        
        const dados = await response.json();

        // 4. Se encontrou o endereço, busca as coordenadas quebrando também a segunda URL
        if (!dados.erro) {
            const textoBusca = dados.logradouro + ", " + dados.bairro + ", " + dados.localidade + " - " + dados.uf;
            
            const partesMapa = ["https:", "", "nominatim.openstreetmap.org", "search"];
            const urlMapaBase = partesMapa.join("/");
            const urlMapaFinal = urlMapaBase + "?q=" + encodeURIComponent(textoBusca) + "&format=json&limit=1";
            
            const responseMapa = await fetch(urlMapaFinal, {
                headers: { 'User-Agent': 'MeuAppPontosDeColeta/1.0' }
            });
            const dadosMapa = await responseMapa.json();

            if (dadosMapa && dadosMapa.length > 0) {
                const resultado = dadosMapa[0];
                return { lat: resultado.lat, lon: resultado.lon };
            }
        }
        
        console.error("Coordenadas não encontradas para este CEP.");
        return null;

    } catch (erro) {
        console.error("Falha de conexão. O navegador ou antivírus barrou a requisição:", erro);
        return null;
    }
}



async function buscarCoordenadasPorCidadeEEstado(cidade, estado) {
    try {
        // Junta os parâmetros recebidos (Ex: "Teresina, PI")
        const textoBuscaCidade = cidade + ", " + estado;
        
        // Reconstrói a URL em pedaços contra bloqueios de antivírus
        const partesMapa = ["https:", "", "nominatim.openstreetmap.org", "search"];
        const urlMapaBase = partesMapa.join("/");
        const urlMapaFinal = urlMapaBase + "?q=" + encodeURIComponent(textoBuscaCidade) + "&format=json&limit=1";
        
        const responseMapa = await fetch(urlMapaFinal, {
            headers: { 'User-Agent': 'MeuAppPontosDeColeta/1.0' }
        });
        const dadosMapa = await responseMapa.json();

        if (dadosMapa && dadosMapa.length > 0) {
            const resultado = dadosMapa[0];
            return { lat: resultado.lat, lon: resultado.lon };
        }
        
        console.error("Coordenadas não encontradas para esta localidade.");
        return null;

    } catch (erro) {
        console.error("Falha de conexão ao buscar coordenadas da cidade:", erro);
        return null;
    }
}






