import { forwardRef, useContext } from "react";
import Input from "./Input.jsx";
import { CartContext } from "../store/cart-context.jsx";
import formatPrice from "../utils/format-number.js";
import { OrderContext } from "../store/order-context.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
}

const CheckoutForm = forwardRef(function CheckoutForm(props, ref) {

  const { items, clearCart } = useContext(CartContext);
  const { goToSuccess } = useContext(OrderContext)

  const total = items.reduce((accum, item) => {
    return accum + (item.price * item.quantity)
  }, 0);

  const totalFormatted = formatPrice(total);

  const { data, isLoading, error, sendRequest } = useHttp('http://localhost:3000/orderss', requestConfig)

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

    console.log(data, error);

    if (!error) {
      goToSuccess();
      clearCart();
    }

  }


  return (
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
      </form>

      {error && <Error title='Failed to submit order' message={error} />}

      {isLoading && <p>Sending order data...</p>}
    </div>
  )
});

export default CheckoutForm;