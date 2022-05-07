import * as React from 'react'
import { ButtonProps } from '../Helpers/CustomTypesIndex'
import { Button } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'


//google.maps.Map can be used to change the lng and lat values based on the user's location
//this shouldn't be as hard as setting up the map itself! so that's a plus


const GeolocateButton : React.Component<ButtonProps> = (props) => {
    console.log(props)
    return(<>
    </>
            // <Button> 
            //     <EnvironmentOutlined />
            // </Button>)}
    )}

export default GeolocateButton;

