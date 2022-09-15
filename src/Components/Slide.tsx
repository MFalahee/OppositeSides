import * as React from 'react'
import { SlideProps } from '../../custom'

const Slide: React.FC<SlideProps> = (props) => {
  let slideContent = props.content

  const SlideText: React.FC<{ content: string | string[] }> = (zzz) => {
    if (typeof zzz.content === 'string') {
      return <p className="slide-text">{zzz.content}</p>
    }
  }

  return (
    <div className="slide-wrapper">
      <div className="slide-content text-animation">
        <SlideText content={slideContent} />
      </div>
    </div>
  )
}
export default Slide
