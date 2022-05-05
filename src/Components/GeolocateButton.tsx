import * as React from 'react'
import { ButtonProps } from '../Helpers/CustomTypesIndex'
import { Button } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'


//google.maps.Map can be used to change the lng and lat values based on the user's location
//this shouldn't be as hard as setting up the map itself! so that's a plus


const GeolocateButton : React.FC<ButtonProps> = (props) => {
    return (
        props.visible ? 
        //this is the button that will be rendered
        //button should take onClick and call the geolocate function
        //no dom manipulation/state manipulation needs to happen here I think
        //Simply need to send new coords to map which should be passed to the button already
        <Button onClick={props.onClick} type='primary' size='large' icon={''}>
            <EnvironmentOutlined spin={true} className="primaryButtonIcon" twoToneColor="" /> Take me to me, please.
        </Button> : 
        <></>
    )
}

export default GeolocateButton;