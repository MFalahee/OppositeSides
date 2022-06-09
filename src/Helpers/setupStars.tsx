// @ts-ignore
import  { onBox } from 'maath/random/dist/maath-random.esm'
export default function generateStarPositions(numStars: number) {
    let positionsBuffer;
    positionsBuffer = (onBox(new Float32Array(50000),{sides: 1000, center: [0,-15,0]}));
    const actualBuffer: Float32Array = positionsBuffer.map((pos: number) => { 
        if ((pos >= 5) || (pos <= -5)) {
            return pos;
        }
    })
    return actualBuffer;
}