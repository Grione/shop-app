import { createContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case 'DEFAULT':
      return {
        ...state,
        status: 'default'
      }

      break;
    case 'CART':
      return {
        ...state,
        status: 'cart'
      }
      break;

    case 'CHECKOUT':
      return {
        ...state,
        status: 'checkout'
      }
      break

    default:
      return { ...state }
      break;
  }
}

export const OrderContext = createContext({
  status: 'default',
  setDefault: () => { },
  goToCheckout: () => { },
  goToCart: () => { },
});

export default function OrderContextComponent({ children }) {
  const [orderStore, dispatch] = useReducer(reducer, {
    status: 'default',
    setDefault: setDefault,
    goToCheckout: goToCheckout,
    goToCart: goToCart,
 });

  function setDefault() {
    dispatch({ type: 'DEFAULT' })
  }

  function goToCheckout() {
    dispatch({ type: 'CHECKOUT' })
  }

  function goToCart() {
    dispatch({ type: 'CART' })
  }

  return <OrderContext.Provider value={orderStore}>{children}</OrderContext.Provider>
}