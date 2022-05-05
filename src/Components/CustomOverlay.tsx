import * as React from 'react';


const CustomOverlay: React.FC<google.maps.OverlayView> = (props) => { 
    const [bounds, setBounds] = React.useState<google.maps.LatLngBounds>()
    const ref = React.useRef<HTMLDivElement>(null)
    
    return (
        <></>
    )

}


export default CustomOverlay;