import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchActualCategory } from '../../../redux';
import styles from './CategoryItems.module.scss';

const CategoryItem = ({ el }) => {
  const dispatch = useDispatch();
  const categoryMouseEnter = (id) => {
    dispatch(searchActualCategory(id));
  };
  return (
    <>
      {el && (
        <Link
          to={`group_${el.url}`}
          onMouseEnter={() => categoryMouseEnter(el.id)}
          key={el.url}
        >
          <div className={styles.indikator}></div>
          {el.name}
        </Link>
      )}
    </>
  );
};

export default CategoryItem;
