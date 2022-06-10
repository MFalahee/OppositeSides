import * as React from 'react';
import { Typography, Space } from 'antd';
import { Slide } from './index'
import { SlideShowProps } from '../Helpers/CustomTypesIndex';

const Slideshow : React.FC<SlideShowProps> = (props) => {
    const [slideIndex, setSlideIndex] = React.useState(0);
    const [prevIndex, setPrevIndex] = React.useState(0);
    const [slides, setSlides] = React.useState(props.slides);
    const [slideCount, setSlideCount] = React.useState(props.slides.length);

    React.useEffect(() => {
        // console.log('slides changed');
    }, [props.slides])

    React.useEffect(() => {
        // console.log('change active slide');
        setActiveSlide(slideIndex);
    }, [slideIndex])

    function setActiveSlide(index: number) {
        const prevActive = document.getElementsByClassName('active-slide');
        if (prevActive.length > 0) { 
            prevActive[0].classList.remove('active-slide');
        }

        const nextActive = document.getElementsByClassName('slide-wrapper')[index];
        nextActive.classList.add('active-slide');
    }

    function nextSlideHandler() {
        // console.log('next slide');
        // console.log('slideIndex: ', slideIndex)
        if (slideIndex < slideCount - 1) {
            setPrevIndex(slideIndex);
            setSlideIndex(slideIndex + 1);
        } else {
            // last slide reached
            // need to change this to show options for next steps
            setPrevIndex(slideIndex);
            setSlideIndex(0);
        }
    }
    function prevSlideHandler() {
        let temp = slideIndex;
        // console.log('prev slide');
        // console.log('slideIndex: ', temp)
        if (temp > 0) { 
            setPrevIndex(slideIndex);
            setSlideIndex(slideIndex - 1);
        } else {
            let t2 = slideCount - 1;
            // first slide -> go to last slide
            setPrevIndex(0);
            setSlideIndex(slideCount-1);
        }
    }

    function click(e: React.MouseEvent<HTMLSpanElement, MouseEvent>, handler: () => void) { 
        handler();
    }

    return(
        <Space className="slideshow-space">
            {props.slides.map((slide, index) => { 
                return(
                    <Slide key={index} id={index} content={slide} count={slideCount} activeSlide={slideIndex} nextClick={(e?) => click(e, nextSlideHandler)} prevClick={(e?) => click(e, prevSlideHandler)}/>
            )})}
        </Space>
    )
}

export default Slideshow;