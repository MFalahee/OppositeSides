import * as React from 'react'
import { ThePage } from './Views/index'
import './Styles/root.scss'

const App: React.FC = () => {
  const t = document.body.getBoundingClientRect().top
  // for the top of the page button
  const goToTop = () => {
    let t = document.querySelector('.scroll-container')
    t.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }
  const createArrowButton = () => {
    let b = document.createElement('button')
    let s = document.createElement('span')
    let img = document.createElement('img')
    b.className = 'top-btn'
    b.id = 'arrow-to-top-btn'
    b.addEventListener('click', () => {
      goToTop()
    })
    s.className = 'top-text-span'
    img.className = 'top-img'
    s.innerText = 'to Top'
    img.src = '/up-arrow.png'
    b.appendChild(s)
    b.appendChild(img)
    return b
  }
  const clearButton = () => {
    let b = document.getElementById('arrow-to-top-btn')
    document.getElementById('arrow-to-top').removeChild(b)
  }

  React.useEffect(() => {
    //create button and scroll obs
    let button = createArrowButton()
    document.querySelector('#arrow-to-top').appendChild(button)
    return () => {
      clearButton()
    }
  }, [])
  return (
    <div className="app-wrapper" id="app-wrapper">
      <div id="arrow-to-top"></div>
      <ThePage />
    </div>
  )
}

export default App
