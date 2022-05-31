import * as React from 'react';
import { Typography } from 'antd';
const { Title, Text, Link } = Typography;

const Copyright: React.FC = (props) => {
    return(
    <div className="copyright-wrapper">
        <Text>Copyright © 2022 - Michael Falahee</Text>
    </div>
    )
}

export default Copyright;