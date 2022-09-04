import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThePage } from './Views/index'
import './Styles/root.scss'

const App: React.FC = () => {
  const t = document.body.getBoundingClientRect().top
  return (
    <div className="app-wrapper" id="app-wrapper">
      <ThePage />
    </div>
  )
}

export default App
