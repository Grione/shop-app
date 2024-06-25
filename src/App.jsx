import { useState } from "react";
import Header from "./components/Header";
import { useEffect } from "react";
import MealItem from "./components/MealItem";

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
  }, [])
  return (
    <>
      <Header />
      <ul id="meals">
        {
          meals.map((meal) => <MealItem meal={meal} />)
        }
      </ul>
    </>
  );
}

export default App;
