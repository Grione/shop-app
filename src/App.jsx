import { useState, useEffect, useRef } from "react";
import Header from "./components/Header.jsx";
import MealItem from "./components/MealItem";
import Modal from "./components/Modal";
import CartContextComponent from "./store/cart-context";
import { createPortal } from "react-dom";

function App() {
  const [meals, setMeals] = useState([]);

  const modalRef = useRef();

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

  return (
    <CartContextComponent>
      <Header openCart={handleOpenCart} />
      <ul id="meals">
        {
          meals.map((meal) => <MealItem meal={meal} key={meal.id} />)
        }
      </ul>

      {createPortal(<Modal ref={modalRef}></Modal>, document.getElementById('modal'))}
    </CartContextComponent>
  );
}

export default App;
