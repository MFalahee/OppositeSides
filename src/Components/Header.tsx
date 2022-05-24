import * as React from 'react'
import {PageHeader} from 'antd'
import { HeaderProps } from '../Helpers/CustomTypesIndex'

// this is the header component that will be used in the main view
// I'd like to add a light/dark mode toggle to this component


const Header: React.FC<HeaderProps> = (props) => {
    return (
    <PageHeader 
        className="site-page-header"
        // onBack={()=> {null}}
        title={props.title}
        subTitle={props.subtitle}
        />
)}
export default Header;