import { UpOutlined, DownOutlined } from '@ant-design/icons';
import * as React from 'react';

interface ExpandIconProps {
    isExpanded: boolean;
    expandClick: (e: React.MouseEvent, index: number) => void;
    collapseClick: (e: React.MouseEvent, index: number) => void;
    index: number;
}

const ExpandIcon: React.FC<ExpandIconProps> = (props) => {
    if (props.isExpanded) {
        // if (props.index === 0) return null;
        // return (
        //     <UpOutlined onClick={(e) => props.collapseClick(e, props.index)} />
        // );
        return null
    } else {
        // this needs to be a down arrow
        // expands when clicked
        return (
            <DownOutlined className="down-arrow" onClick={(e) => props.expandClick(e, props.index)} />
        );
    }};


export default ExpandIcon