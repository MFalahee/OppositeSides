import * as React from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { MapComponent, ErrorComponent, Loading } from './index'
import { WrapperProps } from '../../custom'
const GoogleMap: React.FC<WrapperProps> = ({ api }) => {
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

  const onIdle = (map: google.maps.Map) => {
    let currentZoom
    let currentCenter
    if (map) {
      currentZoom = map.getZoom()
      currentCenter = map.getCenter()
    }
    if (currentZoom && currentCenter) {
      setZoom(currentZoom)
      setCenter(currentCenter.toJSON())
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
  const flipButton = () => {
    document.querySelectorAll('.map-button').forEach((button) => {
      button.classList.toggle('active')
    })
  }

  /* dev logs */

  if (process.env.NODE_ENV !== 'production') {
    console.log(`home ${home}, center: ${center}, antipode:${antipode}`)
  }

  /* 
  Coordinates display
  */

  const mapInfoWindowGuts = (parentDiv: HTMLDivElement) => {
    const containerDiv = document.createElement('div')
    containerDiv.className = 'map-info-window-container'
    let displays = ['home', 'antipode', 'center']
    for (let i = 0; i < displays.length; i++) {
      let display = document.createElement('h3')
      display.id = `coordinates-${displays[i]}`
      containerDiv.appendChild(display)
    }
    parentDiv.appendChild(containerDiv)
    return parentDiv
  }

  const updateCoordinatesDisplay = (input: google.maps.LatLngLiteral) => {
    let homeC = document.getElementById('coordinates-home')
    let antiC = document.getElementById('coordinates-antipode')
    let currentC = document.getElementById('coordinates-center')
    if (homeC && antiC && currentC) {
    }
  }

  /*
   */

  // giant callback function for google maps to create the overlayed display
  const handleOnLoad = React.useCallback(
    (map: google.maps.Map) => {
      function handleLocationError(browserHasGeolocation: boolean, pos: google.maps.LatLng) {
        return {
          message: browserHasGeolocation ? 'Error: The Geolocation service failed.' : "Error: Your browser doesn't support geolocation.",
          position: pos
        }
      }
      // geolocation onClick
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
              handleLocationError(true, map.getCenter()!)
            }
          )
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, map.getCenter()!)
        }
        flipButton()
      }
      // find antipode onClick
      const findAntipode = (map: google.maps.Map) => {
        // home or center
        if (map) {
          // console.log('Find Antipode', lat(), lng())
          setAntipode(antipode)
          setCenter(antipode)
          flipButton()
        }
      }
      const createMapInfoWindow = (map: google.maps.Map) => {
        let infoDiv = document.createElement('div')
        infoDiv.id = 'map-info-window'
        infoDiv = mapInfoWindowGuts(infoDiv)
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
    },
    [center, antipode]
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
