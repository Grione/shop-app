import { forwardRef, useContext } from "react";
import { CartContext } from "../store/cart-context";
import { OrderContext } from "../store/order-context";

const Modal = forwardRef(function Modal(props, ref) {
  const { items } = useContext(CartContext);
  const { status, goToCheckout } = useContext(OrderContext);

  function handleCloseModal() {
    ref.current.close();
  }

  function handlerNextModal() {
    if(status === 'cart') {
      goToCheckout();
    } else if(status === 'checkout') {
      props.onSubmit();
    }
  }

  let nextAction;

  if (items.length < 1) {
    nextAction = null;
  } else {
    nextAction = <button className="button" onClick={handlerNextModal}>Go to Checkout</button>;
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