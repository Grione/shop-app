import { forwardRef, useContext } from "react";
import { CartContext } from "../store/cart-context";

const Modal = forwardRef(function Modal(props, ref) {
  const { items } = useContext(CartContext)

  function handleCloseModal() {
    ref.current.close();
  }

  let nextAction;

  if (items.length < 1) {
    nextAction = null;
  } else {
    nextAction = <button className="button">Go to Checkout</button>;
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