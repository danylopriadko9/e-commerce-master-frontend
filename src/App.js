import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import Cart from './components/cart/Cart';
import Pages from './pages/Pages';
import { useDispatch } from 'react-redux';
import { fetchCurrentCurrency } from './redux/slices/currentCurrency';
import React from 'react';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCurrentCurrency());
  }, []);
  return (
    <>
      <Cart />
      <Header />
      <Pages />
      <Footer />
    </>
  );
}

export default App;
