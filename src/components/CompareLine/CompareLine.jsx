import React from 'react';
import styles from './CompareLine.module.scss';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CompareLine = () => {
  const { compartisonProducts } = useSelector((state) => state.compartison);
  return (
    <>
      <p className={styles.compareQty}>
        <AiOutlineCheckCircle />
        <span>
          <span>{compartisonProducts.length}</span>
          {compartisonProducts.length.toString()[
            compartisonProducts.length - 1
          ] === '1' &&
          compartisonProducts.length.toString()[
            compartisonProducts.length - 2
          ] !== '1'
            ? 'товар'
            : compartisonProducts.length >= 5 &&
              compartisonProducts.length <= 20
            ? 'товаров'
            : 'товара'}
        </span>
        <Link to='/compare'>Сравнить</Link>
      </p>
    </>
  );
};

export default CompareLine;
