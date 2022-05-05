import * as React from 'react';
import { MapControlProps } from '../Helpers/CustomTypesIndex';


const MapControl = (props: React.PropsWithChildren<MapControlProps>) => {
    const [map, setMap] = React.useState<google.maps.Map>()
    const ref = React.useRef<HTMLDivElement>()

    React.useEffect(() => { 
        console.log("MapControl: useEffect")
    }, []);

    React.useEffect(() => {
      if (map && ref) {
        map.controls[window.google.maps.ControlPosition[props.position]].push(
          ref.current
        );
      }
    }, [map, ref]);
    return (map ? <div ref={ref}>{props.children}</div> : <></>);
  };


  export default MapControl