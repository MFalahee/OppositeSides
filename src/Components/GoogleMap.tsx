import * as React from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { MapComponent, ErrorComponent, Loading } from './index'
import { WrapperProps } from '../../custom'
const GoogleMap: React.FC<WrapperProps> = ({ api }) => {
  let infoWindow: google.maps.InfoWindow
  let map: google.maps.Map
  let ui = true
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = React.useState(3)
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: -4.5
  })
  const [, setPreviousCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0
  })

  const [home, setHome] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0
  })
  const [antipode, setAntipode] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0
  })
  const [style] = React.useState({
    height: '100vh',
    width: '100%',
    flexGrow: '1',
    padding: '0'
  })

  const onClick = (event: google.maps.MapMouseEvent) => {
    if (event && event.latLng) setClicks([...clicks, event.latLng])
  }

  function handleLocationError(browserHasGeolocation: boolean, infoWindow: google.maps.InfoWindow, pos: google.maps.LatLng) {
    infoWindow.setPosition(pos)
    infoWindow.setContent(
      browserHasGeolocation ? 'Error: The Geolocation service failed.' : "Error: Your browser doesn't support geolocation."
    )
    infoWindow.open(map)
  }

  const geolocate = (map: google.maps.Map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords
          setPreviousCenter({
            lat: center.lat,
            lng: center.lng
          })
          setCenter({
            lat: latitude,
            lng: longitude
          })
          setHome({
            lat: latitude,
            lng: longitude
          })
          setZoom(15)
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter()!)
        }
      )
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter()!)
    }
    flipButton()
  }

  const findAntipode = (map: google.maps.Map) => {
    // home or center
    if (map && map.getCenter) {
      // console.log('Find Antipode', lat(), lng())
      setAntipode(antipode)
      setCenter(antipode)
      flipButton()
    }
  }

  const onIdle = (map: google.maps.Map) => {
    let currentZoom
    let currentCenter
    if (map) {
      currentZoom = map.getZoom()
      currentCenter = map.getCenter()
    }
    if (currentZoom !== null && currentCenter !== null) {
      setZoom(currentZoom)
      setCenter(currentCenter.toJSON())
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
      case 'bc':
        output = window.google.maps.ControlPosition['BOTTOM_CENTER']
        break
      default:
        output = window.google.maps.ControlPosition['BOTTOM_CENTER']
    }
    return output
  }

  const createControlButtons = (map: google.maps.Map) => {
    const buttonDiv1 = document.createElement('div')
    const buttonDiv2 = document.createElement('div')
    const mapButton = document.createElement('button')
    const mapButton2 = document.createElement('button')
    mapButton.type = 'button'
    mapButton2.type = 'button'
    mapButton.className = 'map-button geolocation-button active'
    mapButton2.className = 'map-button antipode-button'
    mapButton.innerHTML = 'Take me home'
    mapButton2.innerHTML = 'Find my antipode'
    mapButton.addEventListener('click', () => {
      geolocate(map)
    })
    mapButton2.addEventListener('click', () => {
      findAntipode(map)
    })
    buttonDiv1.appendChild(mapButton)
    buttonDiv2.appendChild(mapButton2)

    return [buttonDiv1, buttonDiv2]
  }

  const createMapInfoWindow = (map: google.maps.Map) => {
    let infoDiv = document.createElement('div')
    infoDiv.id = 'map-info-window'
    infoDiv = mapInfoWindowGuts(infoDiv)
    map.controls[overlaySpot('br')].push(infoDiv)
  }
  const mapInfoWindowGuts = (parentDiv: HTMLDivElement) => {
    // this function creates the innards for the coordinate display over the map.
    // I want to create a card, with 2 divs for the coordinate display

    const containerDiv = document.createElement('div')
    containerDiv.className = 'map-info-window-container'
    const coordinatesDisplay = document.createElement('h3')
    coordinatesDisplay.className = 'map-info-window-coordinates home'
    const coordinatesDisplay2 = document.createElement('h3')
    coordinatesDisplay2.className = 'map-info-window-coordinates antipode'

    containerDiv.appendChild(coordinatesDisplay)
    containerDiv.appendChild(coordinatesDisplay2)
    parentDiv.appendChild(containerDiv)
    return parentDiv
  }

  const flipButton = () => {
    document.querySelectorAll('.map-button').forEach((button) => {
      button.classList.toggle('active')
    })
  }

  const handleOnLoad = (map: google.maps.Map) => {
    let buttons
    if (map) {
      const divs = createControlButtons(map)
      createMapInfoWindow(map)
      if (divs) buttons = document.querySelectorAll('.map-button')
      if (buttons != null) {
        divs.forEach((div) => {
          map.controls[overlaySpot('tl')].push(div)
        })
      }
    }
  }

  const mapRender = (status: Status): JSX.Element => {
    switch (status) {
      case Status.LOADING:
        return <Loading />
      case Status.FAILURE:
        return <ErrorComponent />
      case Status.SUCCESS:
        return (
          <MapComponent
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
      <div className="wrapper-wrapper">
        <Wrapper apiKey={api} render={mapRender} />
      </div>
    )
  }
}

export default GoogleMap
