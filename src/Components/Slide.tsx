import * as React from 'react'
import { SlideProps } from '../../custom'

const Slide: React.FC<SlideProps> = (props) => {
  let slideContent = props.content
  if (props.content.includes('antipode')) {
    let t = props.content.split('antipode')
    return (
      <div className="slide-wrapper">
        <div className="slide-content">
          {t.map((i, l) => {
            return (
              <div className="antipode-text-container text-animation">
                <p className="slide-text">{i}</p>
                {l < i.length - 1 ? <p className="antipode-text">antipode</p> : null}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div className="slide-wrapper">
      <div className="slide-content text-animation">
        <p className="slide-text">{slideContent}</p>
      </div>
    </div>
  )
}
export default Slide
