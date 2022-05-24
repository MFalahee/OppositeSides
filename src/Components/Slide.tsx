import * as React from 'react';
import { Typography } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

const {Paragraph, Title, Text} = Typography;


interface SlideProps {
    id: number;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    content: string;
    activeSlide: number;
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
        console.log(props)
        return (
            <div className="slide-wrapper active-slide" onClick={props.onClick}>
                <div className="slide-content">
                    <Paragraph>{props.content}</Paragraph>
                    <UpOutlined className="next-slide-arrow" onClick={props.onClick} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="slide-wrapper" onClick={props.onClick}>
                <div className="slide-content">
                    <Paragraph>{props.content}</Paragraph>
                    
                </div>
            </div>
        )
    }
}

export default Slide;