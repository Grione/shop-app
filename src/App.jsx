import { useState } from "react";
import Header from "./components/Header";
import { useEffect } from "react";
import MealItem from "./components/MealItem";
import CartContextComponent from "./store/cart-context";

function App() {
  const [meals, setMeals] = useState([]);

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

  return (
    <CartContextComponent>
      <Header />
      <ul id="meals">
        {
          meals.map((meal) => <MealItem meal={meal} key={meal.id}/>)
        }
      </ul>
    </CartContextComponent>
  );
}

export default App;
