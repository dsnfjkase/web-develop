	/* Authors :  Chase and Dan
		Spring 2025 */
		
		
	let geocoder;
	let Place;
	let myPos;
	let address;
	let map;

	let InfoWindow;
	let AdvancedMarkerElement;
	let PlaceAutocompleteElement;
	
	async function initMap() {

		// create the map
		const { Map } = await google.maps.importLibrary("maps");
		map = new Map(document.getElementById("maps"), {
			center: new google.maps.LatLng(44.9727, -93.23540000000003),
			zoom: 15,
			mapId: "HW3_DEMO2",
		});
	
		// Get the geocoder in place
		if (!geocoder) {
			const { Geocoder } = await google.maps.importLibrary("geocoding");
			geocoder = new Geocoder();
		}

		address = "Keller Hall, MN"; // This is the location we will search for using the geocoder in this example
		/* For your Homework assignment 3, you will have to create the code to return the values of the locations
		   on your schedule, dynamically (they can not be hard coded)
		*/
		const day = "Monday";
		const time = "11:15 AM";
	
		// https://developers.google.com/maps/documentation/javascript/geocoding
		geocoder.geocode({ "address" : address }, (results, status) => {
			if (status !== "OK") {
				if (status === "ZERO_RESULTS") {
					return;
				}
				console.error(
					"Geocoder was not successful for the following reason: " + status,
				);
			}
			
						
			return createMarker({
				position: results[0].geometry.location,
				windowContent: `${day}, ${time}`,
				markerContent: "",  // this is where to include a graphic marker - see comment below
			});
		});

		// See the following link for information on how to create an image to be used within an AdvancedMarkerElement
		// https://developers.google.com/maps/documentation/javascript/advanced-markers/graphic-markers#custom-graphic-file

		async function createMarker({ windowContent, markerContent, position }) {
			if (!InfoWindow) {
				const maps = await google.maps.importLibrary("maps");
				InfoWindow = maps.InfoWindow;
			}

			if (!AdvancedMarkerElement) {
				const marker = await google.maps.importLibrary("marker");
				AdvancedMarkerElement = marker.AdvancedMarkerElement;
			}

			// See the following link for discussion about advanced markers and adding a marker
			// https://developers.google.com/maps/documentation/javascript/advanced-markers/add-marker#javascript
			const marker = new AdvancedMarkerElement({
									map,
									position,
									// content: markerContent,
						   });

			if (windowContent) {
				const infoWindow = new InfoWindow({
						content: windowContent,
						maxWidth: 300,
					});
    
				marker.addListener("click", () => {
					infoWindow.close();
					infoWindow.setContent(windowContent);
					infoWindow.open(map, marker);
				});
			}
		} // end createMarker

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					myPos = {
					 lat: position.coords.latitude,
					 lng: position.coords.longitude,
					};
				},
				() => {
					console.warn("Current location unavailable");
				},
			);
		}
		
	} // end initMap
	
	initMap();