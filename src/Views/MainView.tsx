import * as React from 'react'
import { GoogleMap } from '../Components/index'
import { axiosWithAuth } from '../Helpers/axiosWithAuth';

const MainView : React.FC = (props) => {

    const [mapsKey, setMapsKey] = React.useState('')
    const [weatherKey, setWeatherKey] = React.useState('')

    React.useEffect(() => {

        axiosWithAuth.get(`/api`)
            .then(res => {
                setMapsKey(res.data)
                console.log("API KEY SET")
            }).catch(err => {
                console.error(err)
            })
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