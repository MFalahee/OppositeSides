import * as THREE from 'three'
import * as React from 'react'
import * as Drei from '@react-three/drei'
import { invalidate, useFrame, useThree } from '@react-three/fiber'

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
  const [startup, setStartup] = React.useState<Boolean>(true);
  const startupAxis = new THREE.Vector3(-1, 0, 0);
  const startupAngle = 1.5708;


  useFrame(() => {
    // might make sense to redo this with a switch case based on frame count
    // that way I can more clearly define the steps of the animation on the landing page.

    if (startup) {
      setStartup(false)
      group.current.rotateOnAxis(startupAxis, startupAngle);
      console.log('GLOBE MODEL SETUP')
      console.log(group.current)
      console.log('---------------------------')
    }
    let location = window.location.pathname;
    if (location === '/go') {
      // console.log(group.current.parent)
      
      // I think this is where we put the logic to move our mini globe.
    } else {
      group.current.rotation.z += 0.001;
      invalidate();
    }
    // console.log(location)
    
  })

  if (nodes && materials) {
    materials['Material.002'].transparent = false;
  return (
    <group ref={group} {...props} dispose={null}>
    <mesh geometry={nodes.Sphere_Material002_0.geometry} material={materials['Material.002']} onWheel={(e) => { }} />
    </group>
  )} else {
    return(
      null
    )
  }
}

Drei.useGLTF.preload('scene.gltf')

export default GlobeModel;

