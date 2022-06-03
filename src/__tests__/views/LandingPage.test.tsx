import * as React from 'react';
import * as testReact from '@testing-library/react';
import '@testing-library/jest-dom'
const { screen } = require('@testing-library/dom');
/*
*
*/

import { LandingPage }from '../../Views/index';




describe('Landing Page View', () => {
    it('renders properly', async () => {
        const div = testReact.render(<div />);
        const { container } = testReact.render(<LandingPage />, div);
        expect(container).toMatchSnapshot();
    });
    it('has a container div with className view-wrapper', async () => {
        const app = testReact.render(<LandingPage />);
        const div = screen.getByRole('group', {name: 'vw'});
        expect(div).toBeInTheDocument();
    });
    it('has a 3d canvas element with className canvas-element', async () => {
        const app = testReact.render(<LandingPage />);
        const canvas = screen.getByRole('group', {name: 'cw'});
        expect(canvas).toBeInTheDocument();
    });
    it('has a slideshow element that renders properly, starting with the first slide', async () => {
        const app = testReact.render(<LandingPage />);
        screen.getByText('In a time of great uncertainty-')
        });
});