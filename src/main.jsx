import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// The starting point of the app. React finds the <div id="root"> in
// index.html and draws the whole App inside it.
// StrictMode only runs in development. It runs some code twice on purpose
// to help find bugs, so a console.log may appear twice. That is normal.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
