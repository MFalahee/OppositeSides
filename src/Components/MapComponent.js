import { React, useState, useEffect, useRef } from 'react'

const defaultStyles = {
    width: '100%',
    height: '100%',
    zoom: 8,
    center: {
        lat: 37.773972,
        lng: -122.431297
    }
}

const MapComponent = props => {
    const [map, setMap] = useState()
    const ref = useRef(null)
    const [style, setStyle] = useState(defaultStyles)

    useEffect(() => {
        console.log('Map Component Mounted')
        console.log(map)
        //this uses the google maps api to load the map only when the ref has changed
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}))
            }
        }, [ref, map])

       
    return <div ref={ref} style={style} />;
}

export default MapComponent