import * as React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Space, Button } from 'antd';
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

    function RenderButton() {
        if (slideIndex === props.slides.length - 1) {
            return (
                <Link to="/go">
                    <Button  className="lp-button" type="primary" size="large" shape="round" style={{marginTop: '1rem'}}>
                        GO -{'>'} 
                    </Button>
                </Link>
            )
        }
            // at end of slides, render go button
            // at half of slides render skip button
        else  {
                return (
           <Link to="/go">
                <Button className="lp-button" color="white">
                   {'Skip ->'}
                </Button>
            </Link>
                )}  
    }
    document.removeEventListener('keydown', () => {
        
    });
    document.addEventListener('keydown', (e) => {
        //    if they press enter or space, go forward a slide
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
            nextSlideHandler();
        } else if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
            prevSlideHandler();
        } else {
            // console.log('key pressed: ', e.key);
        }
        })

    return(
        <Space className="slideshow-space">
            {props.slides.map((slide, index) => { 
                return(
                    <Slide key={index} id={index} content={slide} count={slideCount} activeSlide={slideIndex} nextClick={(e?) => click(e, nextSlideHandler)} prevClick={(e?) => click(e, prevSlideHandler)}/>
            )})}
                <RenderButton/>        
            </Space>
    )
}

export default Slideshow;