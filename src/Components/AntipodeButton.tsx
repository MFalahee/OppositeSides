import * as React from "react"
import { ButtonProps } from "../Helpers/CustomTypesIndex"


const AntipodeButton : React.FC<ButtonProps> = (props) => {
    console.log(props)
    return (
     props.visible ?
            <button onClick={props.onClick}>
            Take me to my antipode, it's super important I see it.
        </button>
        : 
        <></>
    )
}

export default AntipodeButton