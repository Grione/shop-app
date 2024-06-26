import { createContext, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_MEAL':
      const newMeal = {
        id: action.payload.id,
        name: action.payload.name,
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
      const indexMeal = state.items.findIndex((i) => i.id === action.payload.id);

      if (action.payload.quantity === 1) {
        return {
          ...state,
          items: state.items.splice(indexMeal, 1)
        }
      }
      return {
        ...state,
        items: [...state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...action.payload,
              quantity: item.quantity - 1
            }
          } else {
            return item;
          }
        })]
      }
      break
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      }
      break
    default:
      break;
  }
}

export const CartContext = createContext({
  items: [],
  addMeal: () => { },
  deleteMeal: () => { },
  clearCart: () => { }
})

export default function CartContextComponent({ children }) {

  const [cartStore, dispatch] = useReducer(reducer, {
    items: [],
    addMeal: addMealHandler,
    deleteMeal: deleteMealHandler,
    clearCart: clearCartHandler
  })

  function addMealHandler(object) {
    dispatch({ type: 'ADD_MEAL', payload: object })
  }

  function deleteMealHandler(object) {
    dispatch({ type: 'DELETE_MEAL', payload: object })
  }

  function clearCartHandler() {
    dispatch({ type: 'CLEAR_CART' })
  }

  return <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>
}
