import { forwardRef, useContext } from "react";
import Input from "./Input.jsx";
import { CartContext } from "../store/cart-context.jsx";
import formatPrice from "../utils/format-number.js";
import { OrderContext } from "../store/order-context.jsx";

const CheckoutForm = forwardRef(function CheckoutForm(props, ref) {

  const { items } = useContext(CartContext);
  const { goToSuccess } = useContext(OrderContext)

  const total = items.reduce((accum, item) => {
    return accum + (item.price * item.quantity)
  }, 0);

  const totalFormatted = formatPrice(total);

  function submitHandler(event) {

    event.preventDefault();
    const formData = new FormData(event.target)

    const customer = {}
    for (var p of formData) {
      let name = p[0];
      let value = p[1];
      customer[name] = value;
    }

    async function postOrder() {
      try {
        const res = await fetch('http://localhost:3000/orders', {
          method: 'POST',
          body: JSON.stringify({
            order: {
              items: items,
              customer: customer
            }
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });

        console.log(res);

        if (!res.ok) {
          throw Error('Post data failed!')
        }

        const data = await res.json();



        if (data) {
          console.log(data);
          goToSuccess();
        }

      } catch (error) {
        console.error(error);
      }
    }

    postOrder();

    console.log(customer)
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
    </div>
  )
});

export default CheckoutForm;