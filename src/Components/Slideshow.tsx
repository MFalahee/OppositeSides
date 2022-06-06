import * as React from 'react';
import { Typography, Space } from 'antd';
import { Slide } from './index'

interface SlideShowProps {
    slides: Array<string>;
}



const Slideshow : React.FC<SlideShowProps> = (props) => {
    const [slideIndex, setSlideIndex] = React.useState(0);
    const [slides, setSlides] = React.useState(props.slides);
    const [slideCount, setSlideCount] = React.useState(props.slides.length);
    const [slideWidth, setSlideWidth] = React.useState(0);
    const [slideHeight, setSlideHeight] = React.useState(0);


    React.useEffect(() => {
        setSlideCount(props.slides.length)
        setSlideIndex(0);
    }, [props.slides])

    function nextSlideHandler() {
        if (slideIndex < slideCount - 1) {
            setSlideIndex(slideIndex + 1);
        } else {
            // last slide reached
            // need to change this to show options for next steps
            setSlideIndex(0);
        }
    }

    function prevSlideHandler() {
        if (slideIndex > 0) {
            setSlideIndex(slideIndex - 1);
        } else {
            // first slide reached
            // need to change this to show options for next steps
            setSlideIndex(slideCount - 1);
        }
    }

    function click(e: React.MouseEvent<HTMLDivElement, MouseEvent>, handler: () => void) { 
        handler();
    }

    return(
        <Space className="slideshow-space">
            {props.slides.map((slide, index) => { 
                return(
                    <Slide key={index} id={index} content={slide} activeSlide={slideIndex} nextClick={(e) => click(e, nextSlideHandler)} prevClick={(e) => click(e, prevSlideHandler)}/>
            )})}
        </Space>
    )
}

export default Slideshow;
/* Temp storage for text content of landing page 
*
*
*
*
In a time of great uncertainty- 
When being on "opposite sides" invokes childishness, or even hate and pain,
Aren't you sick of it?
I am. 
So I made a whimsical website that flips the world upside down. or something. 
*
*
*
*
*/