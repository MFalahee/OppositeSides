import React, { useEffect, useState } from 'react'
import { GoogleMap } from '../Components/index'
import axios from 'axios'

const LandingPageView = props => {
    const [key, setKey] = useState('')

    useEffect(() => {
    if (process.env.NODE_ENV != 'production') {
        axios.get(`http://localhost:5555/api`)
            .then(res => {
                setKey(res.data)
                console.log('key acquired')
                console.log("API KEY: ", res.data)
            })
    } else {
        console.log('PROD ENVIRONMENT SHOULD NOT BE HERE')
    } }, [])

    if (key === '') {
        return <div>Waiting for API Key from google....</div>
    } else {
        return(
            <div> 
                <h1 style={{color:"red", background:"blue"}}>opposite sides</h1>
                <GoogleMap api={key} />
            </div>
        )
    }
}


export default LandingPageView