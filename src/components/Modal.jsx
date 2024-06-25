import { forwardRef } from "react"

const Modal = forwardRef(function Modal(props,ref) {

  function handleCloseModal() {
    ref.current.close();
  }

  return (
    <dialog className="modal" ref={ref}>
      {props.children}
      <div className="modal-actions">
        <button className="text-button" onClick={handleCloseModal}>Close</button>
        <button className="button">Go to Checkout</button>
      </div>
    </dialog>
  )
});

export default Modal;