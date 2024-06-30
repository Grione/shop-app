import Header from "./components/Header.jsx";
import MealItem from "./components/MealItem.jsx";
import Cart from "./components/Cart.jsx";
import CheckoutForm from './components/CheckoutForm.jsx';

import useHttp from "./hooks/useHttp.js";
import Error from "./components/Error.jsx";

const requestConfig = {};

function App() {
  const {
    data: meals,
    isLoading,
    error } = useHttp('http://localhost:3000/meals', requestConfig, []);


  if (isLoading) {
    return <p className="center">Loading meals...</p>
  }

  if (error) {
    return <Error title='Error Fetch Meals' message={error} />
  }

  return (
    <>
      <Header />
      <ul id="meals">{
        meals.map((meal) => <MealItem meal={meal} key={meal.id} />)
      }
      </ul>
      <Cart />
      <CheckoutForm />
    </>
  );
}

export default App;
