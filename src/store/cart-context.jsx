import { createContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_MEAL':
      const newMeal = {
        id: action.payload.id,
        price: action.payload.price,
        quantity: 1
      }

      if (state.items.length < 1) return { ...state, items: [newMeal] }

      if (state.items.findIndex((i) => i.id === newMeal.id) < 0) {
        return {
          ...state,
          items: [...state.items, newMeal]
        }
      } else {
        return {
          ...state,
          items: state.items.map((item) => {
            if (item.id === newMeal.id) {
              return {
                ...item,
                quantity: item.quantity + 1,
              }
            } else {
              return item
            }
          })
        }
      }

      break;
    case 'DELETE_MEAL':
      break
    default:
      break;
  }
}

export const CartContext = createContext({
  items: [],
  addMeal: () => { },
})

export default function CartContextComponent({ children }) {

  const [cartStore, dispatch] = useReducer(reducer, {
    items: [],
    addMeal: addMealHandler,
  })

  function addMealHandler(object) {
    dispatch({ type: 'ADD_MEAL', payload: object })
  }

  return <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>
}
