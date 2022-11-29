import React from 'react';
import { Link } from 'react-router-dom';
import ItemsInfo from '../ItemsInfoBlock/ItemsInfo';
import styles from './CategoryProductBlock.module.scss';
import { apiurl } from '../../axios';

const CategoryProductBlock = ({ item }) => {
  return (
    <div className={styles.container}>
      <Link className={styles.image_container} to={`/tovar_${item.url}`}>
        {item.product_id && (
          <img src={`${apiurl}/product/photo/${item.product_id}`} alt='' />
        )}
      </Link>
      <ItemsInfo product={item} />
    </div>
  );
};

export default CategoryProductBlock;
