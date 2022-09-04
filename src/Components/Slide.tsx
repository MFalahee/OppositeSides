import * as React from 'react'
import { Typography } from 'antd'
import { SlideProps } from '../../custom'
const { Paragraph } = Typography

const Slide: React.FC<SlideProps> = (props) => {
  if (props.activeSlide == props.id) {
    return (
      <div className="slide-wrapper active-slide">
        <div className="slide-content">
          <Paragraph className="slide-text">{props.content}</Paragraph>
        </div>
      </div>
    )
  } else {
    return (
      <div className="slide-wrapper">
        <div className="slide-content">
          <Paragraph className="slide-text">{props.content}</Paragraph>
        </div>
      </div>
    )
  }
}

export default Slide
