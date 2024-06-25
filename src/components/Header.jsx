import { useContext } from 'react';
import { CartContext } from '../store/cart-context';

import headerLogo from '../assets/logo.jpg';

export default function Header({ openCart }) {
  const cartCtx = useContext(CartContext);

  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="Reactfood logo" />
        <h1>Reactfood</h1>
      </div>
      <button className='header-cart' onClick={openCart}>
        <span>Cart({cartCtx.items.length})</span>
      </button>
    </header>
  )
}