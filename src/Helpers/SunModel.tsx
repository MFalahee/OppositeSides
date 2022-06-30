import * as THREE from 'three'
import * as React from 'react'
import * as Drei from '@react-three/drei'
import { invalidate, useFrame } from '@react-three/fiber'

// @ts-ignore
type GLTFResult = GLTF & {
  nodes: {
    Sphere: THREE.Mesh
    "Cube.001:"?: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial,
    ['Smoke Domain Material']: THREE.MeshStandardMaterial,
  }

}

const SunModel : React.FC<JSX.IntrinsicElements['group']> = (props) => {
    const group = React.useRef<THREE.Group>()
    const { nodes, materials } = Drei.useGLTF('sun.gltf') as GLTFResult
    useFrame(() => {
        group.current.rotation.z += 0.01
        invalidate();
    })
    if (nodes && materials) {
      materials['Material.001'].transparent = false;
    return (
            <group {...props} ref={group} dispose={null} >
                <mesh geometry={nodes.Sphere.geometry} material={materials['Material.001']}/>
            </group>
    )} else {
        return null
    }
}


Drei.useGLTF.preload('sun.gltf')


export default SunModel;