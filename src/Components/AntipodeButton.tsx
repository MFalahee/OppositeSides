import * as React from 'react'



interface ButtonProps  {
    onClick?: (event: React.MouseEvent) => void
}


const AntipodeButton : React.FC<ButtonProps> = ({onClick}) => {
    return (
        //this is the button that will be rendered
        <button onClick={onClick}>
            Antipode
        </button>
    )
}

export default AntipodeButton