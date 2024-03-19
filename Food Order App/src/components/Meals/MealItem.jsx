import { useDispatch, useSelector } from 'react-redux';
import Button from '../UI/Button';
import { cartActions } from '../../Store/cart-Slice';

const MealItem = (props) => {
  const dispatch = useDispatch();

  const { id, price: mealPrice, name } = { ...props };

  function addToCartHandler() {
    dispatch(
      cartActions.addItemToCart({
        id,
        mealPrice,
        name,
      })
    );
  }
  const price =
    typeof props.price === 'string'
      ? `$${Number(props.price).toFixed(2)}`
      : `$${props.price.toFixed(2)}`;

  return (
    <li key={props.id} className="meal-item">
      <article>
        <img src={props.imgSrc} alt="food meals image" />
        <div>
          <h3>{props.name}</h3>
          <p className="meal-item-price">{price}</p>
          <p className="meal-item-description">{props.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={addToCartHandler}> Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
