import * as React from "react"
import { GoogleMap } from "../Components/index"
import { axiosWithAuth } from "../Helpers/axiosWithAuth";
import { Typography } from "antd";
import "../Styles/Views/MainViewStyle.scss"

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
                <Title className="mainTitle">Opposite Sides</Title>
                <GoogleMap api={mapsKey} weather={weatherKey} />
            </div>
        )
}

export default MainView