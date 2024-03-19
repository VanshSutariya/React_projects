import { useDispatch, useSelector } from 'react-redux';
import Input from '../UI/Input';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import { modalActions } from '../../Store/cart-action';
import { UpdateOrderDetails } from '../../https';
import { useEffect, useState } from 'react';
import Error from '../Error';
import { cartActions } from '../../Store/cart-Slice';

export default function Checkout() {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [data, setData] = useState(false);
  const [submitOrder, setSubmitOrder] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const value = useSelector((state) => state.modal.value);

  function handleCartClose() {
    dispatch(modalActions.hideCheckout());
  }
  function handleOkay() {
    dispatch(modalActions.hideCheckout());
    setData(false);
    dispatch(cartActions.emptyCart());
    console.log('okay button clicked', items);
  }

  let cartTotal;
  if (items.length > 0) {
    cartTotal = items.reduce(
      (totalPrice, item) =>
        totalPrice + item.quantity * Number(item.price).toFixed(2),
      0
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    console.log(customerData);
    async function updateOrder() {
      setSubmitOrder(true);
      try {
        const orderData = await UpdateOrderDetails(items, customerData);
        if (orderData) {
          setData(true);
        }

        setSubmitOrder(false);
      } catch (error) {
        setError({
          message: error.message || 'Not found  ',
        });
        setSubmitOrder(false);
      }
    }
    updateOrder();
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCartClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (submitOrder) {
    actions = <span>Sending Order data ...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={value === 'checkout'}
        onClose={value === 'checkout ' ? handleCartClose : null}
      >
        <h2>Success!</h2>
        <p>Your Order was submitted successfully.</p>
        <p>we will back to you via email within the next few minutes</p>
        <p className="modal-actions">
          <Button type="button" onClick={handleOkay}>
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={value === 'checkout'}
      onClose={value === 'checkout ' ? handleCartClose : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:{cartTotal}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && (
          <Error title="Failed to submit Order " message={error.message} />
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
