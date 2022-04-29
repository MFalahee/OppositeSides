import * as React from 'react'



//google.maps.Map can be used to change the lng and lat values based on the user's location
//this shouldn't be as hard as setting up the map itself! so that's a plus

//need to make buttonProps interface that 
interface ButtonProps  {
    onClick?: (event: React.MouseEvent) => void
}

const GeolocateButton : React.FC<ButtonProps> = ({onClick}) => {
    return (
        //this is the button that will be rendered
        //button should take onClick and call the geolocate function
        //no dom manipulation/state manipulation needs to happen here I think
        //Simply need to send new coords to map which should be passed to the button already
        <button onClick={onClick}>
            Leggo my eggo
        </button>
    )
}

export default GeolocateButton;