import React from 'react';
import styles from './Discount.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDiscountProducts } from '../../redux/slices/discountProductsSlice';
import Items from './Items';

import { fetchNewProducts } from '../../redux/slices/newProductsSlice';
import { fetchNews } from '../../redux/slices/newsSlice';

const ItemsSlider = ({ title }) => {
  const dispatch = useDispatch();

  const { discountProducts, discountProductsStatus } = useSelector(
    (state) => state.discount
  );

  const { newProducts, newProductsStatus } = useSelector(
    (state) => state.newProducts
  );

  const { news, newsStatus } = useSelector((state) => state.news);

  React.useEffect(() => {
    if (title === 'Акции' && !discountProducts.length)
      dispatch(fetchDiscountProducts());
    if (title === 'Новинки' && !newProducts.length)
      dispatch(fetchNewProducts());
    if (title === 'Новости' && !news.length) dispatch(fetchNews());
  }, []);

  return (
    <div className={styles.container}>
      <h1>
        <div className={styles.indicator}></div>
        {title}
      </h1>
      <div className={styles.itemsContainer}>
        {title === 'Акции' && (
          <Items
            status={discountProductsStatus}
            items={discountProducts}
            title={title}
          />
        )}

        {title === 'Новинки' && (
          <Items status={newProductsStatus} items={newProducts} title={title} />
        )}

        {title === 'Новости' && (
          <Items status={newsStatus} items={news} title={title} />
        )}
      </div>
    </div>
  );
};

export default ItemsSlider;
