import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryProductBlock from '../../components/CategoryProductBlock/CategoryProductBlock';
import {
  fetchProductsCategory,
  getSubcategoriesInformation,
  setPageNumber,
} from '../../redux/slices/categorySlice';
import styles from './Categories.module.scss';
import CategoryItemSkeleton from '../../components/Skeleton/CategoryItemSkeleton';
import Item from './Item/Item';
import { useLocation } from 'react-router-dom';

import InfoBlock from '../../components/InfoBlock/InfoBlock';
import CategorySkeleton from '../../components/Skeleton/CategorySkeleton';
import HistoryMap from '../../components/HistoryMap/HistoryMap';
import Pagination from '../../components/Pagination /Pagination';
import FilterBlock from '../../components/FilterBlock/FilterBlock';

const Categories = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  React.useEffect(() => {
    dispatch(setPageNumber(1));
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const {
    productsCategory,
    productsCategoryStatus,
    actualSubcategoriesPage,
    actualSubcategoriesPageStatus,
    actualPage,
  } = useSelector((state) => state.category);

  React.useEffect(() => {
    dispatch(
      fetchProductsCategory({ url: location.pathname, page: actualPage })
    );
    dispatch(
      getSubcategoriesInformation(location.pathname.replace('/group_', ''))
    );
    window.scrollTo(0, 0);
  }, [actualPage, location.pathname]);

  if (
    actualSubcategoriesPageStatus === 'loading' ||
    actualSubcategoriesPage.length
  ) {
    return (
      <div className={styles.container}>
        <HistoryMap />
        <div className={styles.items_container}>
          {actualSubcategoriesPageStatus === 'loading'
            ? [...new Array(8)].map((_, i) => <CategorySkeleton key={i} />)
            : actualSubcategoriesPage.map((el) => (
                <Item el={el} key={el.url} />
              ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <HistoryMap />
        <FilterBlock />
        <div className={styles.items_container}>
          {productsCategoryStatus === 'loading' &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
              <CategoryItemSkeleton key={i} />
            ))}
          {productsCategoryStatus === 'success' &&
            productsCategory.data &&
            productsCategory.data.map((el) => (
              <CategoryProductBlock item={el} key={el.url} />
            ))}
        </div>
        {!productsCategory.data ||
          (!productsCategory.data.length && (
            <h2>По данному запросу продуктов не найдено...</h2>
          ))}
      </div>
      {productsCategory.numberOfPages > 1 && (
        <Pagination numberOfPages={productsCategory.numberOfPages} />
      )}
      <InfoBlock />
    </>
  );
};

export default Categories;
