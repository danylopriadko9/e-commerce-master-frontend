import React from 'react';
import { useParams } from 'react-router-dom';
import { determinantFunction } from '../utils/pagesDeterminant';
import styles from './PagesComposing.module.scss';
import ProductComponent from '../pages/ProductPage/ProductPage.jsx';
import Categories from './Categories/Categories';
import Cart from '../components/cart/Cart';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const PagesComposing = () => {
  const { url } = useParams();
  const pageType = determinantFunction(url);

  if (pageType === 'tovar') {
    return (
      <>
        <ProductComponent url={url} />
      </>
    );
  }

  if (pageType === 'group') {
    return (
      <>
        <Categories />
      </>
    );
  }

  return (
    <>
      <div className={styles.container}>Ошибка</div>
    </>
  );
};

export default PagesComposing;
