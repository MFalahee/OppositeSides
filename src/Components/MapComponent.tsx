import * as React from 'react'

const defaultStyles = {
    width: '100%',
    height: '100%',
    visible: true,
}

const MapComponent : React.FC<{}> = () => {
    const [map, setMap] = React.useState<google.maps.Map>()
    const ref = React.useRef<HTMLDivElement>(null)
    const [style, setStyle] = React.useState(defaultStyles)

    React.useEffect(() => {
        //this uses the google maps api to load the map only when the ref has changed
        if (ref.current && !map) {
            console.log('inside if')
            console.log(window.google.maps)
            console.log(ref.current)
            setMap(new window.google.maps.Map(ref.current, {}))
            }
        }, [ref, map])

       
    return <div ref={ref} style={style} />;
}

export default MapComponent