import * as React from 'react';
import { Typography } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { SlideProps } from '../Helpers/CustomTypesIndex';
const {Paragraph, Title, Text} = Typography;


const Slide : React.FC<SlideProps> = (props) => {
        return (
            <div className="slide-wrapper">
                <div className="slide-content">
                    <Paragraph className="slide-text">{props.content}</Paragraph>
                    <UpOutlined className="next-slide-arrow" onClick={(event) => props.nextClick(event)} role="button"/>
                    <div className="slide-counter">{props.activeSlide+1}/{props.count}</div>
                    <DownOutlined className="prev-slide-arrow" onClick={(event) => props.prevClick(event)} role="button" />
                </div>
            </div>
        )
}

export default Slide;