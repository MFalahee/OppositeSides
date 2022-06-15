import * as React from 'react';
import { Typography } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { SlideProps } from '../Helpers/CustomTypesIndex';
const {Paragraph, Title, Text} = Typography;


const Slide : React.FC<SlideProps> = (props) => {
  
    if (props.activeSlide == props.id) {
        return (
            <div className="slide-wrapper active-slide">
                <div className="slide-content">
                    <Paragraph className="slide-text">{props.content}</Paragraph>
                    <UpOutlined className="next-slide-arrow" onClick={(event) => props.nextClick(event)} role="button"/>
                    <div className="slide-counter">{props.activeSlide+1}/{props.count}</div>
                    <DownOutlined className="prev-slide-arrow" onClick={(event) => props.prevClick(event)} role="button" />
                </div>
            </div>
        )
    }
    else {
        return null
    }
}

export default Slide;