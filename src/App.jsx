import { useState, useEffect, useRef, useContext } from "react";
import { createPortal } from "react-dom";

import Header from "./components/Header.jsx";
import MealItem from "./components/MealItem.jsx";
import Modal from "./components/Modal.jsx";
import Cart from "./components/Cart.jsx";
import CheckoutForm from "./components/Checkout-form.jsx";

import { OrderContext } from "./store/order-context.jsx";

function App() {
  const [meals, setMeals] = useState([]);

  const modalRef = useRef();
  const formRef = useRef(null);

  const { status } = useContext(OrderContext);

  useEffect(() => {
    async function getMeals() {
      try {
        const response = await fetch('http://localhost:3000/meals');
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.log(error);
      }
    }

    getMeals();
  }, []);

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
