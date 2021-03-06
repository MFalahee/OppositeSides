import * as React from 'react'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import { invalidate, useFrame } from '@react-three/fiber';
import { Group } from 'antd/lib/avatar';

interface StarsProps {
    radius?: number;
    radius2?: number;
    scale?: number;
    stars?: Float32Array;
    fn?: (event: MouseEvent, stars: THREE.Group) => void;
}

const Stars : React.FC<StarsProps> = (props) => {
    const ref = React.useRef<THREE.Group>();
    useFrame(() => {
        // console.log(ref.current.children)
        
    })
    
    return(
        <group ref={ref} >
            <Points limit={10000} positions={props.stars} scale={(Math.random()+1)}>
                <PointMaterial size={1} scale={0.1} color='white' sizeAttenuation={false}/>
            </Points>
        </group>
        
    )
}

export default Stars;