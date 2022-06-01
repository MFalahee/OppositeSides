import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { MapComponent, Marker} from './index';
import { WrapperProps, ControlOptions } from '../Helpers/CustomTypesIndex'

const render = (status: Status) => {
    return <h1>{status}</h1>;
};

let infoWindow: google.maps.InfoWindow;
let map: google.maps.Map;
let ui = true;

// const styleElement = (styles: Object, element: HTMLElement) => { 
//     for (let key in styles) {
//         element.style[key] = styles[key];
//     }
// }

const GoogleMap: React.FC < WrapperProps > = ({
        api
    }) => {
        const [clicks, setClicks] = React.useState <google.maps.LatLng[]> ([]);
        const [zoom, setZoom] = React.useState(4);
        const [center, setCenter] = React.useState <google.maps.LatLngLiteral> ({
            lat: -25.344,
            lng: 131.031
        });
        const [antipode, setAntipode] = React.useState <google.maps.LatLngLiteral> ({
            lat: 0,
            lng: 0
        });
        const [style, setStyle] = React.useState({
            width: '100%',
            height: '100%',
            flexGrow: '1',
        });

        const [controlOptions, setControlOptions] = React.useState<ControlOptions>({
                controlLabel: 'Find my location',
                controlClick: () => { geolocate(map) }
            });
        
       
        const onClick = (event: google.maps.MapMouseEvent) => {
            // console.log('onClick')
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

       const geolocate = (map: google.maps.Map) => {
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
                   infoWindow.open();


                   // I want to add a glide effect to this function
                   // I'd like to have the map smoothly slide to the user's location from the center of the map
                   setCenter({
                       lat: latitude,
                       lng: longitude
                   });
                   flipButton();
               }, () => {
                   handleLocationError(true, infoWindow, map.getCenter() !)
               });
           } else {
               // Browser doesn't support Geolocation
               handleLocationError(false, infoWindow, map.getCenter() !)
           }
       }


        const findAntipode = (event: React.MouseEvent<Element, MouseEvent>) => {
            let antipodeLngSuppAng = 180 - Math.abs(center.lng)
            let antipodeLng = (center.lng > 0 ? -1 : 1) * antipodeLngSuppAng
            let antipodeLat = center.lat * -1
            setAntipode({ 
                lat: antipodeLat,
                lng: antipodeLng
            })

            flipButton()
        }

        const onIdle = (map: google.maps.Map) => {
            // console.log('onIdle')
            setZoom(map.getZoom());
            setCenter(map.getCenter().toJSON());
        }

        const overlaySpot = (direction: string) => { 
            // this is triggering an error because google isn't defined when this is called?
            let output : google.maps.ControlPosition;
            switch (direction) {
                case 'bl' : output = window.google.maps.ControlPosition["BOTTOM_LEFT"]; break;
                case 'bc' : output = window.google.maps.ControlPosition["BOTTOM_CENTER"];break;
                case 'br' : output = window.google.maps.ControlPosition["BOTTOM_RIGHT"];break;
                case 'tl' : output = window.google.maps.ControlPosition["TOP_LEFT"];break;
                case 'tc' : output = window.google.maps.ControlPosition["TOP_CENTER"];break;
                case 'tr' : output = window.google.maps.ControlPosition["TOP_RIGHT"];break;
                case 'lc' : output = window.google.maps.ControlPosition["LEFT_CENTER"];break;
                case 'rc' : output = window.google.maps.ControlPosition["RIGHT_CENTER"];break;
                case 'bc' : output = window.google.maps.ControlPosition["BOTTOM_CENTER"];break;
                default: output =  window.google.maps.ControlPosition["BOTTOM_CENTER"];
            }
            return output;
        }

        const createControlButton = (controls: Element, map: google.maps.Map, controlOptions: ControlOptions) => { 
            const mapButton = document.createElement('button');
            mapButton.className = "map-button";
            mapButton.innerHTML = controlOptions.controlLabel;
            mapButton.addEventListener('click', (event) => controlOptions.controlClick(event));
            controls.appendChild(mapButton);
        }

        const flipButton = () => { 
            const activeButton = document.querySelector('.map-button');
            if (activeButton) {
                if (activeButton.innerHTML === 'Find my location') {
                    setControlOptions({
                        controlLabel: 'Show me my antipode!',
                        controlClick: findAntipode
                    })
                } else {
                    setControlOptions({
                        controlLabel: 'Find my location',
                        controlClick: geolocate
                    })
                }
            }
        }

        /*
        this renders the controls over the map
        */

        const handleOnLoad = (map: google.maps.Map) => {
            const controls = document.createElement('div');
            if (map) {
                createControlButton(controls, map, controlOptions)
                map.controls[overlaySpot('tc')].push(controls);

            }
        }

        React.useEffect(() => {
            const button = document.querySelector('.map-button')
            if (button) {
                console.log(button)
                button.innerHTML = controlOptions.controlLabel;
            }
        }, [controlOptions])


    if (api === ''){
        return <div>Backend isn't live.</div>;
    } else {
        return (
            <div className="wrapperwrapper"style={{height:"85vh", width:"67vw"}}>
                <Wrapper apiKey={api} render={render}>
                    <MapComponent 
                        onClick={onClick} 
                        onIdle={onIdle}
                        center={center} 
                        zoom={zoom} 
                        style={style}
                        disableDefaultUI={ui}
                        zoomControl= {true}
                        streetViewControl= {true}
                        fullscreenControl= {true}
                        rotateControl= {true}
                        onLoad={handleOnLoad}
                        >
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

