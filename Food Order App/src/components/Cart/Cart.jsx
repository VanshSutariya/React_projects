import { useDispatch, useSelector } from 'react-redux';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { modalActions } from '../../Store/cart-action';
import { cartActions } from '../../Store/cart-Slice';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const value = useSelector((state) => state.modal.value);
  function handleCheckout() {
    dispatch(modalActions.showCheckout());
  }
  function handleCartClose() {
    dispatch(modalActions.hideCart());
  }
  function handleIncreaseItem(id) {
    dispatch(cartActions.increaseItem(id));
  }
  function handleDecrease(id) {
    dispatch(cartActions.removeItemFromCart(id));
  }
  let cartTotal;
  if (items.length > 0) {
    cartTotal = items.reduce(
      (totalPrice, item) =>
        totalPrice + item.quantity * Number(item.price).toFixed(2),
      0
    );
  }
  return (
    <Modal
      className="cart"
      open={value === 'cart'}
      onClose={value === 'cart' ? handleCartClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.length > 0 &&
          items.map((item) => {
            return (
              <li className="cart-item" key={item.id}>
                <p>
                  {item.name}-{item.quantity} X {item.price}
                </p>
                <p className="cart-item-actions">
                  <button onClick={() => handleDecrease(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncreaseItem(item.id)}>+</button>
                </p>
              </li>
            );
          })}
      </ul>
      {items.length > 0 && (
        <p className="cart-total">${Math.round(cartTotal)}</p>
      )}
      <p className="modal-actions">
        <Button textOnly onClick={handleCartClose}>
          Close
        </Button>
        <Button onClick={handleCheckout}>Go to Checkout </Button>
      </p>
    </Modal>
  );
}
