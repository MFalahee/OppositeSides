import * as React from 'react';
import { axiosWithAuth } from '../Helpers/axiosWithAuth';
/*
Not sure totally sure to what extent this is a component
going to make api calls
and get the data
possibly render the data, but not sure yet until I explore some of the api
*/

const Weather : React.FC<{weather: string}> = (props) => { 
    return (
        <div className="weather">
         </div>
    )
}

export default Weather