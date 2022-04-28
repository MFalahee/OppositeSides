// I'm going to copy the code from the tutorial here for now
// It won't work at all until I setup the node backend with my api key stored there.
import * as React from 'react'

import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { isLatLngLiteral } from '@googlemaps/typescript-guards'
import { MapComponent } from './index';
import { isPropertySignature } from 'typescript';


const render = (status: Status) => {
    return <h1>{status}</h1>;
};

interface WrapperProps{
    api: string;
}

const GoogleMap: React.VFC<WrapperProps> = ({api}) => {
    // const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(4);
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });
    const [style, setStyle] = React.useState({})

    if (api != '') {
        console.log(api)
        return (
            <div style={{display: "flex", height:"100vh", width:"100vw"}}>
                <Wrapper apiKey={api} render={render}>
                    <MapComponent center={center} zoom={zoom} style={style} />
                </Wrapper>
            </div>
        )
    } else {
        return (
            <h1>waiting on API Key.</h1>
        )
    }
  
}


export default GoogleMap
/*

 
*/

