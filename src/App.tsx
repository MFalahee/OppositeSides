import * as React from 'react'
import { ThePage } from './Views/index'
import './Styles/root.scss'
import { ModuleKind } from 'typescript'

const App: React.FC = () => {
  // for the top of the page button
  const goToTop = () => {
    let t = document.querySelector('.scroll-container')
    if (t !== null) {
      t.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
  const clearButton = (button: HTMLButtonElement) => {
    let div = document.getElementById('arrow-to-top')
    if (div !== null) {
      div.removeChild(button)
    }
  }

  React.useEffect(() => {
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

    //create button and scroll obs
    let button = createArrowButton()
    document.querySelector('#arrow-to-top')?.appendChild(button)
    return () => {
      clearButton(button)
    }
  })
  return (
    <div className="app-wrapper" id="app-wrapper">
      <ThePage />
    </div>
  )
}

export default App
