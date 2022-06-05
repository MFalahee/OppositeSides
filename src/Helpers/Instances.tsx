import * as React from 'react'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import  { onBox } from 'maath/random/dist/maath-random.esm'
import { useFrame } from '@react-three/fiber';


interface StarsProps {
    radius?: number;
    radius2?: number;
    scale?: number;
}

const Stars : React.FC<StarsProps> = (props) => {
    const ref = React.useRef<THREE.Group>();
    let positionsBuffer = new Float32Array(50000);
    // Need to fix this and subtract the inner radius of positions.
    // would fix the inner radius of the stars that act weirdly.
    positionsBuffer = onBox(positionsBuffer,{sides: 100, center: [0,-15,0]});

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.00005;
        }
    })
    function moveStars(event: MouseEvent) {
        // console.log(event.clientX);
        // console.log(event.clientY);
        // I want this function to set the current rotation of Points towards the position of the cursor.
        // This effect should make the stars rotate smoothly around the screen towards the cursor.
        let w = window.innerWidth;
        let x = (event.clientX / w) * 2 - 1;
        let y = -(event.clientY / w) * 2 + 1;
        console.log(x, y)

        if (ref.current) {
            ref.current.rotation.x += x;
            ref.current.rotation.y += y;
        }

    }
    document.addEventListener('mousemove',moveStars);
    return(
        <group ref={ref}
        >
            <Points limit={10000} positions={positionsBuffer}>
                <PointMaterial size={1} scale={0.1} color='white' sizeAttenuation={false}/>
            </Points>
        </group>
        
    )
}

export default Stars;