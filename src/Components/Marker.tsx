import * as React from 'react';

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>()


    //sets a marker on the map, or updates it. Markers get cleared on unmount
    //this component can return null because google.maps.Map is handling the DOM manipulation


    React.useEffect(() => {
        if (!marker){
            setMarker(new google.maps.Marker());
        }
        //remove marker from the map when the component is unmounted
        return () => {
            if (marker){
                marker.setMap(null);
            }
        }
        }, [marker])

        React.useEffect(() => {
            if (marker){
                marker.setOptions(options);
            }
            }, [marker, options])

        return null;
}

export default Marker;