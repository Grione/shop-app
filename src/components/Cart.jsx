import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import formatPrice from "../utils/format-number.js";


export default function Cart() {
  const { items, addMeal, deleteMeal } = useContext(CartContext);

  function handlerIncrementMeal(meal) {
    addMeal(meal)
  }

  const total = items.reduce((accum, item) => {
    return accum + (item.price * item.quantity)
  }, 0);

  const totalFixed = formatPrice(total);


  if (items.length < 1) return <h2>Your Cart is empty</h2>

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          const currencyPrice = formatPrice(item.price);

          return (
            <li className="cart-item" key={item.id}>
              <p>{item.name} - {item.quantity} x {currencyPrice}</p>
              <div className="cart-item-actions">
                <button onClick={() => deleteMeal(item)}>-</button>
                {item.quantity}
                <button onClick={() => handlerIncrementMeal(item)}>+</button>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="cart-total">
        {totalFixed}
      </div>
    </div>
  )
}