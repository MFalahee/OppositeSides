import * as React from 'react';
import * as renderer from 'react-test-renderer';
import App from '../App';
describe('My App', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('renders correctly', () => {
        const tree = renderer.create(<App />).toJSON();
    });
});