import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchHistory } from '../../redux/slices/historyMap';
import styles from './HistoryMap.module.scss';
import { useTranslation } from 'react-i18next';

const HistoryMap = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!location.pathname.includes('categories')) {
      dispatch(fetchHistory(location.pathname.replace('/', '')));
    }
  }, [location]);

  const { history } = useSelector((state) => state.history);

  const { t, i18n } = useTranslation();

  if (location.pathname.includes('categories')) {
    return (
      <div className={styles.container}>
        <p>
          <span>
            <Link to={`/`}>{t('history.main')}</Link>
            <div className={styles.indefikator}></div>
          </span>
          <span>
            <Link to={`/categories`}>{t('history.catalog')}</Link>
            <div className={styles.indefikator}></div>
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {location.pathname.includes('search') ? (
        <p>
          <span>
            <Link to={`/`}>{t('history.main')}</Link>
            <div className={styles.indefikator}></div>
          </span>
          <span>
            <Link>{t('history.search')}</Link>
          </span>
        </p>
      ) : (
        <p>
          <span>
            <Link to={`/`}>{t('history.main')}</Link>
            <div className={styles.indefikator}></div>
          </span>
          {history.parent_name && (
            <>
              <span>
                <Link to={`/categories`}>{t('history.catalog')}</Link>
                <div className={styles.indefikator}></div>
              </span>

              <span>
                <Link to={`/group_${history.parent_url}`}>
                  {history.parent_name}
                </Link>
                <div className={styles.indefikator}></div>
              </span>
            </>
          )}
          {history.category_name && !history.parent_name && (
            <>
              <span>
                <Link to={`/categories`}>{t('history.catalog')}</Link>
                <div className={styles.indefikator}></div>
              </span>
              <span>
                <Link to={`/group_${history.category_url}`}>
                  {history.category_name}
                </Link>
                <div className={styles.indefikator}></div>
              </span>
            </>
          )}

          {history.category_name && history.parent_name && (
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
