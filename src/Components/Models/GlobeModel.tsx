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
const GlobeModel: React.FC<JSX.IntrinsicElements['group']> = (props?) => {
  const group = React.useRef<THREE.Group | null>(null)
  const { nodes, materials } = Drei.useGLTF('scene.gltf') as GLTFResult
  const [startup, setStartup] = React.useState<Boolean>(true)
  const [phase, setPhase] = React.useState<number>(0)
  const timeRef = React.useRef<NodeJS.Timeout | null>(null)
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
    if (timeRef)
      timeRef.current = setTimeout(() => {
        if (phase < 5) setPhase(phase + 1)
      }, delay)
    return () => {
      resetTimeout()
    }
  }, [phase])

  useFrame(() => {
    if (startup && group.current !== null) {
      setStartup(false)
      group.current.rotateOnAxis(startupAxis, startupAngle)
      group.current.rotation.x += -5
    } else {
      if (group.current !== null) group.current.rotation.z += 0.002
      go(phase)
      invalidate()
    }
  })

  function go(phase: number) {
    if (!group.current) return
    else {
      if (phase >= 0) {
        switch (phase) {
          case 0:
            group.current.position.x += 0.0005
            group.current.position.z -= 0.01
            break
          case 1:
            group.current.position.x += 0.0005
            break
          case 2:
            group.current.position.x += 0.0005
            break
          case 3:
            group.current.position.z -= 0.0001
            break
          case 4:
            group.current.position.x += 0.0005
            group.current.position.z -= 0.0001
            break
          case 5:
            group.current.position.z < 0 ? (group.current.position.z += 0.001) : (group.current.position.z -= -0.001)
            break
          default:
            group.current.position.x += 0.0005
        }
      }
    }
  }

  if (nodes && materials && props) {
    materials['Material.002'].transparent = false
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh
          position={props.position}
          geometry={nodes.Sphere_Material002_0.geometry}
          material={materials['Material.002']}
          onWheel={(e) => {}}
        />
      </group>
    )
  } else {
    return null
  }
}

Drei.useGLTF.preload('scene.gltf')

export default GlobeModel
