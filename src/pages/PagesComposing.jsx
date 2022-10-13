import React from 'react';
import { useParams } from 'react-router-dom';
import { determinantFunction } from '../utils/pagesDeterminant';
import styles from './PagesComposing.module.scss';
import ProductComponent from '../pages/ProductPage/ProductPage.jsx';
import Categories from './Categories/Categories';

const PagesComposing = () => {
  const { url } = useParams();
  const pageType = determinantFunction(url);

  if (pageType === 'tovar') {
    return <ProductComponent url={url} />;
  }

  if (pageType === 'group') {
    return <Categories />;
  }

  return (
    <>
      <div className={styles.container}>Ошибка</div>
    </>
  );
};

export default PagesComposing;
