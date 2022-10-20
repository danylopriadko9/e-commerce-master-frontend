import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { fetchSearchItems } from '../../redux/slices/searchSlice';
import styles from './SearchPage.module.scss';

const SearchPage = () => {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log(params);
    dispatch(
      fetchSearchItems({
        searchValue: params.searchValue,
        groupUrl: params.url,
      })
    );
  }, [location]);
  return <div className={styles.container}>SearchPage</div>;
};

export default SearchPage;
