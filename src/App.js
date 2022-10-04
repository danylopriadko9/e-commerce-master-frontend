import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import PagesComposing from './pages/PagesComposing';
import Cart from './components/cart/Cart';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

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
      {/* {showStatus && <Cart />} */}

      <Header />
      <div className='mainContainer'>
        <PagesComposing />
      </div>
      <Footer />
    </>
  );
}

export default App;
