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
              <div key={i}className="antipode-text-container text-animation">
                <p className="slide-text">{i}</p>
                {l < i.length - 1 ? <p className="antipode-text">antipode</p> : null}
              </div>
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
