import headerLogo from '../assets/logo.jpg';

import { useContext } from 'react';
import { CartContext } from '../store/cart-context';
import { OrderContext } from '../store/order-context';

export default function Header({ openCart }) {
  const cartCtx = useContext(CartContext);
  const { goToCart } = useContext(OrderContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="Reactfood logo" />
        <h1>Reactfood</h1>
      </div>
      <button className='header-cart' onClick={goToCart}>
        <span>Cart({cartCtx.items.length})</span>
      </button>
    </header>
  )
}