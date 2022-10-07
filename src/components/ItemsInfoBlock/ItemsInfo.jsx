import React from 'react';
import { addItemToCart, handelShowStatus } from '../../redux/slices/cartSlice';
import styles from './ItemsInfo.module.scss';
import { BsCartFill } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import { useDispatch } from 'react-redux';

const ItemsInfo = ({ product }) => {
  const dispatch = useDispatch();
  const {
    product_id,
    category_name,
    product_name,
    discount_percent,
    base_price,
  } = product;
  const handleAddItemToCart = (item) => {
    dispatch(
      addItemToCart({
        ...item,
        qty: 1,
      })
    );
    dispatch(handelShowStatus());
  };
  return (
    <>
      <div className={styles.productInfo}>
        <p className={styles.model_id}>{`#${product_id}`}</p>
        <p className={styles.category}>{category_name}</p>
        <div className={styles.itemCategory}>
          <span className={styles.model}>{product_name}</span>
        </div>
        <div className={styles.priceBlock}>
          <span className={styles.price}>
            {discount_percent
              ? (
                  base_price -
                  (base_price * discount_percent.slice(0, -3)) / 100
                ).toFixed(2)
              : base_price}
            грн
          </span>
          <span className={styles.price}>
            {discount_percent && (
              <>
                <span className={styles.oldPrice}>{base_price} грн</span>
                <span className={styles.discount}>
                  -{discount_percent.slice(0, -3)}%
                </span>
              </>
            )}
          </span>
        </div>

        {/* <span ref={descriptionBlock}></span> */}
        <div className={styles.buttons_container}>
          <button onClick={() => handleAddItemToCart(product)}>
            <BsCartFill />
            <span>Добавить в корзину</span>
          </button>
          <button>
            <GrAddCircle />
            <span>Добавить к сравнению</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemsInfo;
