import React from 'react';
import styles from './CartItem.module.scss';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQtyFromItem,
  removeItemFromCart,
  subtractQuantityFromItem,
  totalPriceCounter,
} from '../../../redux/slices/cartSlice';

const CartItem = (item) => {
  const dispatch = useDispatch();
  const {
    product_name,
    category_name,
    url,
    base_price,
    discount_percent,
    product_id,
    qty,
  } = item;

  const handelQtyConsole = () => {};

  const handleAddQtyFromItem = (product_id) => {
    dispatch(addQtyFromItem(product_id));
    //dispatch(totalPriceCounter());
  };

  const handleSubtractQuantityFromItem = (product_id) => {
    if (qty - 1 === 0) dispatch(removeItemFromCart(product_id));
    dispatch(subtractQuantityFromItem(product_id));
    //dispatch(totalPriceCounter());
  };

  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <img src={`http://localhost:3001/getProductImage/${product_id}`} />
        </div>
        <div className={styles.infoBlock}>
          <p className={styles.id}>{`#${product_id}`}</p>
          <p className={styles.model}>{category_name}</p>
          <p className={styles.name}>{product_name}</p>
          <p className={styles.price}>
            {discount_percent
              ? (
                  base_price -
                  (base_price * discount_percent.slice(0, -3)) / 100
                ).toFixed(2)
              : base_price}
            грн
          </p>
          {discount_percent && (
            <p>
              <span className={styles.oldPrice}>{`${base_price} грн`} </span>
              <span className={styles.discount}>{`-${discount_percent.slice(
                0,
                -3
              )}%`}</span>
            </p>
          )}
        </div>
      </div>
      <div className={styles.counterBlock}>
        <button onClick={() => handleSubtractQuantityFromItem(product_id)}>
          <AiOutlineMinus />
        </button>
        <input
          type='number'
          min='0'
          value={qty}
          onChange={() => handelQtyConsole()}
        />
        <button onClick={() => handleAddQtyFromItem(product_id)}>
          <AiOutlinePlus />
        </button>
      </div>
      <div className={styles.priceBlock}>
        <p className={styles.sum}>Сумма:</p>
        <p className={styles.price}>
          {discount_percent
            ? (
                (base_price -
                  (base_price * discount_percent.slice(0, -3)) / 100) *
                qty
              ).toFixed(2)
            : (base_price * qty).toFixed(2)}
          грн
        </p>
      </div>
    </div>
  );
};

export default CartItem;
