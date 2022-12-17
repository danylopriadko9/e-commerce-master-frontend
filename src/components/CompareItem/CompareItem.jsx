import React from 'react';
import styles from './CompareItem.module.scss';
import InformationBlock from '../InformationBlock/InformationBlock';
import { RiCloseFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCompartisonProduct,
  fetchActualProductsCharacteristicsValue,
} from '../../redux/slices/comparisonSlice';
import { apiurl } from '../../axios';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const CompareItem = ({ el }) => {
  const dispatch = useDispatch();

  const { product_id } = el;

  React.useEffect(() => {
    dispatch(fetchActualProductsCharacteristicsValue(product_id));
  }, []);

  const deleteProsuctFromCompare = (el) => {
    dispatch(deleteCompartisonProduct(el));
  };

  const {
    actualProductsValues,
    actualProductsValuesStatus,
    actualCategoryCharacteristicsStatus,
    actualCategoryCharacteristics,
  } = useSelector((state) => state.compartison);

  const { t, i18n } = useTranslation();

  const [image, setImage] = React.useState(null);

  const fetchProductPhoto = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/product/photo/${product_id}`
    );
    setImage(data);
  };

  React.useEffect(() => {
    if (!image) {
      fetchProductPhoto();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div
          className={styles.close}
          onClick={() => deleteProsuctFromCompare(el)}
        >
          <RiCloseFill />
        </div>
        <div className={styles.image_container}>
          <img src={`/static/${image}`} alt='' />
        </div>
        <InformationBlock product={el} />
      </div>
      <div className={styles.params}>
        {actualCategoryCharacteristicsStatus === 'success' &&
        actualCategoryCharacteristics.length > 0 ? (
          actualCategoryCharacteristics.map((el, i) => (
            <p
              className={
                i % 2 !== 0
                  ? styles.compare_value
                  : `${styles.compare_value} ${styles.secound}`
              }
              key={Math.random()}
            >
              {actualProductsValuesStatus === 'success' &&
              actualProductsValues[product_id] ? (
                actualProductsValues[product_id].find(
                  (e) => e.property_id === el.property_id
                ) ? (
                  actualProductsValues[product_id].find(
                    (e) => e.property_id === el.property_id
                  ).value
                ) : (
                  t('compare.no_desc')
                )
              ) : (
                <></>
              )}
            </p>
          ))
        ) : (
          <></>
        )}
        {actualProductsValuesStatus === 'success' &&
        actualProductsValues[product_id] ? (
          <p>
            {actualProductsValues[product_id][0] &&
              actualProductsValues[product_id][0].guarantee}{' '}
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CompareItem;
