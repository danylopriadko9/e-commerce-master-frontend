import React from 'react';
import { Link } from 'react-router-dom';
import styles from './InformationBlock.module.scss';

const InformationBlock = ({ product }) => {
  const {
    product_id,
    category_name,
    product_name,
    discount_percent,
    base_price,
    url,
  } = product;
  return (
    <Link to={`/tovar_${url}`}>
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
    </Link>
  );
};

export default InformationBlock;
