import * as React from "react"
import { GoogleMap, InputField } from "../Components/index"
import { axiosWithAuth } from "../Helpers/axiosWithAuth";
import { Typography } from "antd";
import "../Styles/views/MainViewStyle.scss"

const { Title, Text, Link } = Typography;

const MainView : React.FC = (props) => {

    const [mapsKey, setMapsKey] = React.useState('')
    const [weatherKey, setWeatherKey] = React.useState('')

    React.useEffect(() => {
        axiosWithAuth.get(`/api`)
            .then(res => {
                setMapsKey(res.data)
            }).catch(err => {
                console.error(err)
            })
            axiosWithAuth.get(`/api/weather`).then(res => {
                setWeatherKey(res.data)
            }).catch(err => {
                console.error(err)
            })
    }, [])

        return(
            <div className="view-wrapper">
                <Title className="main-title">Opposite Sides</Title>
                <div className="upper-content-wrapper">
                <GoogleMap api={mapsKey} weather={weatherKey} />
                <InputField />
                </div>
            </div>
        )
}

export default MainView