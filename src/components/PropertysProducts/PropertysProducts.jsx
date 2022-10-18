import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReationProducts } from '../../redux/slices/productPageSlice';
import DiscountItem from '../DiscountItem/DiscountItem';
import Items from '../ItemsSlider/Items';
import styles from './PropertysProducts.module.scss';

const PropertysProducts = ({ id, title, products, status }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReationProducts(id));
  }, [id]);

  const { reationProducts, reationStatus } = useSelector(
    (state) => state.actualProduct
  );

  const { watchedProducts } = useSelector((state) => state.watchedProducts);

  if (products) {
    return (
      <>
        {products.length > 0 &&
          (products.length > 4 ? (
            <div className={styles.slider_container}>
              <h2>
                <div className={styles.indikator}></div>
                {title}
              </h2>
              <Items items={products} status={status} />
            </div>
          ) : (
            <div className={styles.property_item_container}>
              <h2>
                <div className={styles.indikator}></div>
                {title}
              </h2>
              <div className={styles.list_of_items}>
                {products.map((el) => (
                  <div className={styles.item_container} key={el.url}>
                    <DiscountItem {...el} />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </>
    );
  }

  const items =
    title === 'С этим товаром часто покупают'
      ? reationProducts
      : watchedProducts;

  return (
    <>
      {items.length > 0 &&
        (items.length > 4 ? (
          <div className={styles.slider_container}>
            <h2>
              <div className={styles.indikator}></div>
              {title}
            </h2>
            <Items items={items} status={reationStatus} />
          </div>
        ) : (
          <div className={styles.property_item_container}>
            <h2>
              <div className={styles.indikator}></div>
              {title}
            </h2>
            <div className={styles.list_of_items}>
              {items.map((el) => (
                <div className={styles.item_container} key={el.url}>
                  <DiscountItem {...el} />
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default PropertysProducts;
