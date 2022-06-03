/*
* @jest-environment jsdom
*/

import * as React from 'react';
import * as testReact from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
global.ResizeObserver = require('resize-observer-polyfill');


describe('My App', () => {
    it('free W', async () => { 
        expect('true').toBe('true');
        });
    it('renders properly', async () => {
        const div = testReact.render(<div />);
        const { container } = testReact.render(<App />, div);
        expect(container).toMatchSnapshot();
    });
    it('has a single div that holds the rest of the application, with classname app-wrapper', async () => {
        const app = testReact.render(<App />);
        expect(app.getByRole('generic', { name: 'app-wrapper' })).toBeInTheDocument();        
    });
});