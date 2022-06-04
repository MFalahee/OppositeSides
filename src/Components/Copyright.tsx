import * as React from 'react';
import { Typography } from 'antd';
const { Text } = Typography;

const Copyright: React.FC = () => {
    return(
    <div className="copyright-wrapper" role="group" aria-label='cr'>
        <Text>Copyright © 2022 - Michael Falahee</Text>
    </div>
    )
}

export default Copyright;