import React, { useEffect, useState } from 'react'
import { GoogleMap } from '../Components/index.tsx'
import axios from 'axios'

const LandingPageView = props => {
    const [key, setKey] = useState('')

    useEffect(() => {
        console.log('Retrieving Key... stand by')
        axios.get(`http://localhost:5555/api`)
            .then(res => {
                setKey(res.data)
                console.log("API KEY SET")
            })
    }, [])
        return(
            <div> 
                <h1 style={{color:"red", background:"blue"}}>opposite sides</h1>
                <GoogleMap api={key}/>
            </div>
        )
}


export default LandingPageView