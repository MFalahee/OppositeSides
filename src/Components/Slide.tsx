import * as React from 'react'
import { SlideProps } from '../../custom'

const Slide: React.FC<SlideProps> = (props) => {
  let slideContent = props.content

  const SlideText: React.FC<{ content: string | string[] }> = (zzz) => {
    let c = zzz.content
    if (typeof c === 'object') {
      return (
        <p className="slide-text">
          {c.map((item, index) => {
            return (
              <span key={index} className={`slide-span-${index} text-animation`}>
                {item}
              </span>
            )
          })}
        </p>
      )
    }
    // default case
    return <p className="slide-text text-animation">{c}</p>
  }

  return (
    <div className="slide-wrapper">
      <div className="slide-content">
        <SlideText content={slideContent} />
      </div>
    </div>
  )
}
export default Slide
