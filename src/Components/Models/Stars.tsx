import * as React from 'react'
import * as THREE from 'three'
import { Points, PointMaterial } from '@react-three/drei'
// @ts-ignore
import { useFrame } from '@react-three/fiber'
import { StarsProps } from '../../../custom'

const Stars: React.FC<StarsProps> = (props) => {
  const group = React.useRef<THREE.Group | null>(null)
  useFrame(() => {
    if (group.current !== null && props.fn) {
      props.fn(group.current)
    }
  })
  return (
    <group ref={group}>
      <Points limit={10000} positions={props.stars} scale={Math.random() + 1}>
        <PointMaterial size={1} scale={0.1} color="white" sizeAttenuation={false} />
      </Points>
    </group>
  )
}
export default Stars
