import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReationProducts } from '../../redux/slices/productPageSlice';
import DiscountItem from '../DiscountItem/DiscountItem';
import Items from '../ItemsSlider/Items';
import styles from './PropertysProducts.module.scss';

const PropertysProducts = ({ id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReationProducts(id));
  }, [id]);

  const { reationProducts, reationStatus } = useSelector(
    (state) => state.actualProduct
  );

  return (
    <>
      {reationProducts.length > 0 &&
        (reationProducts.length > 4 ? (
          <div className={styles.slider_container}>
            <h2>
              <div className={styles.indikator}></div>С этим товаром часто
              покупают
            </h2>
            <Items items={reationProducts} status={reationStatus} />
          </div>
        ) : (
          <div className={styles.property_item_container}>
            <h2>
              <div className={styles.indikator}></div>С этим товаром часто
              покупают
            </h2>
            <div className={styles.list_of_items}>
              {reationProducts.map((el) => (
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
