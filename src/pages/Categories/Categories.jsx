import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryProductBlock from '../../components/CategoryProductBlock/CategoryProductBlock';
import { fetchProductsCategory } from '../../redux/slices/categorySlice';
import styles from './Categories.module.scss';
import CategoryItemSkeleton from '../../components/Skeleton/CategoryItemSkeleton';

const Categories = ({ url }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchProductsCategory(url));
  }, [url]);

  const { productsCategory, productsCategoryStatus } = useSelector(
    (state) => state.category
  );

  if (!productsCategory.length || productsCategoryStatus === 'error') {
    return (
      <div className={styles.container}>
        <h2>Ничего не найдено</h2>
      </div>
    );
  }

  console.log(productsCategory);
  return (
    <div className={styles.container}>
      <div className={styles.items_container}>
        {productsCategoryStatus === 'loading'
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
              <CategoryItemSkeleton key={i} />
            ))
          : productsCategory.map((el) => (
              <CategoryProductBlock item={el} key={el.url} />
            ))}
      </div>
    </div>
  );
};

export default Categories;
