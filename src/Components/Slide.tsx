import * as React from 'react';
import { Typography } from 'antd';
import { NumberLiteralType } from 'typescript';

const {Paragraph, Title, Text} = Typography;


interface SlideProps {
    id: number;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    content: [string];
}
const Slide : React.FC<SlideProps> = (props) => {
    return(
        <Paragraph className="slide-paragraph">
            {props.content}
        </Paragraph>
    )
}

