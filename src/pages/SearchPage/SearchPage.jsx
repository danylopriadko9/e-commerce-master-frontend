import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import CategoryProductBlock from '../../components/CategoryProductBlock/CategoryProductBlock';
import HistoryMap from '../../components/HistoryMap/HistoryMap';
import Pagination from '../../components/Pagination /Pagination';
import CategoryItemSkeleton from '../../components/Skeleton/CategoryItemSkeleton';
import { setPageNumber } from '../../redux';
import {
  fetchSearchItems,
  setSearchValue,
} from '../../redux/slices/searchSlice';
import Item from '../Categories/Item/Item';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  const { actualPage } = useSelector((state) => state.category);

  React.useEffect(() => {
    dispatch(
      fetchSearchItems({
        searchValue: params.searchValue,
        groupUrl: params.url,
        page: actualPage,
      })
    );
  }, [location, actualPage]);

  const { actualSearchItems, status, searchValue } = useSelector(
    (state) => state.search
  );

  React.useEffect(() => {
    dispatch(setPageNumber(1));

    if (!searchValue.length) {
      const searchValueFromLink =
        location.pathname.split('/')[location.pathname.split('/').length - 1];
      dispatch(setSearchValue(searchValueFromLink));
    }
  }, []);

  if (status === 'success' && actualSearchItems.data.length === 0) {
    return (
      <div className={styles.container}>
        <HistoryMap />
        <h2
          style={{ marginTop: '20px' }}
        >{`По запросу ${searchValue} ничего не найдено...`}</h2>
      </div>
    );
  }

  if (actualSearchItems.type === 'category') {
    return (
      <div className={styles.container}>
        <HistoryMap />
        <div className={styles.items_container}>
          {status === 'loading' &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
              <CategoryItemSkeleton key={i} />
            ))}
          {status === 'success' &&
            actualSearchItems.data.map((el) => <Item el={el} key={el.url} />)}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <HistoryMap />
      <div className={styles.items_container}>
        {status === 'loading' &&
          [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
            <CategoryItemSkeleton key={i} />
          ))}
        {status === 'success' &&
          actualSearchItems.data.map((el) => (
            <CategoryProductBlock item={el} key={el.url} />
          ))}
      </div>
      {status === 'success' && (
        <Pagination numberOfPages={actualSearchItems.pageQty} />
      )}
    </div>
  );
};

export default SearchPage;
