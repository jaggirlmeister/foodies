let infoWindows = []; 

function initMap() {

    var segurola = {lat: -34.62245385, lng: -58.49699386};
    const map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: 11, //Zoom
            center: segurola, //Centrado de mapa
            streetViewControl: false, //Desactivo el street view (chaboncito)
            fullscreenControl: false, //Desactivo el boton de fullscreeen
            mapTypeControlOptions: { //Desactivo los tipos de terreno del mapa (satellite y terrain)
                mapTypeIds: []
            },
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER //ubico los controles de zoom
            }
        });
    // The marker, positioned at Uluru
    map.setOptions({ minZoom: 3, maxZoom: 17 });

    fetchMarkers(map);

}

const fetchMarkers = async (map) =>{
    try {
        const response = await fetch('assets/data/locations.json');
        const json = await response.json();
        console.log(json);
        json.forEach(marker => {
            addMarker(map, marker);
        });
    } catch (error) {
        console.log(error);
    }
}

const addMarker = (map, marker) => { 


    const { lat, lng, name, address } = marker;

    var contentString = `
    <div class='thisWindowHook'>
        <h3>${name}</h3>
        <p>${address}</p>
    </div>`;

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    infoWindows.push(infowindow);

    var markerItem = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
    });

    markerItem.addListener('click', function() {
        infoWindows.forEach(infowindow => {
            infowindow.close();
        })
        infowindow.open(map, markerItem);
    });  
    
}

