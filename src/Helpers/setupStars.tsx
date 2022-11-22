// @ts-ignore
import { onBox } from 'maath/random/dist/maath-random.esm'
export default function generateStarPositions(numStars: number) {
  let positionsBuffer
  positionsBuffer = onBox(new Float32Array(numStars), { sides: 50, center: [0, 0, 0] })
  const actualBuffer: Float32Array = positionsBuffer.map((pos: number) => {
    if (pos <= -2 || pos >= 2) {
      return pos * (Math.random() * 100)
    }
    return undefined
  })
  return actualBuffer
}
