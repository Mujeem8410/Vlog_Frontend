import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster  reverseOrder={false}  toastOptions={{
    duration: 1500,
  }}
  containerStyle={{
    top: 150,
    left: 1100, 
  }}/>
  </StrictMode>,
)
