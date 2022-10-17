import React from 'react';
import styles from './CompareItem.module.scss';
import InformationBlock from '../InformationBlock/InformationBlock';
import { RiCloseFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCompartisonProduct,
  fetchActualProductsCharacteristicsValue,
} from '../../redux/slices/comparisonSlice';

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
  console.log();
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
          <img
            src={`http://localhost:3001/getProductImage/${product_id}`}
            alt=''
          />
        </div>
        <InformationBlock product={el} />
      </div>
      <div className={styles.params}>
        {actualCategoryCharacteristicsStatus === 'success' &&
          actualCategoryCharacteristics.length > 0 &&
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
                  'Нет описания'
                )
              ) : (
                <></>
              )}
            </p>
          ))}
        <p>Гарантия</p>
      </div>
    </div>
  );
};

export default CompareItem;
