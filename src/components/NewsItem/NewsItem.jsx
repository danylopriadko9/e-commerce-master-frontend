import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NewsItem.module.scss';

const NewsItem = ({ name, short_description, t_created }) => {
  return (
    <Link className={styles.container}>
      <div className={styles.imageContainer}>
        <img src='' alt='' />
      </div>
      <p className={styles.date}>{t_created.slice(0, 10)}</p>
      <p className={styles.description}>{short_description}</p>
      <Link>читать далее...</Link>
    </Link>
  );
};

export default NewsItem;
