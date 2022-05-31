import * as React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// d
import { MainView, LandingPage, TestView } from './Views/index'

// style sheet
import './Styles/root.scss'


// pass model position values based on slide


const App : React.FC = () => {
  return ( 
    <div className="view-wrapper">
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path='/go' element={<MainView />}/>
        <Route path='/dev' element={<TestView />}/>
      </Routes>
    </Router>
    </div>
  );
}
//need to rework this all into a router and have the landing page be the default page
//currently the main page is the landing page which is not the best design

export default App;