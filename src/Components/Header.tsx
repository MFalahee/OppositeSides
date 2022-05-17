import * as React from 'react'
import {PageHeader} from 'antd'
import { HeaderProps } from '../Helpers/CustomTypesIndex'


const Header: React.Element<HeaderProps> = (props) => {
    return (
    <PageHeader 
        className="site-page-header"
        // onBack={()=> {null}}
        title={props.title}
        subtitle={props.subtitle}/>
)}
export default Header;