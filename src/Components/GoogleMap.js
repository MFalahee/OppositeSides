// I'm going to copy the code from the tutorial here for now
// It won't work at all until I setup the node backend with my api key stored there.

export default function GoogleMap(props) {




    // Initialize and add the map
    function initMap() {
        // The location of Uluru
        const uluru = {
            lat: -25.344,
            lng: 131.031
        };
        // The map, centered at Uluru
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 4,
            center: uluru,
        });
        // The marker, positioned at Uluru
        const marker = new google.maps.Marker({
            position: uluru,
            map: map,
        });
    }

    // The location of Uluru
    const uluru = {
        lat: -25.344,
        lng: 131.031
    };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });

    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });

}