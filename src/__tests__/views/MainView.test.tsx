import * as React from 'react';
import * as testReact from '@testing-library/react';
import '@testing-library/jest-dom'
const { screen } = require('@testing-library/dom');
const { initialize, Map, Marker, mockInstances } = require('@googlemaps/jest-mocks')
import { MainView } from '../../Views/index';

beforeEach(() => {
    initialize();
    testReact.render(<MainView />);
});

afterEach(()=> {
    testReact.cleanup();
})

describe('Main View', () => { 
    it('renders properly', async () => {
        expect(screen).toMatchSnapshot();
    });
    it('contains a header with title Opposite Sides', async () => {
        expect(screen.getByTitle('Opposite Sides')).toBeInTheDocument();
    });
    it('contains a map component', async () => {

    });
    it('contains a copyright on the bottom of the page', async () => {
        expect(screen.getByRole('group', {name: 'cr'})).toBeInTheDocument();
    });
});
