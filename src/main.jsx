import React, { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import TwoSteps from './twosteps.jsx'
import FullScreen from './FullScreen.jsx'
import BottomSheet from './BottomSheet.jsx'
import CursorDemoGlobal from './CursorDemoGlobal.jsx'

function RootRouter() {
  const [route, setRoute] = useState(window.location.hash || '#bottom')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      {route === '#two' && <TwoSteps />}
      {route === '#full' && <FullScreen />}
      {route === '#bottom' && (
        <div className="container_designs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', minHeight: '100vh' }}>
          <div data-demo="bs-frame"><BottomSheet /></div>
          <div data-demo="fs-frame"><FullScreen /></div>
          <CursorDemoGlobal />
        </div>
      )}
      {route === '#/' && <Home />}
    </>
  )
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootRouter />
  </StrictMode>,
)
