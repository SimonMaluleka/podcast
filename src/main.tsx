import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppContextProvider } from './context/AppContext.tsx'
import { theme } from './helpers/theme.ts'
import { ThemeProvider } from '@emotion/react'
import { ReactNotifications } from 'react-notifications-component'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider initialShows={[]}>
      <ReactNotifications />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>      
    </AppContextProvider>    
  </React.StrictMode>
)
