import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import CartContextComponent from './store/cart-context.jsx';
import OrderContextComponent from './store/order-context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartContextComponent>
      <OrderContextComponent>
        <App />
      </OrderContextComponent>
    </CartContextComponent>
  </React.StrictMode>,
)
