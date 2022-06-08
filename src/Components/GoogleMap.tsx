import * as React from "react";
import * as ReactDOM from "react-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MapComponent, Marker, MainViewTextField } from "./index";
import {
  WrapperProps,
  ControlOptions,
  MainViewTextFieldProps,
} from "../Helpers/CustomTypesIndex";
import { Canvas } from "@react-three/fiber";
import GlobeModel from "../Helpers/GlobeModel";
import Stars from "../Helpers/Instances";
import * as THREE from 'three'

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const { Suspense } = React;
let infoWindow: google.maps.InfoWindow;
let map: google.maps.Map;
let ui = true;
let base = new THREE.Vector3(0, 0, 0);

// const styleElement = (styles: Object, element: HTMLElement) => {
//     for (let key in styles) {
//         element.style[key] = styles[key];
//     }
// }

const GoogleMap: React.FC<WrapperProps> = ({ api }) => {
  const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = React.useState(4);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: -25.344,
    lng: 131.031,
  });
  const [antipode, setAntipode] = React.useState<google.maps.LatLngLiteral>({
    lat: 0,
    lng: 0,
  });
  const [style, setStyle] = React.useState({
    width: "50%",
    height: "100%",
    flexGrow: "1",
  });
  const [controlOptions, setControlOptions] = React.useState<ControlOptions>({
    controlLabel: "Take me home",
    controlClick: (e) => {
      geolocate(map);
    },
  });
  const [directionalLightPos, setDirectionalLightPos] = React.useState<THREE.Vector3>(base);

  /* 
        #TODO
        make a func that sends new antipode to the model, 
        and creates a visual effect of the antipode on the earth model.
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

          setCenter({
            lat: latitude,
            lng: longitude,
          });

          flipButton();
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter()!);
    }
  };

  const findAntipode = (map: google.maps.Map) => {
    // this isn't working properly yet for lng I believe
    // console.log('findAntipode')
    const pos = map.getCenter();
    const antipode = {
      lat: pos.lat() * -1,
      lng: pos.lng() * -1 + 180,
    };
    setAntipode(antipode);
    setCenter(antipode);
    flipButton();
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
    // console.log('flipButton')
    const activeButton = document.querySelector(".map-button");
    if (activeButton) {
      if (activeButton.innerHTML === "Take me home") {
        setControlOptions({
          controlLabel: "Antipode, please.",
          controlClick: (e) => findAntipode(map),
          prevClick: (e) => geolocate(map),
        });
      } else {
        setControlOptions({
          controlLabel: "Take me home",
          controlClick: (e) => geolocate(map),
          prevClick: (e) => findAntipode(map),
        });
      }
    }
  };

  const handleOnLoad = (map: google.maps.Map) => {
    // console.log('handleOnLoad')
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

  if (api === "") {
    return <div>Backend isn't live.</div>;
  } else {
    return (
      <div
        className="wrapper-wrapper"
        style={{ height: "100vh", width: "100vw" }}
      >
        <Wrapper apiKey={api} render={render}>
          <MapComponent
            onClick={onClick}
            onIdle={onIdle}
            center={center}
            zoom={zoom}
            style={style}
            disableDefaultUI={ui}
            zoomControl={true}
            streetViewControl={true}
            fullscreenControl={true}
            rotateControl={true}
            onLoad={handleOnLoad}
          >
            {clicks.map((latLng, i) => (
              <Marker key={i} position={latLng} />
            ))}
          </MapComponent>
        </Wrapper>
        <div className="sidebar">
          <Canvas
            className="minimap-canvas"
            frameloop="always"
            style={{ height: "fill", width: "fill", backgroundColor: "black" }}
          >
            <Suspense>
              <GlobeModel scale={3} position={0}/>
              <ambientLight intensity={0} castShadow={true} />
              <directionalLight color={"94d2a5"} intensity={0.7} position={directionalLightPos}/>
            </Suspense>
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
        </div>
      </div>
    );
  }
};

export default GoogleMap;

