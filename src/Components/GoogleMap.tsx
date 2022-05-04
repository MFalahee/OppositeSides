import * as React from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { MapComponent, Marker, GeolocateButton, Weather, ErrorBoundary, AntipodeButton } from './index';
import { WrapperProps } from '../Helpers/CustomTypesIndex'
/*

Weather will be pulled into this component from Weather.tsx
Not sure what to do with that yet

*/

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

let infoWindow: google.maps.InfoWindow;
let map: google.maps.Map;

const GoogleMap: React.VFC < WrapperProps > = ({
        api
    }) => {
        const [clicks, setClicks] = React.useState <google.maps.LatLng[]> ([]);
        const [zoom, setZoom] = React.useState(4);
        const [center, setCenter] = React.useState <google.maps.LatLngLiteral> ({
            lat: -25.344,
            lng: 131.031
        });
        const [buttonToggle, setButtonToggle] = React.useState(true);
        const [weather, setWeather] = React.useState <string> ('');
        const [antipode, setAntipode] = React.useState <google.maps.LatLngLiteral> ({
            lat: 0,
            lng: 0
        });
        const [style, setStyle] = React.useState({
            width: '100%',
            height: '100%',
            flexGrow: '1',
        });
  
        // infoWindow = new google.maps.InfoWindow();
        function initInfoWindow() {
            infoWindow = new google.maps.InfoWindow()
         }

        const onClick = (event: google.maps.MapMouseEvent) => {
            console.log('onClick')
            //google says to avoid directly mutating state
            setClicks([...clicks, event.latLng]);
        };

        function handleLocationError(
            browserHasGeolocation: boolean,
            infoWindow: google.maps.InfoWindow,
            pos: google.maps.LatLng,
        ) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }

        // React.useEffect(() => {
        //     console.log('LOG EFFECT CALLED')
        //     console.log('ANTIPODE')
        //     console.log(antipode)
        //     console.log('CENTER')
        //     console.log(center)
        // }, [antipode, center])

        // I want to add a glide effect to this function
        // I'd like to have the map smoothly slide to the user's location from the center of the map
        const geolocate = (event: React.MouseEvent) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                    const {
                        latitude,
                        longitude
                    } = position.coords;

                    infoWindow = new google.maps.InfoWindow()
                    infoWindow.setPosition({
                        lat: latitude,
                        lng: longitude
                    });
                    infoWindow.setContent('Location found.');
                    infoWindow.open(map);
                    setCenter({
                        lat: latitude,
                        lng: longitude
                    });

                }, () => {
                    handleLocationError(true, infoWindow, map.getCenter()!)
                });
            } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter()!)
            }
        }


        const findAntipode = (event: React.MouseEvent) => {
            let antipodeLngSuppAng = 180 - Math.abs(center.lng)
            let antipodeLng = (center.lng > 0 ? -1 : 1) * antipodeLngSuppAng
            let antipodeLat = center.lat * -1
            setAntipode({ 
                lat: antipodeLat,
                lng: antipodeLng
            })
        }

        const onIdle = (map: google.maps.Map) => {
            console.log('onIdle')
            setZoom(map.getZoom());
            setCenter(map.getCenter().toJSON());
        }

    

    if (api === ''){
        return <div>Not Chill</div>;
    } else {
        // if we have an api key, try to render the map
        // infoWindow needs to be created AFTER the wrapper is mounted so google obj is available
        return (
            <div id="wrapperwrapper"style={{display: "flex", height:"100vh", width:"100vw"}}>
                <Wrapper apiKey={api} render={render}>
                    <MapComponent 
                        onClick={onClick} 
                        onIdle={onIdle} 
                        center={center} 
                        zoom={zoom} 
                        style={style}>
                        <GeolocateButton onClick={geolocate} visible={buttonToggle}/>
                        <AntipodeButton onClick={findAntipode} visible={!(buttonToggle)}/>
                        {clicks.map((latLng, i) => (
                            <Marker key={i} position={latLng} />
                        ))}
                    </MapComponent>
                </Wrapper>
            </div>
        )
    } 
}


export default GoogleMap
/*

 
*/

