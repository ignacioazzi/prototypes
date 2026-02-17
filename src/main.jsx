import React, { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TwoSteps from './twosteps.jsx'
import FullScreen from './FullScreen.jsx'
import BottomSheet from './BottomSheet.jsx'

function RootRouter() {
  const [route, setRoute] = useState(window.location.hash || '#/')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  if (route === '#two') return <TwoSteps />
  if (route === '#bottom') return <BottomSheet />
  return <FullScreen />
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>,
)
