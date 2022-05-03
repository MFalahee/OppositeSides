import * as React from 'react'
import { GoogleMap } from '../Components/index'
import { axiosWithAuth } from '../Helpers/axiosWithAuth';

let link : string = process.env.REACT_APP_API_URL

const MainView : React.FC = (props) => {
    console.log(process.env.REACT_APP_API_URL)
    const [mapsKey, setMapsKey] = React.useState('')
    const [weatherKey, setWeatherKey] = React.useState('')
    React.useEffect(() => {

        // get the maps key from the backend
        axiosWithAuth.get(`/api`)
            .then(res => {
                setMapsKey(res.data)
                console.log("API KEY SET")
            }).catch(err => {
                console.error(err)
            })
        // get the weather key from the backend
            axiosWithAuth.get(`/api/weather`).then(res => {
                setWeatherKey(res.data)
                console.log("WEATHER KEY SET")
            }).catch(err => {
                console.error(err)
            })
    }, [])
        return(
            <div className="view-wrapper">
                <h1>yo</h1>
                <GoogleMap api={mapsKey} weather={weatherKey} />
            </div>
        )
}

export default MainView