import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import reducer from './redux/reducer'

const store = configureStore({reducer:reducer,devTools:true});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
