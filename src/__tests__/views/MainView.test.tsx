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

    it('contains a smaller 3d canvas in the upper right corner made to resemble a "minimap"', async () => {
    });

    it('contains a text field with name main-view-text-field, which has a few functions', async () => {
        it('is selected by name main-view-text-field', async () => {
            expect(screen.querySelector('.main-view-text-field')).toBeInTheDocument();
        });
        it('displays information placeholder info in the relevant fields', async () => {
            expect(screen.getByPlaceholderText('Current Location: ')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('City: ')).toBeInTheDocument();
        })
        it('takes the location from googlemap and displays it in the relevant fields', async () => {});
        it('takes the weather from the weather api and displays it in the relevant fields', async () => {});

    });
});
