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
  const [startup, setStartup] = React.useState<Boolean>(true)
  const [phase, setPhase] = React.useState<number>(0)
  const timeRef = React.useRef<NodeJS.Timeout>(null)
  const startupAxis = new THREE.Vector3(1, 0, 0)
  const startupAngle = 3.14159
  const delay = 10000

  function resetTimeout() {
    if (timeRef.current) {
      clearTimeout(timeRef.current)
    }
  }
  React.useEffect(() => {
    resetTimeout()
    timeRef.current = setTimeout(() => {
      if (phase < 5) setPhase(phase + 1)
    }, delay)
    return () => {
      resetTimeout()
    }
  }, [phase])

  // every frame do this -- hook
  useFrame(() => {
    if (startup) {
      setStartup(false)
      group.current.rotateOnAxis(startupAxis, startupAngle)
      group.current.rotation.x += -5
    }
    group.current.rotation.z += 0.002
    go(phase)
    invalidate()
  })

  function go(phase: number) {
    if (phase >= 0) {
      switch (phase) {
        case 0:
          console.log('go: phase: ', phase, ' time: ', timeRef.current)
          group.current.position.x += 0.0005
          group.current.position.z -= 0.01
          break
        case 1:
          console.log('go: phase: ', phase, ' time: ', timeRef.current)
          group.current.position.x += 0.0005
          break
        case 2:
          console.log('go: phase: ', phase, ' time: ', timeRef.current)
          group.current.position.x += 0.0005
          break
        case 3:
          console.log('go: phase: ', phase, ' time: ', timeRef.current)
          group.current.position.z -= 0.0001
          break
        case 4:
          console.log('go: phase: ', phase, ' time: ', timeRef.current)
          group.current.position.x += 0.0005
          group.current.position.z -= 0.0001
          break
        case 5:
          console.log('go: phase: ', phase, ' time: ', timeRef.current)
          group.current.position.z < 0 ? (group.current.position.z += 0.001) : (group.current.position.z -= -0.001)
          break
        default:
          group.current.position.x += 0.0005
      }
    }
  }

  if (nodes && materials) {
    materials['Material.002'].transparent = false
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh geometry={nodes.Sphere_Material002_0.geometry} material={materials['Material.002']} onWheel={(e) => {}} />
      </group>
    )
  } else {
    return null
  }
}

Drei.useGLTF.preload('scene.gltf')

export default GlobeModel
