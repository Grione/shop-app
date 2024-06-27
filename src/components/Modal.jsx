import { forwardRef, useContext } from "react";
import { CartContext } from "../store/cart-context";
import { OrderContext } from "../store/order-context";

const Modal = forwardRef(function Modal(props, ref) {
  const { items } = useContext(CartContext);
  const { status, goToCheckout, goToCart } = useContext(OrderContext);

  function handleCloseModal() {
    if (status === 'success') {
      goToCart();
    }
    ref.current.close();
  }

  function handlerNextModal() {
    if (status === 'cart') {
      goToCheckout();
    } else if (status === 'checkout') {
      props.onSubmit();
    }
  }

  let nextAction = null;

  if (items.length > 0 && status !== 'success') {
    nextAction = <button className="button" onClick={handlerNextModal}>Go to Checkout</button>;
  } else if (status === 'success') {
    nextAction = null;
  }

  return (
    <dialog className="modal" ref={ref}>
      {props.children}
      <div className="modal-actions">
        <button className="text-button" onClick={handleCloseModal}>Close</button>
        {
          nextAction
        }
      </div>
    </dialog>
  )
});

export default Modal;