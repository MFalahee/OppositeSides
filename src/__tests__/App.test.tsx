import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from '@jest/globals'

import App from '../App'

describe('<App />', () => {
  test('renders without crashing', () => {
    // arrange
    const rend = render(<App />)
    // act
    // assert
  })
})

/* [Function: render] {
    debug: [Function: debug],
    logTestingPlaygroundURL: [Function: logTestingPlaygroundURL],
    findAllByLabelText: [Function (anonymous)],
    findByLabelText: [Function (anonymous)],
    getAllByLabelText: [Function (anonymous)],
    getByLabelText: [Function (anonymous)],
    queryAllByLabelText: [Function (anonymous)],
    queryByLabelText: [Function (anonymous)],
    findAllByPlaceholderText: [Function (anonymous)],
    findByPlaceholderText: [Function (anonymous)],
    getAllByPlaceholderText: [Function (anonymous)],
    getByPlaceholderText: [Function (anonymous)],
    queryAllByPlaceholderText: [Function (anonymous)],
    queryByPlaceholderText: [Function (anonymous)],
    findAllByText: [Function (anonymous)],
    findByText: [Function (anonymous)],
    getAllByText: [Function (anonymous)],
    getByText: [Function (anonymous)],
    queryAllByText: [Function (anonymous)],
    queryByText: [Function (anonymous)],
    findAllByDisplayValue: [Function (anonymous)],
    findByDisplayValue: [Function (anonymous)],
    getAllByDisplayValue: [Function (anonymous)],
    getByDisplayValue: [Function (anonymous)],
    queryAllByDisplayValue: [Function (anonymous)],
    queryByDisplayValue: [Function (anonymous)],
    findAllByAltText: [Function (anonymous)],
    findByAltText: [Function (anonymous)],
    getAllByAltText: [Function (anonymous)],
    getByAltText: [Function (anonymous)],
    queryAllByAltText: [Function (anonymous)],
    queryByAltText: [Function (anonymous)],
    findAllByTitle: [Function (anonymous)],
    findByTitle: [Function (anonymous)],
    getAllByTitle: [Function (anonymous)],
    getByTitle: [Function (anonymous)],
    queryAllByTitle: [Function (anonymous)],
    queryByTitle: [Function (anonymous)],
    findAllByRole: [Function (anonymous)],
    findByRole: [Function (anonymous)],
    getAllByRole: [Function (anonymous)],
    getByRole: [Function (anonymous)],
    queryAllByRole: [Function (anonymous)],
    queryByRole: [Function (anonymous)],
    findAllByTestId: [Function (anonymous)],
    findByTestId: [Function (anonymous)],
    getAllByTestId: [Function (anonymous)],
    getByTestId: [Function (anonymous)],
    */
