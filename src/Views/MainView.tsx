import * as React from "react"
import { GoogleMap, Copyright } from "../Components/index"
import { axiosWithAuth } from "../Helpers/axiosWithAuth";
import { PageHeader } from 'antd';

const MainView : React.FC = (props) => {
    const [mapsKey, setMapsKey] = React.useState('')

    React.useEffect(() => {
        if (process.env.NODE_ENV != 'test') {
            axiosWithAuth.get(`/api`)
            .then(res => {
                setMapsKey(res.data)
                // 
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
                />
                <div className="upper-content-wrapper" role="group">
                    <GoogleMap api={mapsKey} />
                </div>
            </>
        )
}

export default MainView