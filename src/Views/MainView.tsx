import * as React from "react"
import { GoogleMap, Copyright, MainViewTextField, ErrorBoundary } from "../Components/index"
import GlobeModel from '../Helpers/GlobeModel';
import Stars from '../Helpers/Instances';
import { axiosWithAuth } from "../Helpers/axiosWithAuth";
import { PageHeader } from 'antd';
import { Canvas } from '@react-three/fiber';


const { Suspense } = React;
const MainView : React.FC = (props) => {
    const [mapsKey, setMapsKey] = React.useState('')
    const [weatherKey, setWeatherKey] = React.useState('')

    let headerStyle = {
        // background color = $darker blue
        backgroundColor: '#2B313B',
    }
    React.useEffect(() => {
        if (process.env.NODE_ENV != 'test') {
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
        }
    }, [])

        return(<>
                <PageHeader 
                className="site-page-header"
                title={"Opposite Sides"}
                subTitle={"sides sides sides sides"}
                backIcon={true}
                style={headerStyle}
                />
                <div className="upper-content-wrapper" role="group">
                    <GoogleMap api={mapsKey} weather={weatherKey} />
                </div>
                <Copyright />
            </>
        )
}

export default MainView