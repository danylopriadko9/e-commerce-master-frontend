import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Compare.module.scss';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { setActualProductsCompartison } from '../../redux/slices/comparisonSlice';
import CompareItem from '../../components/CompareItem/CompareItem';

const Compare = () => {
  const dispatch = useDispatch();

  const { compartisonProducts, categories, resultOfFilter } = useSelector(
    (state) => state.compartison
  );
  const [actualCategory, setActualCategory] = React.useState(categories[0]);

  React.useEffect(() => {
    dispatch(setActualProductsCompartison(categories[0]));
    window.scrollTo(0, 0);
    console.log('Перерендер');
  }, []);

  const handleChangeActualCategory = (category) => {
    setActualCategory(category);
    dispatch(setActualProductsCompartison(category));
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
                actualCategory === el
                  ? `${styles.category_buttons} ${styles.active}`
                  : styles.category_buttons
              }
              onClick={() => handleChangeActualCategory(el)}
              key={el}
            >
              {el}
              <span>{`(${
                compartisonProducts.filter((e) => e.category_name === el).length
              })`}</span>
            </div>
          ))}
      </div>
      <div className={styles.compare_products_container}>
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
        </div>
        {resultOfFilter.map((el) => (
          <CompareItem el={el} key={el.product_id} />
        ))}
      </div>
    </div>
  );
};

export default Compare;
