import * as React from "react"
import { GoogleMap, Header, Copyright, ErrorBoundary } from "../Components/index"
import { axiosWithAuth } from "../Helpers/axiosWithAuth";
import "../Styles/views/MainViewStyle.scss"

const MainView : React.FC = (props) => {
    const [mapsKey, setMapsKey] = React.useState('')
    const [weatherKey, setWeatherKey] = React.useState('')
    React.useEffect(() => {
        axiosWithAuth.get(`/api`)
            .then(res => {
                setMapsKey(res.data)
                // 
            }).catch(err => {
                console.error(err)
            })
            axiosWithAuth.get(`/api/weather`).then(res => {
                setWeatherKey(res.data)
            }).catch(err => {
                console.error(err)
            })
    }, [])

        return(<>
                <Header title="Opposite Sides" subtitle="sides sides sides sides" />
                <div className="upper-content-wrapper">
                    <GoogleMap api={mapsKey} weather={weatherKey} />
                </div>
                <Copyright />
            </>
        )
}

export default MainView