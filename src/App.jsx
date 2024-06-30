import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";

import Header from "./components/Header.jsx";
import MealItem from "./components/MealItem.jsx";
import Modal from "./components/Modal.jsx";
import Cart from "./components/Cart.jsx";
import CheckoutForm from "./components/CheckoutForm.jsx";

import { OrderContext } from "./store/order-context.jsx";
import useHttp from "./hooks/useHttp.js";
import Error from "./components/Error.jsx";

const requestConfig = {};

function App() {
  const modalRef = useRef();
  const formRef = useRef(null);

  const { status } = useContext(OrderContext);

  const {
    data: meals,
    isLoading,
    error } = useHttp('http://localhost:3000/meals', requestConfig, []);

  function handleOpenCart() {
    modalRef.current.showModal();
  }

  function submitOrderHandler() {
    formRef.current.requestSubmit()
  }

  let modalRenderComponent;

  if (status === 'cart') {
    modalRenderComponent = <Cart />
  } else if (status === 'checkout') {
    modalRenderComponent = <CheckoutForm ref={formRef} />
  } else if (status === 'success') {
    modalRenderComponent = (<div><h2>Success!</h2><p>Your order was submitted successfully.</p></div>)
  }

  if (isLoading) {
    return <p className="center">Loading meals...</p>
  }

  if (error) {
    return <Error title='Error Fetch Meals' message={error} />
  }

  return (
    <>
      <Header openCart={handleOpenCart} />
      <ul id="meals">{
        meals.map((meal) => <MealItem meal={meal} key={meal.id} />)
      }
      </ul>

      {createPortal(<Modal ref={modalRef} onSubmit={submitOrderHandler}>{modalRenderComponent}</Modal>,
        document.getElementById('modal'))}

    </>
  );
}

export default App;
