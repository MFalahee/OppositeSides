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
  const [prevCenter, setPreviousCenter] = React.useState<google.maps.LatLngLiteral>({
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
    // console.log('onClick')
    setClicks([...clicks, event.latLng])
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
          console.log('Your location: ', latitude, longitude)
          setZoom(10)
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
    const { lat, lng } = map.getCenter()
    console.log('Find Antipode', lat(), lng())
    setAntipode(antipode)
    setCenter(antipode)
    flipButton()
  }

  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom())
    setCenter(map.getCenter().toJSON())
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

  const geocodeLatLng = (geocoder: google.maps.Geocoder, map: google.maps.Map) => {
    console.log('geocodeLatLng', geocoder)
  }

  const sphereCoords = (coords: google.maps.LatLng) => {
    /*

    relevant sphere equations?
    coordinate conversion -> 
    r = sqrt(x^2 + y^2 + z^2)
    θ = arccos(z/sqrt(sqrt(x^2 + y^2 + z^2))) =  arccos(z/r) = arctan(sqrt(x^2 + y^2)/z)
    φ = big switch case
    */
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
    mapButton.addEventListener('click', (e) => {
      geolocate(map)
    })
    mapButton2.addEventListener('click', (e) => {
      findAntipode(map)
    })
    buttonDiv1.appendChild(mapButton)
    buttonDiv2.appendChild(mapButton2)

    return [buttonDiv1, buttonDiv2]
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
      if (divs) buttons = document.querySelectorAll('.map-button')
      if (buttons != null) {
        divs.forEach((div) => {
          map.controls[overlaySpot('tc')].push(div)
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
            maxZoom={5}
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
