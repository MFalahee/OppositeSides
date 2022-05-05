import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/react-dom'
import '@testing-library/react-hooks'


import MainView from '../../Views/MainView'

//arrange act assert

/* 

Views

*/
//test render

describe('MainView', () => {
    it('MainView renders both children correctly', async () => { 
        render(<MainView />)
        expect(screen.getByRole('mainTitle')).toBeInTheDocument()
        expect(screen.getByRole('GoogleMaps')).toBeInTheDocument()
    })
})