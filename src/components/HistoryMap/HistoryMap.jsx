import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchHistory } from '../../redux/slices/historyMap';
import styles from './HistoryMap.module.scss';

const HistoryMap = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHistory(location.pathname.replace('/', '')));
  }, [location]);

  const { history } = useSelector((state) => state.history);

  return (
    <div className={styles.container}>
      {location.pathname.includes('search') ? (
        <p>
          <span>
            <Link to={`/`}>Главная</Link>
            <div className={styles.indefikator}></div>
          </span>
          <span>
            <Link>Поиск</Link>
          </span>
        </p>
      ) : (
        <p>
          <span>
            <Link to={`/`}>Главная</Link>
            <div className={styles.indefikator}></div>
          </span>
          {history.parent_name && (
            <span>
              <Link to={`/group_${history.parent_url}`}>
                {history.parent_name}
              </Link>
              <div className={styles.indefikator}></div>
            </span>
          )}
          {history.category_name && (
            <span>
              <Link to={`/group_${history.category_url}`}>
                {history.category_name}
              </Link>
              <div className={styles.indefikator}></div>
            </span>
          )}
          {history.product_name && (
            <span>
              <Link>{history.product_name}</Link>
              <div className={styles.indefikator}></div>
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default HistoryMap;
