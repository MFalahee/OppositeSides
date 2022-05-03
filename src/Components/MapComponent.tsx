import * as React from 'react'
import { isLatLngLiteral } from '@googlemaps/typescript-guards'
import { createCustomEqual } from "fast-equals";



interface MapProps extends google.maps.MapOptions {
    style: {[key: string]: string}
    onClick?: (event: google.maps.MapMouseEvent) => void
    onIdle?: (map: google.maps.Map) => void
}

/*
//I don't know exactly how deepCompareEquals works yet.
useEffect info : https://reactjs.org/docs/hooks-effect.html
custom hooks info: https://reactjs.org/docs/hooks-custom.html
Copied from the google maps docs reference: https://developers.google.com/maps/documentation/javascript/react-maps

the gist (I think) of these functions is that they are doing deeper comparisons than the useEffect function normally does between component renders
This allows for the map to update when the map changes

I need to take a closer look at this stuff to really learn this type of fix and the limitations of useEffect
*/
const deepCompareEqualsForMaps = createCustomEqual(
    (deepEqual) => (a: any, b: any) => {
      if (
        isLatLngLiteral(a) ||
        a instanceof google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof google.maps.LatLng
      ) {
        return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
      }
  
      // TODO extend to other types
  
      // use fast-equals for other objects
      return deepEqual(a, b);
    }
  );
  
  function useDeepCompareMemoize(value: any) {
    const ref = React.useRef();
  
    if (!deepCompareEqualsForMaps(value, ref.current)) {
      ref.current = value;
    }
  
    return ref.current;
  }
  
  function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
  ) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
  }

const MapComponent : React.FC<MapProps> = ({
    onClick,
    onIdle,
    style,
    center,
    zoom,
    children,
    ...options
}) => {
    const [map, setMap] = React.useState<google.maps.Map>()
    const ref = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
        //this uses the google maps api to load the map only when the ref has changed
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}))
            }
        }, [ref, map])

        useDeepCompareEffectForMaps(() => {
            if (map) {
                map.setCenter(center)
                map.setZoom(zoom)
                map.setOptions(options)
            }
        }, [map, center, zoom, options])


        React.useEffect(() => {
            if (map) {
              ["click", "idle"].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
              );
        
              if (onClick) {
                map.addListener("click", onClick);
              }
        
              if (onIdle) {
                map.addListener("idle", () => onIdle(map));
              }
            }
          }, [map, onClick, onIdle]);

          
    return ( 
    <>
    <div ref={ref} style={style}/>
    {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          //sets the map prop on the child component
            return React.cloneElement(child, { map })
        }
    })}
    </>)
}

export default MapComponent