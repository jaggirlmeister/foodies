let infoWindows = []; //array con todas las infoWindow

function initMap() {
    // The location of Uluru
    var segurola = {lat: -34.62245385, lng: -58.49699386};
    // The map, centered at Uluru
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
    var marker = new google.maps.Marker({position: segurola, map: map});
    map.setOptions({ minZoom: 3, maxZoom: 17 });

    fetchMarkers(map);
    console.log("yay");
}

const fetchMarkers = async (map) =>{
    try {
        const response = await fetch('assets/data/locations.json');
        const json = await response.json();
        console.log(json);
        json.forEach(marker => {
            console.log("que pasa");
            addMarker(map, marker);
        });
    } catch (error) {
        console.log(error);
    }
}

const addMarker = (map, marker) => { 
    //Destructuring de la info del marker
    const { lat, lng, name } = marker;

    //Armo la infowindow
    const contentString = `
    <div class='thisWindowHook'>
        <h3>${name}</h3>
    </div>`;
    
    const infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    infoWindows.push(infowindow);

    const markerItem = new google.maps.Marker(
        {
            position: { lat: lat, lng: lng },
            map: map,
        }
    );

    markerItem.setMap(map);

    markerItem.addListener('click', function() {
        infowindow.open(map, marker);
    });
    
}

