import * as THREE from 'three'
import * as React from 'react'
import * as Drei from '@react-three/drei'
import { invalidate, useFrame } from '@react-three/fiber'
// @ts-ignore
type GLTFResult = GLTF & {
  nodes: {
    Sphere_Material002_0: THREE.Mesh
  }
  materials: {
    ['Material.002']: THREE.MeshStandardMaterial
  }
}
// eventually maybe a resize function to make the globe bigger or smaller when the user hovers and mousewheels?
// Going to sync this with the slideshow component.
// Need to add "step" out of steps to the props in order to make the globe animate alongside the slideshow.
// Maybe add cool hover effects to the globe? Outline the globe with a glowy outline?
const GlobeModel: React.FC<JSX.IntrinsicElements['group']> = (props?) => {
  const group = React.useRef<THREE.Group>()
  const { nodes, materials } = Drei.useGLTF('scene.gltf') as GLTFResult
  const [mode, setMode] = React.useState<String>('normal')
  const [startup, setStartup] = React.useState<Boolean>(true);
  const [startupAxis, setStartupAxis] = React.useState<THREE.Vector3>(new THREE.Vector3(-1, 0, 0));
  const [startupAngle, setStartupAngle] = React.useState<number>(1.5708)

  
  useFrame(() => {
    if (startup) {
      setStartup(false)
      group.current.rotateOnAxis(startupAxis, startupAngle)
    }


    const location = window.location.pathname.toString()
    if (location === '/') {
      setMode('normal')
    } else if (location === '/go') {
      setMode('go')
    } 
    if (mode === 'normal') {
      group.current.rotation.z += 0.001;
      invalidate();
    }
    else if (mode === 'go') {
  
    } 
    invalidate();
  })
  

  if (nodes && materials) {
    
    materials['Material.002'].transparent = false;
  return (
    <group ref={group} {...props} dispose={null}>
            <mesh geometry={nodes.Sphere_Material002_0.geometry} material={materials['Material.002']} onWheel={(e) => {
            }} />
          </group>
  )}
  else {
    return null
  } 
}

Drei.useGLTF.preload('scene.gltf')

export default GlobeModel;