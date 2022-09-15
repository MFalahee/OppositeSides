import * as React from 'react'
import { Slide } from './index'
import { SlideShowProps } from '../../custom'

const Slideshow: React.FC<SlideShowProps> = (props) => {
  return (
    <div className="slideshow-div">
      {props.slides.map((slide, index) => {
        return <Slide key={index} id={index} content={slide} />
      })}
    </div>
  )
}

export default Slideshow
