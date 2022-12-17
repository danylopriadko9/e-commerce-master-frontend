import React from 'react';
import { addItemToCart, handelShowStatus } from '../../redux/slices/cartSlice';
import styles from './ItemsInfo.module.scss';
import { BsCartFill } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InformationBlock from '../InformationBlock/InformationBlock';
import { addCompartisonProduct } from '../../redux/slices/comparisonSlice';
import { useTranslation } from 'react-i18next';

const ItemsInfo = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddItemToCart = (item) => {
    dispatch(
      addItemToCart({
        ...item,
        qty: 1,
      })
    );
    dispatch(handelShowStatus());
  };

  const handleAddToComprasion = (item) => {
    dispatch(addCompartisonProduct(item));
  };

  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={styles.productInfo}>
        <InformationBlock product={product} />
        <div className={styles.buttons_container}>
          <button onClick={() => handleAddItemToCart(product)}>
            <BsCartFill />
            <span>{t('items_info.add_to_cart')}</span>
          </button>
          <Link to='/compare' onClick={() => handleAddToComprasion(product)}>
            <GrAddCircle />
            <span>{t('items_info.add_to_compare')}</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ItemsInfo;
