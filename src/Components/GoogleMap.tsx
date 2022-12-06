import * as React from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { MapComponent, ErrorComponent, Loading } from './index'
import { WrapperProps } from '../../custom'

const GoogleMap: React.FC<WrapperProps> = ({ api }) => {
  let ui = true
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = React.useState<google.maps.MapOptions['zoom']>(5)
  const [center, setCenter] = React.useState<google.maps.LatLng>()
  const [home, setHome] = React.useState<google.maps.LatLng>()
  const [antipode, setAntipode] = React.useState<google.maps.LatLng>()
  const [style] = React.useState({
    height: '100vh',
    width: '100%',
    flexGrow: '1',
    padding: '0'
  })

  const onClick = (event: google.maps.MapMouseEvent) => {
    if (event && event.latLng) setClicks([...clicks, event.latLng])
  }

  const onIdle = (map: google.maps.Map) => {
    let currentZoom = null
    let currentCenter = null
    if (map) {
      currentZoom = map.getZoom()
      currentCenter = map.getCenter()
    }
    if (currentZoom && currentZoom !== null && currentCenter !== null && currentCenter) {
      setZoom(currentZoom)
      setCenter(currentCenter)
      updateCoordinatesDisplay(currentCenter.toJSON())
    }
  }

  const overlaySpot = (direction: string) => {
    let output: google.maps.ControlPosition
    switch (direction) {
      case 'bl':
        output = window.google.maps.ControlPosition['BOTTOM_LEFT']
        break
      case 'bc':
        output = window.google.maps.ControlPosition['BOTTOM_CENTER']
        break
      case 'br':
        output = window.google.maps.ControlPosition['BOTTOM_RIGHT']
        break
      case 'tl':
        output = window.google.maps.ControlPosition['TOP_LEFT']
        break
      case 'tc':
        output = window.google.maps.ControlPosition['TOP_CENTER']
        break
      case 'tr':
        output = window.google.maps.ControlPosition['TOP_RIGHT']
        break
      case 'lc':
        output = window.google.maps.ControlPosition['LEFT_CENTER']
        break
      case 'rc':
        output = window.google.maps.ControlPosition['RIGHT_CENTER']
        break
      default:
        output = window.google.maps.ControlPosition['BOTTOM_CENTER']
    }
    return output
  }
  /* 
  Coordinates display
  */

  // we need a clean up map info window function
  const init_MapInfoWindow = (parentDiv: HTMLDivElement) => {
    const containerDiv = document.createElement('div')
    containerDiv.className = 'map-info-window-container'
    let displays = ['home', 'antipode', 'center']
    for (let i = 0; i < displays.length; i++) {
      let display = document.createElement('h3')
      display.className = `coordinates`
      display.id = `${displays[i]}-coordinates`
      containerDiv.appendChild(display)
    }
    parentDiv.appendChild(containerDiv)
    return parentDiv
  }

  const updateCoordinatesDisplay = (input: google.maps.LatLngLiteral) => {
    let homeC = document.getElementById('home-coordinates')
    let antiC = document.getElementById('antipode-coordinates')
    let currentC = document.getElementById('center-coordinates')
    if (homeC && antiC && currentC) {
      currentC.innerHTML = `Center: \n ${input?.lat.toFixed(2)}, \n ${input?.lng.toFixed(2)}`

      home
        ? (homeC.innerHTML = `H: ${home?.toJSON().lat.toFixed(2)}, ${home?.toJSON().lng.toFixed(2)}`)
        : (homeC.style.visibility = 'hidden')
      antipode
        ? (antiC.innerHTML = `A: ${antipode?.toJSON().lat.toFixed(2)}, ${antipode?.toJSON().lng.toFixed(2)}`)
        : (antiC.style.visibility = 'hidden')
    }
  }

  function handleLocationError(browserHasGeolocation: boolean, pos: google.maps.LatLng) {
    return {
      message: browserHasGeolocation ? 'Error: The Geolocation service failed.' : "Error: Your browser doesn't support geolocation.",
      position: pos
    }
  }
  // geolocation onClick
  const geolocate = React.useCallback((map: google.maps.Map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('geolocate')
          console.log('Position: (', position.coords.latitude, position.coords.longitude, ')')
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          position ? setHome(new google.maps.LatLng(pos)) : setHome(new google.maps.LatLng({ lat: 0, lng: 0 }))
          map.setCenter(pos)
          map.setZoom(8)
        },
        (error) => {
          console.log(error)
          const pos = {
            lat: 0,
            lng: 0
          }
          map.setCenter(pos)
          map.setZoom(2)
          handleLocationError(true, new google.maps.LatLng(pos))
        }
      )
    }
  }, [])
  // find antipode onClick
  // #TODO the math isn't right in this, I'm sure. Going to check for an actual formula after a break.
  const findAntipode = React.useCallback(
    (map: google.maps.Map) => {
      if (map && center) {
        console.log('antipode from center')
        if (map && center) {
          // use current center from map to find antipode position.
          // Pan to the antipode by setting it to the center of the map and then set state.
          const antipode = new google.maps.LatLng({
            lat: -center.toJSON().lat,
            lng: center.toJSON().lng > 0 ? center.toJSON().lng - 180 : center.toJSON().lng + 180
          })
          setAntipode(antipode)
          console.log('Position: \n (', antipode.lat(), antipode.lng(), ')')
          map.setCenter(antipode)
          map.setZoom(8)
        }
      }
    },
    // eslint-disable-next-line
    [center]
  )

  // giant callback function for google maps to create the overlayed display
  const handleOnLoad = React.useCallback(
    (map: google.maps.Map) => {
      if (map) {
        function cleanUpButtons(map: google.maps.Map) {
          while (map.controls[overlaySpot('tl')].getLength() >= 1) {
            map.controls[overlaySpot('tl')].pop()
          }
          while (map.controls[overlaySpot('bl')].getLength() >= 1) {
            map.controls[overlaySpot('bl')].pop()
          }
        }
        const createMapInfoWindow = (map: google.maps.Map) => {
          let infoDiv = document.createElement('div')
          infoDiv.id = 'map-info-window'
          infoDiv = init_MapInfoWindow(infoDiv)
          return infoDiv
        }
        const createControlButtons = (map: google.maps.Map) => {
          if (map) {
            cleanUpButtons(map)
            let buttonDiv = document.createElement('div') // create a div to hold the buttons
            buttonDiv.id = 'map-button-container'
            let geolocateButton = document.createElement('button') // create the geolocate button
            geolocateButton.id = 'geolocate-button'
            geolocateButton.className = 'map-button locate-btn'
            geolocateButton.innerHTML = 'Geolocate'
            geolocateButton.addEventListener('click', () => {
              geolocate(map)
            })
            let antipodeButton = document.createElement('button') // create the antipode button
            antipodeButton.id = 'antipode-button'
            antipodeButton.className = 'map-button antipode-btn'
            antipodeButton.innerHTML = 'Antipode'
            antipodeButton.addEventListener('click', () => {
              findAntipode(map)
            })
            buttonDiv.appendChild(geolocateButton)
            buttonDiv.appendChild(antipodeButton)
            return buttonDiv
          }
        }
        const buttonDiv = createControlButtons(map)
        const infoWindow = createMapInfoWindow(map)
        if (buttonDiv && infoWindow) {
          map.controls[overlaySpot('tl')].push(buttonDiv)
          map.controls[overlaySpot('bl')].push(infoWindow)
        }
      }
    },
    [geolocate, findAntipode]
  )

  const mapRender = (status: Status): JSX.Element => {
    switch (status) {
      case Status.LOADING:
        return <Loading />
      case Status.FAILURE:
        return <ErrorComponent />
      case Status.SUCCESS:
        return (
          <MapComponent
            mapTypeControl={false}
            mapTypeId={google.maps.MapTypeId.HYBRID}
            onClick={onClick}
            onIdle={onIdle}
            center={center}
            zoom={zoom}
            style={style}
            disableDefaultUI={ui}
            zoomControl={true}
            maxZoom={15}
            minZoom={5}
            streetViewControl={false}
            fullscreenControl={false}
            rotateControl={false}
            onLoad={handleOnLoad}
          />
        )
    }
  }
  if (api === '') {
    return <div>Backend isn't currently live. Sorry about that!</div>
  } else {
    return (
      <div className="wrapper-wrapper" id="google-map-container">
        <Wrapper apiKey={api} render={mapRender} />
      </div>
    )
  }
}

export default GoogleMap
