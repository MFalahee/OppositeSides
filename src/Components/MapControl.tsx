import * as React from 'react';
import { createImportSpecifier } from 'typescript';
import { MapControlProps } from '../Helpers/CustomTypesIndex';


const MapControl = (props: React.PropsWithChildren<MapControlProps>) => {
    const [map, setMap] = React.useState<google.maps.Map>()
    const ref = React.useRef<HTMLDivElement>()


    const overlaySpot = (direction: string) => { 
        // this is triggering an error because google isn't defined when this is called?
        let temp : google.maps.ControlPosition;
        let output : google.maps.ControlPosition;
        switch (direction) {
            case 'bl' : output = window.google.maps.ControlPosition["BOTTOM_LEFT"]; break;
            case 'bc' : output = window.google.maps.ControlPosition["BOTTOM_CENTER"];break;;
            case 'br' : output = window.google.maps.ControlPosition["BOTTOM_RIGHT"];break;;
            case 'tl' : output = window.google.maps.ControlPosition["TOP_LEFT"];break;;
            case 'tc' : output = window.google.maps.ControlPosition["TOP_CENTER"];break;;
            case 'tr' : output = window.google.maps.ControlPosition["TOP_RIGHT"];break;;
            case 'lc' : output = window.google.maps.ControlPosition["LEFT_CENTER"];break;;
            case 'rc' : output = window.google.maps.ControlPosition["RIGHT_CENTER"];break;;
            case 'bc' : output = window.google.maps.ControlPosition["BOTTOM_CENTER"];break;;
            default: output =  window.google.maps.ControlPosition["BOTTOM_CENTER"];
        }
        return output;
    }

    React.useEffect(() => { 
      console.log("MapControl: useEffect")
      console.log("Component mounted")
  }, []);

    React.useEffect(() => { 
        console.log("MapControl: useEffect")
        console.log(overlaySpot(props.position))
    }, [props.position]);

    React.useEffect(() => {
      //this uses the google maps api to load the map only when the ref has changed
      if (ref.current && !map) {
          setMap(new window.google.maps.Map(ref.current, {}))
          }
      }, [ref, map])

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