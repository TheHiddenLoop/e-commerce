import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeProvider } from './context/Theme.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
