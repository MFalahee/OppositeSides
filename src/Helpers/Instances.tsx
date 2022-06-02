import * as React from 'react'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei';
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
    positionsBuffer = onBox(positionsBuffer,{sides: 100, center: [0,-15,0]});

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.00005;
        }
    })

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