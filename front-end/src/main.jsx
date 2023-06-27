import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyle from './style/GlobalStyle.jsx'
import ResetStyle from './style/ResetStyle.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle/>
    <GlobalStyle />
    <App />
  </React.StrictMode>
)
