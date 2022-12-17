import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsItem.module.scss';
import { useTranslation } from 'react-i18next';

const NewsItem = ({ name, short_description, t_created }) => {
  const { t, i18n } = useTranslation();

  return (
    <Link className={styles.container}>
      <div className={styles.imageContainer}>
        <img src='' alt='' />
      </div>
      <p className={styles.date}>{t_created.slice(0, 10)}</p>
      <p className={styles.description}>{short_description}</p>
      <Link>{t('news.read')}</Link>
    </Link>
  );
};

export default NewsItem;
