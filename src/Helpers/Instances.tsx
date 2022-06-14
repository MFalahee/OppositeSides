import * as React from 'react'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import { invalidate, useFrame } from '@react-three/fiber';

interface StarsProps {
    radius?: number;
    radius2?: number;
    scale?: number;
    stars?: Float32Array;
    fn?: (event: MouseEvent, stars: THREE.Group) => void;
}

const Stars : React.FC<StarsProps> = (props) => {
    const [mode, setMode] = React.useState('normal')
    const [setup, setSetup] = React.useState<Boolean>(true);
    const ref = React.useRef<THREE.Group>();
    useFrame(() => {
        const location = window.location.pathname.toString()
        if (location === '/') {
          setMode('normal')
        } 
        if (mode === 'normal') {
        if (ref.current) {
            ref.current.rotation.y += 0.00005;
        }
    }
    if (mode === 'go') {
        // animate for maps page
        //
    }})
    
    return(
        <group ref={ref} >
            <Points limit={10000} positions={props.stars}>
                <PointMaterial size={1} scale={0.1} color='white' sizeAttenuation={false}/>
            </Points>
        </group>
        
    )
}

export default Stars;