import App from '../App'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';
import * as React from 'react';


//jest --updateSnapshot to update snapshot artifacts
// snapshot test
it('renders without crashing', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
})

it('renders a div with class App', () => {
    const comp = render(<App />)
    const div = screen.getByTestId('app')
    expect(div).toBeInTheDocument()
})





