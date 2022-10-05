import styles from './cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';

import {
  handelShowStatus,
  handlePopupStatus,
} from '../../redux/slices/cartSlice';
import CartBlock from './CartBlock/CartBlock';
import OferBlock from './oferBlock';

const Cart = () => {
  const dispatch = useDispatch();
  const { popupStatus } = useSelector((state) => state.cart);

  const handleCloseCartPopup = () => {
    dispatch(handelShowStatus());
    setTimeout(() => {
      handlePopupStatusChange('cart');
    }, 1000);
  };

  const handlePopupStatusChange = (status) => {
    dispatch(handlePopupStatus(status));
  };

  return (
    <div className='cartOverlayContainer'>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <header>
            <h1>{popupStatus === 'cart' ? 'Корзина' : 'Оформление заказа'}</h1>
            <div className={styles.indikator}></div>
            <button onClick={handleCloseCartPopup}>
              <GrClose />
            </button>
          </header>
          {popupStatus === 'cart' && <CartBlock />}
          {popupStatus === 'ofer' && <OferBlock />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
