import { createContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
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

    case 'SUCCESS':
      return {
        ...state,
        status: 'success'
      }
      break

    default:
      return { ...state }
      break;
  }
}

export const OrderContext = createContext({
  status: 'cart',
  goToCheckout: () => { },
  goToCart: () => { },
  goToAccess: () => { }
});

export default function OrderContextComponent({ children }) {
  const [orderStore, dispatch] = useReducer(reducer, {
    status: 'cart',
    goToCheckout: goToCheckout,
    goToCart: goToCart,
    goToAccess: goToAccess
  });

  function goToCheckout() {
    dispatch({ type: 'CHECKOUT' })
  }

  function goToCart() {
    dispatch({ type: 'CART' })
  }

  function goToAccess() {
    dispatch({ type: 'ACCESS' })
  }

  return <OrderContext.Provider value={orderStore}>{children}</OrderContext.Provider>
}