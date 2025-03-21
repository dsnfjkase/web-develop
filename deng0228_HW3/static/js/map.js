let geocoder;
let map;
let directionsService;
let directionsRenderer;
let InfoWindow;
let AdvancedMarkerElement;

async function initMap() {
    const { Map, TravelMode } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("maps"), {
        center: new google.maps.LatLng(44.9727, -93.2354),
        zoom: 14,
        mapId: "HW3_DEMO2",
    });

    if (!geocoder) {
        const { Geocoder } = await google.maps.importLibrary("geocoding");
        geocoder = new Geocoder();
    }

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    directionsRenderer.setPanel(document.getElementById("directions-panel"));

    const rows = document.querySelectorAll(".table2 tbody tr");
    let locations = [];

    rows.forEach(row => {
        const columns = row.querySelectorAll("th");
        if (columns.length >= 4) {
            const day = columns[0].innerText.trim();
            const eventName = columns[1].innerText.trim();
            const eventTime = columns[2].innerText.trim();
            const eventLocation = columns[3].childNodes[0].textContent.trim(); 

            locations.push({ day, eventName, eventTime, eventLocation });
        }
    });

    locations.forEach(event => {
        geocoder.geocode({ "address": event.eventLocation }, (results, status) => {
            if (status === "OK" && results[0]) {
                createMarker({
                    position: results[0].geometry.location,
                    windowContent: `<b>${event.eventName}</b><br>${event.day}, ${event.eventTime}<br>${event.eventLocation}`,
                    markerImage: "img/Goldy.png"
                }); 
            } else {
                console.error(`Geocoding failed for ${event.eventLocation}: ${status}`);
            }
        });
    });

    async function createMarker({ windowContent, markerImage, position }) {
        if (!InfoWindow) {
            const maps = await google.maps.importLibrary("maps");
            InfoWindow = maps.InfoWindow;
        }

        if (!AdvancedMarkerElement) {
            const markerLibrary = await google.maps.importLibrary("marker");
            AdvancedMarkerElement = markerLibrary.AdvancedMarkerElement;
        }

        const img = document.createElement("img");
        img.src = markerImage;
        img.style.width = "30px";
        img.style.height = "30px";

        const marker = new AdvancedMarkerElement({
            map,
            position,
            gmpClickable: true,
            title: windowContent,
            content: img, 
        });

        const infoWindow = new InfoWindow({
            content: windowContent,
            maxWidth: 300,
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    }

    function getUserLocationAndRoute() {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }
      
        navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            const destinationInput = document.getElementById("destination");
            if (!destinationInput) {
                alert("Destination input field not found!");
                return;
            }

            const destination = destinationInput.value.trim();
            if (!destination) {
                alert("Please enter a destination.");
                return;
            }

            const travelModeElement = document.querySelector('input[name="travelMode"]:checked');
            if (!travelModeElement) {
                alert("Please select a travel mode.");
                return;
            }

            const travelMode = travelModeElement.value.toUpperCase();
            calculateAndDisplayRoute(userLocation, destination, travelMode);
        }, error => {
            console.error("Geolocation error:", error);
            alert("Geolocation failed. Please allow location access.");
        });
    }

    function calculateAndDisplayRoute(origin, destination, travelMode) {
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode[travelMode]
            },
            (response, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(response);
                    document.getElementById("directions-panel").style.display = "block";
                } else {
                    alert("Could not find a route to the destination.");
                }
            }
        );
    }

    document.getElementById("goButton").addEventListener("click", getUserLocationAndRoute);
}

initMap();
