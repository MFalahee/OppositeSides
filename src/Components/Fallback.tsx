import * as React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { extend } from '@react-three/fiber'

const Fallback : React.FC = () => { {
    extend(LoadingOutlined)
    return (    
        <LoadingOutlined spin />
    )
} }

export default Fallback;