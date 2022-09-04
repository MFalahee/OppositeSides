import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThePage } from './Views/index'
import './Styles/root.scss'

const App: React.FC = () => {
  return (
    <div className="app-wrapper" id="app-wrapper" role="region">
      <Router>
        <Routes>
          <Route path="/" element={<ThePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
