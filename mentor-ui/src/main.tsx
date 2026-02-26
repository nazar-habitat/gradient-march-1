import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GradientProvider } from './components/GradientProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GradientProvider>
      <App />
    </GradientProvider>
  </StrictMode>,
)
