import * as React from 'react'
import { Link } from 'react-router-dom'
import { Space } from 'antd'
import { Slide } from './index'
import { SlideShowProps } from '../../custom'

const Slideshow: React.FC<SlideShowProps> = (props) => {
  const [slideIndex, setSlideIndex] = React.useState(0)
  const [prevIndex, setPrevIndex] = React.useState(0)
  const [slides, setSlides] = React.useState(props.slides)
  const [slideCount, setSlideCount] = React.useState(props.slides.length)
  const timeRef = React.useRef<NodeJS.Timeout>()
  const delay = 5000

  function resetTimeout() {
    if (timeRef.current) {
      clearTimeout(timeRef.current)
    }
  }

  React.useEffect(() => {
    resetTimeout()
    timeRef.current = setTimeout(() => {
      if (slideIndex !== slides.length - 1) nextSlideHandler()
      // go next slide
    }, delay)
    return () => {
      resetTimeout()
    }
  }, [nextSlideHandler])

  function nextSlideHandler() {
    resetTimeout()
    if (slideIndex < slideCount - 1) {
      setPrevIndex(slideIndex)
      setSlideIndex(slideIndex + 1)
    } else {
      // last slide reached
      // need to change this to show options for next steps
      setPrevIndex(slideIndex)
      setSlideIndex(0)
    }
  }

  function prevSlideHandler() {
    resetTimeout()
    let temp = slideIndex
    if (temp > 0) {
      setPrevIndex(slideIndex)
      setSlideIndex(slideIndex - 1)
    } else {
      let t2 = slideCount - 1
      // first slide -> go to last slide
      setPrevIndex(0)
      setSlideIndex(slideCount - 1)
    }
  }

  document.addEventListener('keydown', (e) => {
    e.preventDefault()
    //    if they press enter or space, go forward a slide
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
      nextSlideHandler()
    } else if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
      prevSlideHandler()
    } else {
      e.preventDefault()
    }
  })

  return (
    <Space className="slideshow-space">
      {props.slides.map((slide, index) => {
        return <Slide key={index} id={index} content={slide} count={slideCount} activeSlide={slideIndex} />
      })}
    </Space>
  )
}

export default Slideshow
