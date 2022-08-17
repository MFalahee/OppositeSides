import * as React from 'react';
import { MainViewTextFieldProps } from '../../custom'
import { Descriptions } from 'antd'

const MainViewTextField: React.FC<MainViewTextFieldProps> = (props) => {
    const [map, setMap] = React.useState<google.maps.Map>(null);
    const [location, setLocation] = React.useState<google.maps.LatLng>(null);
    React.useEffect(() => {
      console.log(props.center)
    }, [])
    return (
        <div className="main-view-text-field">
            <Descriptions 
                title="Location Info:"
                column={2}
                size="middle"
                bordered={true}
                >
                <Descriptions.Item label={`Longitude:`}>{props.center.lng}</Descriptions.Item>
                <Descriptions.Item label={` Latitude:`}>{props.center.lat}</Descriptions.Item> 
                <Descriptions.Item label="Nearest 'City':">{props.city}</Descriptions.Item>
                <Descriptions.Item label="Country:">{props.country}</Descriptions.Item>
                {/* 
                    <Descriptions.Item label="Weather: ">{props.weather}</Descriptions.Item>
                    <Descriptions.Item label="Temperature: ">{props.temperature}</Descriptions.Item>
                    <Descriptions.Item label="Wind Speed: ">{props.windSpeed}</Descriptions.Item>
                    <Descriptions.Item label="Wind Direction: ">{props.windDirection}</Descriptions.Item>
                */}
            </Descriptions>
        </div>
    )
} 

export default MainViewTextField;