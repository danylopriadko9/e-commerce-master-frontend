import React from 'react';
import { addItemToCart, handelShowStatus } from '../../redux/slices/cartSlice';
import styles from './ItemsInfo.module.scss';
import { BsCartFill } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import InformationBlock from '../InformationBlock/InformationBlock';

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
  return (
    <>
      <div className={styles.productInfo}>
        <InformationBlock product={product} />
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
