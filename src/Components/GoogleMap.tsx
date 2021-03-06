import * as React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MapComponent, Marker, MainViewTextField, Copyright, Spinner, ErrorComponent } from "./index";
import {
  WrapperProps,
  ControlOptions,
} from "../Helpers/CustomTypesIndex";
import { Canvas, invalidate, useFrame, useThree } from "@react-three/fiber";
import Stars from "../Helpers/Instances";
import * as THREE from 'three'
import generateStarPositions from '../Helpers/setupStars';
import MiniModel from "../Helpers/MiniModel";
import { AutoComplete } from "antd";

const { Suspense } = React;
let infoWindow: google.maps.InfoWindow;
let map: google.maps.Map;
let ui = true;
let cameraStart = new THREE.Vector3(100, 0, 0);
let base = new THREE.Vector3(0,0,0);

const GoogleMap: React.FC<WrapperProps> = ({ api }) => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(3);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: -4.5,
  });
  const [buttonLabel, setButtonLabel] = React.useState<string>('')
  const [prevCenter, setPreviousCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  })
  const [antipode, setAntipode] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [style, setStyle] = React.useState({
    height: '100vh',
    width: '100%',
    flexGrow: '1',
    padding: '0',
  });
  
  const [controlOptions, setControlOptions] = React.useState<ControlOptions>({
    controlLabel: "Take me home",
    controlClick: (e) => {
      geolocate(map);
    },
  });
  const [stars, setStars] = React.useState<Float32Array>(generateStarPositions(1000));
  const [boxBool, setBoxBool] = React.useState<boolean>(false);
  let meshRef = React.useRef<THREE.Mesh>();

  /* 
        #TODO
        make a func that sends new antipode to the model, 
        and creates a visual effect of the antipode on the earth model.
        limit zoom/view of map to contain solely their position and antipode
        create heatmap with antipode data
        */

  const onClick = (event: google.maps.MapMouseEvent) => {
    // console.log('onClick')
    //google says to avoid directly mutating state
    setClicks([...clicks, event.latLng]);
  };

  function handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  const geolocate = (map: google.maps.Map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setPreviousCenter({
            lat: center.lat,
            lng: center.lng
          })
          setCenter({
            lat: latitude,
            lng: longitude,
          })
          setZoom(10);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter()!);
    }
    flipButton();
  };

  const findAntipode = (map: google.maps.Map) => {
    console.log('find anti')
    // const antipode = {
    //   lat: pos.lat() * -1,
    //   lng: pos.lng() * -1 + 180,
    // };
    // setAntipode(antipode);
    // setCenter(antipode);
    // flipButton();
  };

  const onIdle = (map: google.maps.Map) => {
    // console.log('onIdle')
    setZoom(map.getZoom());
    setCenter(map.getCenter().toJSON());
  };

  const overlaySpot = (direction: string) => {
    let output: google.maps.ControlPosition;
    switch (direction) {
      case "bl":
        output = window.google.maps.ControlPosition["BOTTOM_LEFT"];
        break;
      case "bc":
        output = window.google.maps.ControlPosition["BOTTOM_CENTER"];
        break;
      case "br":
        output = window.google.maps.ControlPosition["BOTTOM_RIGHT"];
        break;
      case "tl":
        output = window.google.maps.ControlPosition["TOP_LEFT"];
        break;
      case "tc":
        output = window.google.maps.ControlPosition["TOP_CENTER"];
        break;
      case "tr":
        output = window.google.maps.ControlPosition["TOP_RIGHT"];
        break;
      case "lc":
        output = window.google.maps.ControlPosition["LEFT_CENTER"];
        break;
      case "rc":
        output = window.google.maps.ControlPosition["RIGHT_CENTER"];
        break;
      case "bc":
        output = window.google.maps.ControlPosition["BOTTOM_CENTER"];
        break;
      default:
        output = window.google.maps.ControlPosition["BOTTOM_CENTER"];
    }
    return output;
  };

  const geocodeLatLng = (geocoder: google.maps.Geocoder, map: google.maps.Map) => {

  }

  const sphereCoords = (coords: google.maps.LatLng)=> {
    /*

    relevant sphere equations?
    coordinate conversion -> 
    r = sqrt(x^2 + y^2 + z^2)
    ?? = arccos(z/sqrt(sqrt(x^2 + y^2 + z^2))) =  arccos(z/r) = arctan(sqrt(x^2 + y^2)/z)
    ?? = big switch case
    */

  }

  const createControlButton = (
    controls: Element,
    map: google.maps.Map,
    controlOptions: ControlOptions
  ) => {
    //console.log('createControlButton')
    const mapButton = document.createElement("button");
    mapButton.className = "map-button";
    mapButton.innerHTML = controlOptions.controlLabel;
    mapButton.addEventListener("click", controlOptions.controlClick);
    controls.appendChild(mapButton);
  };

  const flipButton = () => {
    const activeButton = document.querySelector(".map-button");
    console.log(activeButton.innerHTML)
    if (activeButton.innerHTML == "Take me home") { 
      activeButton.innerHTML = 'Find my Antipode'
    }
  };

  const handleOnLoad = (map: google.maps.Map) => {
    // console.log('=============')
    // console.log('Map Loaded: ')
    console.log(map)
    // console.log('=============')

    const controls = document.createElement("div");
    if (map) {
      createControlButton(controls, map, controlOptions);
      map.controls[overlaySpot("tr")].push(controls);
    }
  };

  React.useEffect(() => {
    const button = document.querySelector(".map-button");
    if (button) {
      button.addEventListener("click", controlOptions.controlClick);
    }
  }, [controlOptions]);

  const MinimapRig = () => {
    let three = useThree();
    let {camera, scene} = three;
    let vec = new THREE.Vector3()
    return useFrame(() => {
    })
  }


  
const mapRender = (status: Status): JSX.Element => {
  switch (status) {
    case Status.LOADING:
      return <Spinner />;
    case Status.FAILURE:
      return <ErrorComponent />;
    case Status.SUCCESS:
      return (<MapComponent
                onClick={onClick}
                onIdle={onIdle}
                center={center}
                zoom={zoom}
                style={style}
                disableDefaultUI={ui}
                zoomControl={true}
                streetViewControl={false}
                fullscreenControl={false}
                rotateControl={false}
                onLoad={handleOnLoad}
                />)
  }
};

  if (api === "") {
    return <div>Backend isn't currently live. Sorry about that!</div>;
  } else {
    return (
      <div
        className="wrapper-wrapper"
      >
        <Wrapper apiKey={api} render={mapRender} />
        <div className="sidebar">
          <Canvas
            className="minimap-canvas"
            frameloop="demand"
            style={{ height: "fill", width: "fill", backgroundColor: "black" }}
            camera={{fov: 10, position: cameraStart, near: 0.5, far: 1000}}
            resize={{scroll: true, debounce: {scroll: 50, resize: 0}}}
          >
            <Suspense>
              <ambientLight intensity={1} castShadow={false} />
              <mesh ref={meshRef}>
                <boxBufferGeometry attach={'geometry'} args={[10, 10, 10]} />
                <meshStandardMaterial attach={'material'} metalness={0.5} color={new THREE.Color('#EF959C')} wireframe visible={boxBool} />
              </mesh> 
              <MiniModel scale={0.01} />
              <Stars stars={stars}/>  
            </Suspense>
            <MinimapRig />
          </Canvas>
          <MainViewTextField
            text={["lalala"]}
            center={center}
            weather={"sunny"}
            windSpeed="60mph"
            windDirection="N"
            city={"New York"}
            state={"NY"}
            country={"USA"}
            temperature=""
          />
          <Copyright />
        </div>

      </div>
    );
  }
};

export default GoogleMap;

