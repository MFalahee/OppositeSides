import * as React from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { MapComponent, ErrorComponent, Loading } from './index'
import { WrapperProps } from '../../custom'

const GoogleMap: React.FC<WrapperProps> = ({ api }) => {
  let ui = true
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([])
  const [zoom, setZoom] = React.useState<google.maps.MapOptions['zoom']>(5)
  const [center, setCenter] = React.useState<google.maps.LatLng>()
  const [previousCenter, setPreviousCenter] = React.useState<google.maps.LatLng>()
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
  const flipButton = () => {
    document.querySelectorAll('.map-button').forEach((button) => {
      button.classList.toggle('active')
    })
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

  function handleLocationError(browserHasGeolocation: boolean, pos: google.maps.LatLng) {
    return {
      message: browserHasGeolocation ? 'Error: The Geolocation service failed.' : "Error: Your browser doesn't support geolocation.",
      position: pos
    }
  }
  // geolocation onClick
  const geolocate = React.useCallback(
    (map: google.maps.Map) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords
            const output = new google.maps.LatLng(latitude, longitude)
            setPreviousCenter(center)
            setCenter(output)
            setHome(output)
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
    },
    [home]
  )
  // find antipode onClick

  const findAntipode = React.useCallback(
    (map: google.maps.Map) => {
      // home or center
      if (map) {
        let c = map.getCenter()
        // console.log('Find Antipode', lat(), lng())
        if (c) {
          let { lng, lat } = c
          let coords = new google.maps.LatLng(lat(), lng())
          console.log('Find Antipode', coords)
          setAntipode(coords)
          setCenter(coords)
          flipButton()
        }
      }
    },
    [antipode]
  )

  /*
   */

  // giant callback function for google maps to create the overlayed display
  const handleOnLoad = React.useCallback(
    (map: google.maps.Map) => {
      let buttons
      if (map) {
        console.log('handleOnLoad map callback')
        function cleanUpButtons() {
          while (map.controls[overlaySpot('tl')].getLength() >= 1) {
            map.controls[overlaySpot('tl')].pop()
          }
        }
        cleanUpButtons()
        const createMapInfoWindow = (map: google.maps.Map) => {
          let infoDiv = document.createElement('div')
          infoDiv.id = 'map-info-window'
          infoDiv = mapInfoWindowGuts(infoDiv)
        }
        const createControlButtons = (map: google.maps.Map) => {
          if (map !== null) {
            let classNames = ['geolocation-button active', 'antipode-button']
            let divs = []
            for (let k in classNames) {
              let div = document.createElement('div')
              let button = document.createElement('button')
              button.className = `map-button ${classNames[k]}`
              if (k === 'geolocation-button') {
                button.innerHTML = 'Take me home'
                button.addEventListener('click', () => {
                  geolocate(map)
                })
              } else {
                button.innerHTML = 'Find my Antipode'
                button.addEventListener('click', () => {
                  findAntipode(map)
                })
              }
              div.appendChild(button)
              divs.push(div)
            }
            return divs
          }
        }

        const buttonDivs = createControlButtons(map)
        createMapInfoWindow(map)
        if (buttonDivs && buttonDivs !== null) buttons = document.querySelectorAll('.map-button')
        if (buttonDivs && buttons != null) {
          buttonDivs.forEach((div) => {
            if (div.parentElement) div.parentElement.removeChild(div)
            // map.controls[overlaySpot('tl')].pop()
            console.log(div)
            map.controls[overlaySpot('tl')].push(div)
          })
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
