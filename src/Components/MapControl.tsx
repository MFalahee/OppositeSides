import * as React from 'react';
import { ControlOptions} from '../Helpers/CustomTypesIndex';
import { AntipodeButton, GeolocateButton, } from './index';


//remake this into a HoC that takes in a map and returns a map button with relevant onClick and such

const MapControl : React.FC<ControlOptions> = (props) => { 
  console.log(props)
  if (props.controlLabel === "Geolocate") {
    console.log('rendering geolocate button')
  return(
    <GeolocateButton visible={props.controlToggle} onClick={props.controlClick}/>
  ) 
  } else if (props.controlLabel === "Antipode") {
    console.log('rendering antipode button')
    return(
      <AntipodeButton visible={props.controlToggle} onClick={props.controlClick}/>
    ) 
  } else {
    console.log('rendering nothing')
    return(
        <></>)
    }
}


export default MapControl