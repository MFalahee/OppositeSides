import App from '../App'
import '@testing-library/jest-dom'
import '@testing-library/react'
import '@googlemaps/typescript-guards'
import renderer from 'react-test-renderer';
import * as React from 'react';


// jest --updateSnapshot to update snapshot artifacts
// snapshot test of App
it('renders without crashing', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
})



