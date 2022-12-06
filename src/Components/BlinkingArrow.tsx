import * as React from 'react'

const BlinkingArrow: React.FC = () => {
  React.useEffect(() => {
    // the arrow will only appear if the user idles for 5 seconds
    let scrollContainer = document.querySelector('.scroll-container')
    let arrowSpan = document.querySelector('.blinking-arrow-container span')
    let idleTime = 0

    const arrowBlink = () => {
      arrowSpan?.classList.add('active')
      const arrowTimeout = setTimeout(() => {
        arrowSpan?.classList.remove('active')
      }, 2000)
      return () => {
        clearTimeout(arrowTimeout)
      }
    }

    setInterval(() => {
      idleTime++
      if (idleTime >= 3) {
        arrowBlink()
      }
    }, 4000)

    const resetIdle = () => {
      idleTime = 0
    }

    scrollContainer?.addEventListener('scroll', resetIdle)
  }, [])
  return (
    <div className="blinking-arrow-container">
      <span className="material-symbols-outlined">swipe_up</span>
    </div>
  )
}

export default BlinkingArrow
