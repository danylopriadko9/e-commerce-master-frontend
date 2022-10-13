import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryProductBlock from '../../components/CategoryProductBlock/CategoryProductBlock';
import {
  fetchProductsCategory,
  getSubcategoriesInformation,
} from '../../redux/slices/categorySlice';
import styles from './Categories.module.scss';
import CategoryItemSkeleton from '../../components/Skeleton/CategoryItemSkeleton';
import Item from './Item/Item';
import { useLocation } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import CategorySkeleton from '../../components/Skeleton/CategorySkeleton';
import HistoryMap from '../../components/HistoryMap/HistoryMap';

const Categories = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setPage(1);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  React.useEffect(() => {
    dispatch(fetchProductsCategory({ url: location.pathname, page }));
    dispatch(
      getSubcategoriesInformation(location.pathname.replace('/group_', ''))
    );
    window.scrollTo(0, 0);
  }, [page, location.pathname]);

  const {
    productsCategory,
    productsCategoryStatus,
    actualSubcategoriesPage,
    actualSubcategoriesPageStatus,
  } = useSelector((state) => state.category);

  if (
    actualSubcategoriesPageStatus === 'loading' ||
    actualSubcategoriesPage.length
  ) {
    return (
      <div className={styles.container}>
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

  const increasePageNumber = () => {
    if (page < productsCategory.numberOfPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  const degreasePageNumber = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const setPageNumber = (i) => {
    setPage(i + 1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className={styles.container}>
        <HistoryMap />
        <div className={styles.items_container}>
          {productsCategoryStatus === 'loading'
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                <CategoryItemSkeleton key={i} />
              ))
            : productsCategory.data.map((el) => (
                <CategoryProductBlock item={el} key={el.url} />
              ))}
        </div>
      </div>
      <div className={styles.pagination_container}>
        <div className={styles.arrows} onClick={degreasePageNumber}>
          <AiOutlineLeft />
        </div>
        {[...new Array(productsCategory.numberOfPages)].map((el, i) => (
          <div
            onClick={() => setPageNumber(i)}
            className={
              i + 1 === page
                ? `${styles.pagination_block} ${styles.active}`
                : `${styles.pagination_block}`
            }
            key={i}
          >
            {i + 1}
          </div>
        ))}
        <div className={styles.arrows} onClick={increasePageNumber}>
          <AiOutlineRight />
        </div>
      </div>
      <InfoBlock />
    </>
  );
};

export default Categories;
