import * as React from 'react';
import { Typography } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

const {Paragraph, Title, Text} = Typography;


interface SlideProps {
    id: number;
    nextClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    prevClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    content: string;
    activeSlide: number;
    count: number;
}

const Slide : React.FC<SlideProps> = (props) => {
    const [isActive, setIsActive] = React.useState(false);
    const [isHover, setIsHover] = React.useState(false);

    React.useEffect(() => {
        if (props.activeSlide === props.id) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [props.activeSlide])
    if (isActive) {
        return (
            <div className="slide-wrapper active-slide" onClick={props.nextClick}>
                <div className="slide-content">
                    <Paragraph className="slide-text">{props.content}</Paragraph>

                    {/* the previous arrow button is currently broken. Going to next slide instead of previous. */}
                    <UpOutlined className="next-slide-arrow" onClick={props.nextClick} role="button"/>
                    <span className="slide-counter">{props.activeSlide+1}/{props.count}</span>
                    <DownOutlined className="prev-slide-arrow" onClick={props.prevClick} role="button" />
                </div>
            </div>
        )
    } else {
        return (
            <div className="slide-wrapper">
                <div className="slide-content">
                    <Paragraph>{props.content}</Paragraph>
                    
                </div>
            </div>
        )
    }
}

export default Slide;