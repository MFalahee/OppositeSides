import * as React from 'react';
import { CloseSquareOutlined } from '@ant-design/icons';

const ErrorComponent: React.FC = () => { 
    return (
        <div className="error-component-wrapper">
            <CloseSquareOutlined className="error-component-icon" />
            <div className="error-component-text">
                <h1>Uh-oh!</h1>
                <p>Something went wrong. Please try again later.</p>
            </div>
        </div>
)}

export default ErrorComponent;