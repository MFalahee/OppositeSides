import * as React from 'react'
import { ButtonProps } from '../Helpers/CustomTypesIndex'


//google.maps.Map can be used to change the lng and lat values based on the user's location
//this shouldn't be as hard as setting up the map itself! so that's a plus


const GeolocateButton : React.FC<ButtonProps> = (props) => {
    return (

        props.visible ? 
        //this is the button that will be rendered
        //button should take onClick and call the geolocate function
        //no dom manipulation/state manipulation needs to happen here I think
        //Simply need to send new coords to map which should be passed to the button already
        <button onClick={props.onClick}>
            Take me to me, please.
        </button> : 
        <></>
    )
}

export default GeolocateButton;