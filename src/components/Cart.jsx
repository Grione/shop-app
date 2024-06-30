import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import formatPrice from "../utils/format-number.js";
import Modal from "./Modal.jsx";
import { OrderContext } from "../store/order-context.jsx";


export default function Cart() {
  const { items, addMeal, deleteMeal } = useContext(CartContext);
  const { status, setDefault, goToCheckout } = useContext(OrderContext)

  function handlerIncrementMeal(meal) {
    addMeal(meal)
  }

  function handleClose() {
    setDefault();
  }

  function handleCheckout() {
    goToCheckout();
  }

  const total = items.reduce((accum, item) => {
    return accum + (item.price * item.quantity)
  }, 0);

  const totalFixed = formatPrice(total);

  const cartTitle = items.length > 0 ? 'Your Cart' : 'Your Cart is empty';


  return (
    <Modal open={status === 'cart'}>
      <div className="cart">
        <h2>{cartTitle}</h2>
        {items.length > 0 && (
          <div>
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
        )}
        <div className="modal-actions">
          <button className="text-button" onClick={handleClose}>Close</button>
          {items.length > 0 && <button className="button" onClick={handleCheckout}>Got To Checkout</button>}
        </div>

      </div>
    </ Modal>
  )
}