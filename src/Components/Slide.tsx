import * as React from 'react'
import { SlideProps } from '../../custom'

const Slide: React.FC<SlideProps> = (props) => {
  let slideContent = props.content

  const SlideText: React.FC<{ content: string | string[] }> = (zzz) => {
    let content = zzz.content
    if (typeof content === 'object') {
      return (
        <p className="slide-text">
          {content.map((item, index) => {
            return (
              <div key={index} className="antipode-text-container text-animation">
                <p className="slide-text">{item}</p>
              </div>
            )
          })}
        </p>
      )
    }
    // default case
    return <p className="slide-text text-animation">{content}</p>
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
