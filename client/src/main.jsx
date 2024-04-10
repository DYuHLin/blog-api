import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Router from './Router.jsx'
import { UserProvider } from './UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <React.StrictMode> 
      <Router />
    </React.StrictMode>
  </UserProvider>
)
