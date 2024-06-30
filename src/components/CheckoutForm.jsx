import { forwardRef, useContext } from "react";

import Input from "./Input.jsx";
import Error from "./Error.jsx";
import Modal from "./Modal.jsx";

import { CartContext } from "../store/cart-context.jsx";
import { OrderContext } from "../store/order-context.jsx";

import formatPrice from "../utils/format-number.js";

import useHttp from "../hooks/useHttp.js";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
}

const CheckoutForm = forwardRef(function CheckoutForm(props, ref) {

  const { items, clearCart } = useContext(CartContext);
  const { setDefault, status } = useContext(OrderContext)

  const total = items.reduce((accum, item) => {
    return accum + (item.price * item.quantity)
  }, 0);

  const totalFormatted = formatPrice(total);

  const { data, isLoading, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig)

  function submitHandler(event) {
    event.preventDefault();

    const formData = new FormData(event.target)

    const customer = {};

    for (const [key, value] of formData) {
      customer[key] = value;
    }

    sendRequest(JSON.stringify({
      order: {
        items: items,
        customer: customer
      }
    }));

  }

  function handlerReset() {
    clearCart();
    setDefault();
    clearData();
  }

  if (!error && data) {
    return (
      <Modal open={status === 'checkout'}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <button className="text-button" type="button" onClick={handlerReset}>Close</button>
        </p>
      </Modal>
    )
  }

  let contentLoading;

  if (isLoading) {
    contentLoading = <p>Sending order data...</p>;
  } else {
    contentLoading = (
      <>
        <button className="text-button" type="button" onClick={setDefault}>Close</button>
        <button className="button" type="submit">Send Order</button>
      </>
    )
  }


  return (
    <Modal open={status === 'checkout'}>
      <div className="checkout">
        <h2>Checkout</h2>
        <span>Total Amount: {totalFormatted}</span>
        <form id="form" onSubmit={submitHandler} ref={ref}>
          <Input name={'name'} label={'Full Name'} />
          <Input name={'email'} label={'E-Mail Address'} type="email" />
          <Input name={'street'} label={'Street'} />
          <div className="control-row">
            <Input name={'postal-code'} label={'Postal Code'} />
            <Input name={'city'} label={'City'} />
          </div>
          {error && <Error title='Failed to submit order' message={error} />}

          <div className="modal-actions">
            {contentLoading}
          </div>
        </form>
      </div>
    </Modal>
  )
});

export default CheckoutForm;