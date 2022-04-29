import * as React from 'react'
import { GoogleMap } from '../Components/index'
import axios from 'axios'

const MainView : React.FC = (props) => {
    const [key, setKey] = React.useState('')
    React.useEffect(() => {
        console.log('Retrieving Key... stand by')
        axios.get(`http://localhost:5555/api`)
            .then(res => {
                setKey(res.data)
                console.log("API KEY SET")
            })
    }, [])
        return(
            <div className="view-wrapper">
                <h1>yo</h1>
                <GoogleMap api={key}/>
            </div>
        )
}


export default MainView