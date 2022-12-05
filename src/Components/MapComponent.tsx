import * as React from 'react'
// @ts-ignore
import { createCustomEqual } from 'fast-equals'
import { MapProps } from '../../custom'
// @ts-ignore
import { isLatLngLiteral } from '@googlemaps/typescript-guards'

/*
I don't know exactly how deepCompareEquals works yet.
useEffect info : https://reactjs.org/docs/hooks-effect.html
custom hooks info: https://reactjs.org/docs/hooks-custom.html
Copied from the google maps docs reference: https://developers.google.com/maps/documentation/javascript/react-maps
*/

const MapComponent: React.FC<MapProps> = ({ onClick, onIdle, style, center, zoom, children, onLoad, ...options }) => {
  const [map, setMap] = React.useState<google.maps.Map>()
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: new google.maps.LatLng(0, 0)
        })
      )
    }
  }, [ref, map])

  React.useEffect(() => {
    if (map) {
      try {
        onLoad(map)
      } catch (error) {
        console.log(error)
      }
    }
  }, [map, onLoad])

  // google maps api docs supplied these next few functions
  const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a: any, b: any) => {
    if (isLatLngLiteral(a) || a instanceof google.maps.LatLng || isLatLngLiteral(b) || b instanceof google.maps.LatLng) {
      return new google.maps.LatLng(a).equals(new google.maps.LatLng(b))
    }
    return deepEqual(a, b)
  })

  function useDeepCompareMemoize(value: any) {
    const ref = React.useRef()
    if (!deepCompareEqualsForMaps(value, ref.current)) {
      ref.current = value
    }
    return ref.current
  }

  function useDeepCompareEffectForMaps(callback: React.EffectCallback, dependencies: any[]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize))
  }

  useDeepCompareEffectForMaps(() => {
    if (map) {
      if (center && center !== null) map.setCenter(center)
      if (zoom && zoom !== null) map.setZoom(zoom)
      if (options && options !== null) map.setOptions(options)
    }
  }, [map, center, zoom, options])

  React.useEffect(() => {
    if (map) {
      ;['click', 'idle'].forEach((eventName) => google.maps.event.clearListeners(map, eventName))
      if (onClick) {
        map.addListener('click', onClick)
      }
      if (onIdle) {
        map.addListener('idle', () => onIdle(map))
      }
    }
  }, [map, onClick, onIdle])

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // @ts-ignore
          return React.cloneElement(child, { map })
        }
      })}
    </>
  )
}

export default MapComponent
