import * as React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

const Copyright: React.FC = () => {
    const clickHandler = (e : React.MouseEvent) => {
        e.preventDefault();
        //display attribution info as a pop up info window
        alert('Attribution: \'')
    }
    return(
    <div className="copyright-wrapper">
        <Text>Made with <span onClick={(e) => clickHandler(e)}>Help</span></Text>
        <Text>Copyright © 2022 - Michael Falahee</Text>
    </div>
    )
}

export default Copyright;