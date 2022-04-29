import * as React from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { MapComponent, Marker, GeolocateButton } from './index';
import { isPropertySignature } from 'typescript';


const render = (status: Status) => {
    return <h1>{status}</h1>;
};

interface WrapperProps {
    api: string;
}

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
        const [style, setStyle] = React.useState({
            width: '100%',
            height: '100%',
            flexGrow: '1',
        });
  
        // infoWindow = new google.maps.InfoWindow();

        const onClick = (event: google.maps.MapMouseEvent) => {
            console.log('onClick')
            //google says to avoid directly mutating state
            setClicks([...clicks, event.latLng]);
        };

        function handleLocationError(
            browserHasGeolocation: boolean,
            infoWindow: google.maps.InfoWindow,
            pos: google.maps.LatLng,
            /*potential issue */

        ) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }

        const geolocate = (event: React.MouseEvent) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                    const {
                        latitude,
                        longitude
                    } = position.coords;

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

        const onIdle = (map: google.maps.Map) => {
            console.log('onIdle')
            setZoom(map.getZoom());
            setCenter(map.getCenter().toJSON());
        }

    if (api === ''){
        return <div>not set</div>;
    } else {

        infoWindow = new google.maps.InfoWindow();
        return (
            <div id="wrapperwrapper"style={{display: "flex", height:"100vh", width:"100vw"}}>
                <Wrapper apiKey={api} render={render}>
                    <MapComponent 
                        onClick={onClick} 
                        onIdle={onIdle} 
                        center={center} 
                        zoom={zoom} 
                        style={style}>
                        <GeolocateButton onClick={geolocate}/>
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

