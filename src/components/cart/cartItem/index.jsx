import React from 'react';
import styles from './CartItem.module.scss';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import {
  addQtyFromItem,
  removeItemFromCart,
  subtractQuantityFromItem,
} from '../../../redux/slices/cartSlice';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const CartItem = (item) => {
  const dispatch = useDispatch();
  const {
    product_name,
    category_name,
    base_price,
    discount_percent,
    product_id,
    qty,
    iso,
  } = item;

  const [image, setImage] = React.useState(null);

  const handelQtyConsole = () => {};

  const handleAddQtyFromItem = (product_id) => {
    dispatch(addQtyFromItem(product_id));
  };

  const handleSubtractQuantityFromItem = (product_id) => {
    if (qty - 1 === 0) dispatch(removeItemFromCart(product_id));
    dispatch(subtractQuantityFromItem(product_id));
  };

  React.useEffect(() => {
    if (!image) {
      fetchProductPhoto();
    }
  }, []);

  const fetchProductPhoto = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/product/photo/${product_id}`
    );
    setImage(data);
  };

  const { t, i18n } = useTranslation();

  return (
    <div className={styles.cartItemContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.imageContainer}>
          <img src={`/static/${image}`} />
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
            {` ${iso}`}
          </p>
          {discount_percent && (
            <p>
              <span className={styles.oldPrice}>{`${base_price} ${iso}`} </span>
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
        <p className={styles.sum}>{t('cart.sum')}:</p>
        <p className={styles.price}>
          {discount_percent
            ? (
                (base_price -
                  (base_price * discount_percent.slice(0, -3)) / 100) *
                qty
              ).toFixed(2)
            : (base_price * qty).toFixed(2)}
          {` ${iso}`}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
