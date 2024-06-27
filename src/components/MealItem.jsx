import { useContext } from "react";
import { CartContext } from "../store/cart-context";
import formatPrice from "../utils/format-number.js";

export default function MealItem({ meal }) {
  const formattedPrice = formatPrice(meal.price);

  const { addMeal } = useContext(CartContext);

  return (
    <li className="meal-item">

      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt="" />
        <h3>{meal.name}</h3>
        <div className="meal-item-price">
          <span>{formattedPrice}</span>
        </div>
        <p className="meal-item-description">
          {meal.description}
        </p>
        <div className="meal-item-actions">
          <button className="button" onClick={()=> addMeal(meal)}>Add to Cart</button>
        </div>
      </article>


    </li>
  )
}