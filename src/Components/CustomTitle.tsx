import * as React from 'react';
import { Typography } from 'antd';
import { CalculatorFilled } from '@ant-design/icons';

const { Text, Title, Link, Paragraph } = Typography;

interface CustomTitleProps {
    title: string;
}

const CustomTitle: React.FC<CustomTitleProps> = (props) => {
    let title_string = props.title
    let title_string_array = title_string.split('');
    React.useEffect(() => {
        const SpinInterval = setInterval(() => {
        }, 1000)
        return () => {
            clearInterval(SpinInterval)
        }
    }, [])

return (
    <Title className="lp-title">
       {title_string_array.map((letter, index) => {
              if (letter === ' ') {
                return <span key={index}>&nbsp;</span>
              } else {
                return <span key={index} className={`span-${index}`}>{letter}</span>
              }
       })}
    </Title>
)}

export default CustomTitle