import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import CategoryProductBlock from '../../components/CategoryProductBlock/CategoryProductBlock';
import HistoryMap from '../../components/HistoryMap/HistoryMap';
import CategoryItemSkeleton from '../../components/Skeleton/CategoryItemSkeleton';
import { fetchSearchItems } from '../../redux/slices/searchSlice';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      fetchSearchItems({
        searchValue: params.searchValue,
        groupUrl: params.url,
      })
    );
  }, [location]);

  const { actualSearchItems, status } = useSelector((state) => state.search);

  return (
    <div className={styles.container}>
      <HistoryMap />
      <div className={styles.items_container}>
        {status === 'loading' &&
          [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
            <CategoryItemSkeleton key={i} />
          ))}
        {status === 'success' &&
          actualSearchItems.map((el) => (
            <CategoryProductBlock item={el} key={el.url} />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
