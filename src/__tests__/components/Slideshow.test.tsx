import * as React from 'react';
import * as testReact from '@testing-library/react';
import '@testing-library/jest-dom'
const { screen } = require('@testing-library/dom');
import { Slideshow } from '../../Components/index';

const introSlides = [
    'In a time of great uncertainty-',
    'When our basic ideals are causing deadly fights between us,',
    // Transition
    'We know so much about what plagues the world and our society,',
    'Yet, we can\'t seem to come together to stop it.',
    // Transition
    'Aren\'t you sick of it?',
    'I am.',
    // break
    // extra info if curious
    'I made a whimsical website that finds your antipode.',
    'Yeah, I didn\'t know that was a thing either.',
    'An [[Antipode]] is the opposite side of the planet from where you are standing (most likely sitting) right now.',
    'Lets shoot a line straight through the earth and see where it hits.',
];

describe('Slideshow Component', () => {
        it('renders properly, starting with the first slide', async () => {
                testReact.render(<Slideshow slides={introSlides} />)
                expect(screen.getByText(introSlides[0])).toBeInTheDocument();
        });
        it('has a next slide button that properly changes the active slide', async () => { });
        it('has a previous slide button that properly changes the active slide', async () => { });
});