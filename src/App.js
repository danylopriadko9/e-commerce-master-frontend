import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import PagesComposing from './pages/Pages';
import Cart from './components/cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Pages from './pages/Pages';
import { fetchActualProductsProperties } from './redux/slices/comparisonSlice';

function App() {
  const { showStatus } = useSelector((state) => state.cart);
  return (
    <>
      <CSSTransition
        timeout={300}
        unmountOnExit
        in={showStatus}
        classNames='alert'
      >
        <Cart />
      </CSSTransition>

      <Header />
      <Pages />

      <Footer />
    </>
  );
}

export default App;
