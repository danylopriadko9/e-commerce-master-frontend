import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryProductBlock from '../../components/CategoryProductBlock/CategoryProductBlock';
import { fetchProductsCategory } from '../../redux/slices/categorySlice';
import styles from './Categories.module.scss';
import CategoryItemSkeleton from '../../components/Skeleton/CategoryItemSkeleton';
import Item from './Item/Item';

const Categories = ({ url }) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchProductsCategory(url));
  }, [url]);

  const {
    productsCategory,
    productsCategoryStatus,
    actualSubcategoriesPage,
    actualSubcategoriesPageStatus,
  } = useSelector((state) => state.category);

  if (
    actualSubcategoriesPage.length ||
    actualSubcategoriesPageStatus === 'error'
  ) {
    return (
      <div className={styles.container}>
        <div className={styles.items_container}>
          {actualSubcategoriesPage.map((el) => (
            <Item el={el} key={el.url} />
          ))}
        </div>
      </div>
    );
  }

  if (!productsCategory.length || productsCategoryStatus === 'error') {
    return (
      <div className={styles.container}>
        <h2>Ничего не найдено</h2>
      </div>
    );
  }
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
