// I'm going to copy the code from the tutorial here for now
// It won't work at all until I setup the node backend with my api key stored there.
import {
    React,
    useState,
    useEffect,
    useRef
} from 'react'

import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { MapComponent } from './index';


  
const GoogleMap = (props) => {
    const [status, setStatus] = useState()
    useEffect(() => {
        console.log('GMap UE')
        setStatus(Status)
    }, []);
    
    const render = (status) => {
        return <h1>{status}</h1>
    }
    // Initialize and add the map
    if (props.ApiKey != '') {
        return (
            <Wrapper apiKey={props.ApiKey} render={render}>
                <MapComponent />
            </Wrapper>
        )
    } else {
        console.log('Google Map: No API Key')
        return null
    }
}

export default GoogleMap
/*

 
*/