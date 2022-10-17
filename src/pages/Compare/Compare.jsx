import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Compare.module.scss';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import {
  fetchActualCategoryCharacteristics,
  setActualProductsCompartison,
} from '../../redux/slices/comparisonSlice';
import CompareItem from '../../components/CompareItem/CompareItem';

const Compare = () => {
  const dispatch = useDispatch();

  const {
    compartisonProducts,
    categories,
    resultOfFilter,
    actualCategoryCharacteristics,
  } = useSelector((state) => state.compartison);
  console.log(actualCategoryCharacteristics);
  const [actualCategory, setActualCategory] = React.useState(categories[0]);

  React.useEffect(() => {
    if (categories.length) {
      console.log(categories);
      dispatch(setActualProductsCompartison(categories[0].category_id));
      dispatch(fetchActualCategoryCharacteristics(categories[0].category_id));
    }

    window.scrollTo(0, 0);
    console.log('Перерендер');
  }, []);

  const handleChangeActualCategory = (category) => {
    setActualCategory(category);
    dispatch(setActualProductsCompartison(category.category_id));
    dispatch(fetchActualCategoryCharacteristics(category.category_id));
  };

  return (
    <div className={styles.container}>
      <p className={styles.title_container}>
        <div className={styles.indikator}></div>
        <span className={styles.title}>Сравнение</span>{' '}
        {compartisonProducts.length} товаров
      </p>
      <div className={styles.categories_line}>
        {categories &&
          categories.map((el) => (
            <div
              className={
                actualCategory.category_id === el.category_id
                  ? `${styles.category_buttons} ${styles.active}`
                  : styles.category_buttons
              }
              onClick={() => handleChangeActualCategory(el)}
              key={el.category_id}
            >
              {el.category_name}
              <span>{`(${
                compartisonProducts.filter(
                  (e) => e.category_id === el.category_id
                ).length
              })`}</span>
            </div>
          ))}
      </div>
      <div className={styles.compare_products_container}>
        {compartisonProducts.length > 0 ? (
          <div className={styles.params}>
            <div className={styles.header}>
              <p>
                <AiOutlineCheckCircle />
                <span>Очистить выбор</span>
              </p>
              <p>
                <AiOutlineCheckCircle />
                <span>Добавить другой товар</span>
              </p>
            </div>
            <div>
              {actualCategoryCharacteristics &&
                actualCategoryCharacteristics.map((el, i) => (
                  <p className={i % 2 === 0 ? styles.secound : ''} key={i}>
                    {el.characteristic}
                  </p>
                ))}

              <p className={styles.secound}>Гарантия</p>
            </div>
          </div>
        ) : (
          <h2>Продукты для сравнения отсутствуют...</h2>
        )}
        {resultOfFilter.map((el) => (
          <CompareItem el={el} key={el.product_id} />
        ))}
      </div>
    </div>
  );
};

export default Compare;