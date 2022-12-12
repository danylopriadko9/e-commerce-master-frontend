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
import { Link, useLocation } from 'react-router-dom';

import InfoBlock from '../../components/InfoBlock/InfoBlock';
import CategorySkeleton from '../../components/Skeleton/CategorySkeleton';
import HistoryMap from '../../components/HistoryMap/HistoryMap';
import Pagination from '../../components/Pagination /Pagination';
import FilterBlock from '../../components/FilterBlock/FilterBlock';
import { Helmet } from 'react-helmet';
import { apiurl } from '../../axios';

const Categories = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [meta, setMeta] = React.useState(null);

  React.useEffect(() => {
    dispatch(setPageNumber(1));

    setMeta(() => {
      return categories.find(
        (el) => el.url === location.pathname.replace('/group_', '')
      );
    });
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const {
    productsCategory,
    productsCategoryStatus,
    actualSubcategoriesPage,
    actualSubcategoriesPageStatus,
    actualPage,
    categories,
  } = useSelector((state) => state.category);

  React.useEffect(() => {
    if (!location.pathname.includes('categories')) {
      dispatch(
        fetchProductsCategory({ url: location.pathname, page: actualPage })
      );
      dispatch(
        getSubcategoriesInformation(location.pathname.replace('/group_', ''))
      );
    }

    window.scrollTo(0, 0);
  }, [actualPage, location.pathname]);

  if (location.pathname.includes('categories')) {
    return (
      <>
        <div className={styles.container}>
          <HistoryMap />
          <div className={styles.items_container}>
            {categories &&
              categories
                .filter((el) => el.parent_id === 0)
                .map((el) => (
                  <Link
                    className={styles.categoryBlock}
                    to={`/group_${el.url}`}
                    key={el.url}
                  >
                    <div className={styles.img_container}>
                      <img src={`${apiurl}/category/photo/${el.id}`} alt='' />
                    </div>
                    <div className={styles.indikator}></div>
                    <p>{el.name}</p>
                  </Link>
                ))}
          </div>
        </div>
      </>
    );
  }

  if (
    actualSubcategoriesPageStatus === 'loading' ||
    actualSubcategoriesPage.length
  ) {
    return (
      <>
        {meta && (
          <Helmet>
            <meta name='title' content={meta.meta_title} />
            <meta charSet='utf-8' />
            <meta name='keywords' content={meta.meta_keywords} />
            <meta name='description' content={meta.meta_description} />
          </Helmet>
        )}

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
      </>
    );
  }

  return (
    <>
      {meta && (
        <Helmet>
          <meta name='title' content={meta.meta_title} />
          <meta charSet='utf-8' />
          <meta name='keywords' content={meta.meta_keywords} />
          <meta name='description' content={meta.meta_description} />
        </Helmet>
      )}
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
