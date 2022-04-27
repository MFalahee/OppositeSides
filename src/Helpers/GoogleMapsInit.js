import {
    Loader
} from '@googlemaps/js-api-loader'

export default function InitMap(things) {
    console.log('Things: ', things)
    if (things === null) {

    } else {
        const loader = new Loader({
            apiKey: things,
            version: 'weekly',
            libraries: ['places']
        });
    
        loader.load().then((google) => {
            // The Google Maps API is ready!
            console.log(google)
            console.log("Google Maps API is ready!")

            // Now you can use all Google Maps services
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: -34.397,
                    lng: 150.644
                },
                zoom: 8
                
            });
        });
    }
}