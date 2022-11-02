import React from 'react';
import styles from './CartBlock.module.scss';
import CartItem from '../cartItem';
import { BsArrowLeft, BsCartFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  handelShowStatus,
  handlePopupStatus,
} from '../../../redux/slices/cartSlice';

const CartBlock = () => {
  const dispatch = useDispatch();

  const handleCloseCartPopup = () => {
    dispatch(handelShowStatus());
    setTimeout(() => {
      handlePopupStatusChange('cart');
    }, 1000);
  };

  const handlePopupStatusChange = (status) => {
    dispatch(handlePopupStatus(status));
  };
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  return (
    <>
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
                <span>Итого: </span> <span>{totalPrice.toFixed(2)} UAH</span>
              </p>
              <button onClick={() => handlePopupStatusChange('ofer')}>
                <BsCartFill />
                <span>Оформить заказ</span>
              </button>
            </>
          )}
        </div>
      </footer>
    </>
  );
};

export default CartBlock;
