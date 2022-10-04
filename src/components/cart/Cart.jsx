import React from 'react';
import styles from './cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { GrClose } from 'react-icons/gr';
import CartItem from './cartItem';
import { BsArrowLeft, BsCartFill } from 'react-icons/bs';
import { handelShowStatus } from '../../redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const handleCloseCartPopup = () => {
    dispatch(handelShowStatus());
  };

  return (
    <div className='cartOverlayContainer'>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <header>
            <h1>Корзина</h1>
            <div className={styles.indikator}></div>
            <button onClick={handleCloseCartPopup}>
              <GrClose />
            </button>
          </header>
          <div className={styles.itemsContainer}>
            {cartItems &&
              cartItems.map((el) => <CartItem {...el} key={el.product_id} />)}
            {cartItems.length === 0 && <h2>Корзина пуста...</h2>}
          </div>
          <footer>
            <div className={styles.left}>
              <BsArrowLeft />
              <span onClick={handleCloseCartPopup}>Продолжить покупки</span>
            </div>
            <div className={styles.right}>
              {cartItems.length > 0 && (
                <>
                  <p className={styles.totalSumBlock}>
                    <span>Итого: </span>{' '}
                    <span>{totalPrice.toFixed(2)} грн</span>
                  </p>
                  <button>
                    <BsCartFill />
                    <span>Оформить заказ</span>
                  </button>
                </>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Cart;
