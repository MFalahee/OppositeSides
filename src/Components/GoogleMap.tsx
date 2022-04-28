// I'm going to copy the code from the tutorial here for now
// It won't work at all until I setup the node backend with my api key stored there.
import * as React from 'react'

import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { MapComponent, Marker, GeolocateButton } from './index';
import { isPropertySignature } from 'typescript';


const render = (status: Status) => {
    return <h1>{status}</h1>;
};

interface WrapperProps{
    api: string;
}

const GoogleMap: React.VFC<WrapperProps> = ({api}) => {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(4);
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({ lat: -25.344, lng: 131.031 });
    const [style, setStyle] = React.useState({
            width: '100%',
            height: '100%',
            flexGrow: '1',
    })

    const onClick = (event: google.maps.MapMouseEvent) => { 
        console.log('onClick')
        //google says to avoid directly mutating state
        setClicks([...clicks, event.latLng]);
    };

    const geolocate = (event: React.MouseEvent) => {
        
    }

    const onIdle = (map: google.maps.Map) => {
        console.log('onIdle')
        setZoom(map.getZoom());
        setCenter(map.getCenter().toJSON());
    }
    
    if (api === ''){
        return <div>not set</div>;
    } else {
        return (
            <div id="wrapperwrapper"style={{display: "flex", height:"100vh", width:"100vw"}}>
                <Wrapper apiKey={api} render={render}>
                    <MapComponent 
                        onClick={onClick} 
                        onIdle={onIdle} 
                        center={center} 
                        zoom={zoom} 
                        style={style}>
                        <GeolocateButton />
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

