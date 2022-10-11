import React from 'react';
import { Link } from 'react-router-dom';
import ItemsInfo from '../ItemsInfoBlock/ItemsInfo';
import styles from './CategoryProductBlock.module.scss';

const CategoryProductBlock = ({ item }) => {
  return (
    <div className={styles.container}>
      <Link className={styles.image_container} to={`/tovar_${item.url}`}>
        <img
          src={`http://localhost:3001/getProductImage/${item.product_id}`}
          alt=''
        />
      </Link>
      <ItemsInfo product={item} />
    </div>
  );
};

export default CategoryProductBlock;
