import { createRef, useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, children }) {
  const modalRef = createRef()

  useEffect(() => {
    if (open) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  }, [open]);

  return (
    createPortal(<dialog className="modal" ref={modalRef}>
      {children}
    </dialog>, document.getElementById('modal'))

  )
};
