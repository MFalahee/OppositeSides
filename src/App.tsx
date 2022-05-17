import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// d
import { MainView, LandingPage } from './Views/index'

// style sheet
import './Styles/root.scss'


const App : React.FC = () => {
  return ( 
    <div className = "App" >
      <MainView />
    </div>
  );
}
//need to rework this all into a router and have the landing page be the default page
//currently the main page is the landing page which is not the best design

export default App;