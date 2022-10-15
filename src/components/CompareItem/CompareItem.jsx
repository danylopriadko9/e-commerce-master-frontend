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

  const { actualProductsValues } = useSelector((state) => state.compartison);
  console.log();
  return (
    <div className={styles.container}>
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
      {actualProductsValues[product_id] &&
        actualProductsValues[product_id].map((el) => (
          <p key={el.value}>{el.value}</p>
        ))}
      {actualProductsValues[product_id] && (
        <p>{actualProductsValues[product_id][0].guarantee}</p>
      )}
    </div>
  );
};

export default CompareItem;
