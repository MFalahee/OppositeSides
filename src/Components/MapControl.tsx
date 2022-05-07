import * as React from 'react';
import { ControlOptions} from '../Helpers/CustomTypesIndex';
// import { AntipodeButton, GeolocateButton, } from './index';
import { Button }  from 'antd'

//remake this into a HoC that takes in a map and returns a map button with relevant onClick and such
const MapControl : React.VFC<ControlOptions> = (props) => { 
  const ref = React.forwardRef((props, ref) => {})
  const { controlClick, controlLabel, controlToggle} = props;
  const [controlToggleState, setControlToggleState] = React.useState<Boolean>();
  const [controlLabelState, setControlLabelState] = React.useState<String>();
  const [controlClickHandler, setControlClickHandler] = React.useState<(event)=>void>();
  
  React.useEffect(() => {
    // set the state values to props values when props are changed
    setControlToggleState(controlToggle);
    setControlLabelState(controlLabel);
    setControlClickHandler(controlClick);
  }, [controlToggle, controlLabel, controlClick])
  
  function createButton() {
    if (controlToggleState) {
      console.log(Button)
    }
  }

  if (controlToggleState) { 
    return(
    <div ref={ref}> 
      Taco
    </div>)}
    else {
      return(
        <div ref={ref}>
          Salsa
          </div>
      )
    }
  }

export default MapControl