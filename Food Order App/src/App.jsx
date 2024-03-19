import { useSelector } from 'react-redux';
import Header from './components/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <>
      <Header />
      <Meals />
      <Cart />
      <Checkout />
    </>
  );
}

export default App;
