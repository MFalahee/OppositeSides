import * as React from 'react'
import { Slide } from './index'
import { SlideShowProps } from '../../custom'

const Slideshow: React.FC<SlideShowProps> = (props) => {
  function downArrow(e: React.MouseEvent) {
    let target = document.querySelector('.map-page-wrapper')
    target.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  return (
    <div className="slideshow-div">
      {props.slides.map((slide, index) => {
        return <Slide key={index} id={index} content={slide} />
      })}
      <button className="arrow-button down" onClick={(e) => downArrow(e)}>
        <img src="up-arrow.png" />
      </button>
    </div>
  )
}

export default Slideshow
