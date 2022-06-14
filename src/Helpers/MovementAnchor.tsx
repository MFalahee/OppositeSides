import * as THREE from 'three'
import * as React from 'react'
import '@react-spring/three';
import { invalidate, useFrame, useThree } from '@react-three/fiber'
import { useSpring, a} from 'react-spring';
import { Group } from 'antd/lib/avatar';

/* 

this was a decent idea but it makes the canvas too laggy for now I think.

*/


interface AnchorProps {
    scale? : THREE.Vector3,
    position? : THREE.Vector3,
    rotation? : THREE.Euler,
    color? : string,
    active? : boolean,
}

const MovementAnchor: React.FC<AnchorProps> = (props?) => { 
    const myMesh = React.useRef<THREE.Mesh>()
    const startingPos = new THREE.Vector3(2,2,8);
    const middlePos = new THREE.Vector3(2, 0, 1);
    const finalPos = new THREE.Vector3(-40,-5,-20);

    let stage = 0;
    let toggle = [0,1,2,3,4,5,6,7,8,9];

    React.useEffect(() => {
    }, [])

    
    React.useEffect(() => {
        console.log('anchor ref changes')
    }, [myMesh])

    React.useEffect(() => {
        console.log('anchor active')
    }, [props.active, stage])

    useFrame(() => {
        (myMesh.current as THREE.Mesh).visible = (toggle[0] == 0 || toggle[0] == 1) ? false: true;
        if (props.active) {
            switch (stage) {
                case 0: // move to middle
                    if (myMesh.current.position.y > middlePos.y) {
                        myMesh.current.position.y -= 0.01;
                    } 
                    if (myMesh.current.position.z > middlePos.z) {
                        myMesh.current.position.z -= 0.01;
                    }
                    if (myMesh.current.position === middlePos) {
                        stage = 1;
                    }
                    break;
                case 1: // move to final
                    if (myMesh.current.position.y > finalPos.y) {
                        myMesh.current.position.y -= 0.01;
                    }
                    if (myMesh.current.position.z > finalPos.z) {
                        myMesh.current.position.z -= 0.01;
                    }
                    if (myMesh.current.position === finalPos) {
                        stage = 2;
                    }
                    break;
            }
            if ((myMesh.current.position.y === middlePos.y) && (myMesh.current.position.z === middlePos.z)) {
                    stage = 1;
            }
        }
        toggle.unshift(toggle.pop());
    })
        
        return(
        <mesh ref={myMesh} {...props} dispose={null} position={startingPos}>
            <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
            <meshPhongMaterial color="yellow" attach="material" />
        </mesh>
        )
}

export default MovementAnchor;