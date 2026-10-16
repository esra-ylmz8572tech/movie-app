import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Yönlendirme motorunu import ettik
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Uygulamamızı BrowserRouter içine alarak sayfa geçişlerine hazırladık */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)