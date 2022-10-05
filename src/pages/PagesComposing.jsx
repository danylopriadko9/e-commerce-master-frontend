import React from 'react';
import { useParams } from 'react-router-dom';
import { determinantFunction } from '../utils/pagesDeterminant';
import styles from './PagesComposing.module.scss';

const PagesComposing = () => {
  const { url } = useParams();
  const pageType = determinantFunction(url);
  console.log(pageType);

  return <div className={styles.container}>PagesComposing</div>;
};

export default PagesComposing;
