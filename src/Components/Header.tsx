import * as React from 'react'
import {PageHeader} from 'antd'
import { HeaderProps } from '../Helpers/CustomTypesIndex'

const Header: React.FC<HeaderProps> = (props) => {
    return (
    <PageHeader 
        className="site-page-header"
        title={props.title}
        subTitle={props.subtitle}
        />
)}
export default Header;