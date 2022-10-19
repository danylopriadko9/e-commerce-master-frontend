import React from 'react';
import DiscountItem from '../DiscountItem/DiscountItem';
import Items from '../ItemsSlider/Items';
import TitleComponent from '../TitleComponent/TitleComponent';
import styles from './PropertysProducts.module.scss';

const PropertysProducts = ({ id, title, products, status }) => {
  return (
    <>
      {products.length > 0 &&
        (products.length > 4 ? (
          <div className={styles.slider_container}>
            <Items
              items={products}
              status={status}
              type={'products'}
              title={title}
            />
          </div>
        ) : (
          <div className={styles.property_item_container}>
            <TitleComponent title={title} />
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
};

export default PropertysProducts;
