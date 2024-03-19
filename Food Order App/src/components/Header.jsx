import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import { modalActions } from '../Store/cart-action';
export default function Header() {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  function openCartHandler() {
    dispatch(modalActions.showCart());
  }
  console.log(totalQuantity);
  return (
    <div id="main-header">
      <div id="title">
        <img src={logo} alt="logo image" />
        <h1>REACT FOOD</h1>
      </div>
      <nav>
        <Button textOnly onClick={openCartHandler}>
          Cart({totalQuantity})
        </Button>
      </nav>
    </div>
  );
}
