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


    return (
        <div>
            <h1>Opposite Sides</h1>
            <GoogleMap ApiKey={key}/>
        </div>
        )
    }


export default LandingPageView