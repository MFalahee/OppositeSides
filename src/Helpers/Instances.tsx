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
    
    function moveStars(event: MouseEvent) {
        // I want this function to set the current rotation of Points towards the position of the cursor.
        // This effect should make the stars rotate smoothly around the screen towards the cursor.
        let w = window.innerWidth;
        let h = window.innerHeight;
        let x = event.clientX;
        let y = event.clientY;
        if (ref.current) {
            let x_pos = ((x / w) * 2) + 1;
            let y_pos = ((y / h) * 2) + 1;
            ref.current.rotation.x = (y_pos * 0.3);
            ref.current.rotation.y = (x_pos * 0.3);
        }
    }
    document.addEventListener('mousemove', moveStars);
    return(
        <group ref={ref}>
            <Points limit={10000} positions={props.stars}>
                <PointMaterial size={1} scale={0.1} color='white' sizeAttenuation={false}/>
            </Points>
        </group>
        
    )
}

export default Stars;