import * as React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { MainView, LandingPage } from './Views/index'
import './Styles/root.scss'

const App : React.FC = () => {
  return ( 
    <div className="app-wrapper" id="app-wrapper" role="region">
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path='/go' element={<MainView />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;