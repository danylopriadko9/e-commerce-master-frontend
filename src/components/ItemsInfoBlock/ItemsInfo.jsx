import React from 'react';
import { addItemToCart, handelShowStatus } from '../../redux/slices/cartSlice';
import styles from './ItemsInfo.module.scss';
import { BsCartFill } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InformationBlock from '../InformationBlock/InformationBlock';
import { addCompartisonProduct } from '../../redux/slices/comparisonSlice';

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
    console.log(item);
    dispatch(addCompartisonProduct(item));
  };
  return (
    <>
      <div className={styles.productInfo}>
        <InformationBlock product={product} />
        <div className={styles.buttons_container}>
          <button onClick={() => handleAddItemToCart(product)}>
            <BsCartFill />
            <span>Добавить в корзину</span>
          </button>
          <Link to='/compare'>
            <button onClick={() => handleAddToComprasion(product)}>
              <GrAddCircle />
              <span>Добавить к сравнению</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ItemsInfo;
