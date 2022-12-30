import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'


// redux tk
import { Provider } from 'react-redux'
import store from './store/store'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
       <App />
      </Provider>
    </Router>
  </React.StrictMode>
)
