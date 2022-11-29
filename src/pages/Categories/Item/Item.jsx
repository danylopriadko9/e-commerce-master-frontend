import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actualSubcategoriesPageClean } from '../../../redux';
import styles from './Item.module.scss';
import { apiurl } from '../../../axios';

const Item = ({ el }) => {
  const dispatch = useDispatch();
  return (
    <Link
      className={styles.container}
      to={`/group_${el.url}`}
      onClick={() => dispatch(actualSubcategoriesPageClean())}
    >
      <div className={styles.image_container}>
        <img src={`${apiurl}/${el.dir_path}/${el.filename}`} alt='' />
      </div>
      <p className={styles.name}>{el.name}</p>
    </Link>
  );
};

export default Item;
