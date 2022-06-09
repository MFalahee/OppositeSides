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
      const globePosition = group.current.position
      const globeRotation = group.current.rotation
      const globeScale = group.current.scale
      const globeRadius = globeScale.x * 0.5
      const globeStats = {
        x: globePosition.x,
        y: globePosition.y,
        z: globePosition.z,
        rx: globeRotation.x,
        ry: globeRotation.y,
        rz: globeRotation.z,
        sx: globeScale.x,
        sy: globeScale.y,
        sz: globeScale.z,
        r: globeRadius
      }
      // console.log(globeStats)
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
  
  function moveGlobe(event: MouseEvent) {
    const x = event.clientX / window.innerWidth * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    const mouse = new THREE.Vector2(x, y);
    
    if (group.current !== null) {
      // move the globe by a bit based on the mouse position, but keep it within the bounds of the screen, and keep it out of the way of the sun (which is the center of the screen)
      const mousePosition = new THREE.Vector3(mouse.x, mouse.y, 5)
      group.current.position.set(mousePosition.x, mousePosition.y, mousePosition.z)

    }

  }


  if (nodes && materials) {
    document.addEventListener('mousemove', moveGlobe);
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