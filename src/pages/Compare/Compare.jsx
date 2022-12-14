import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Compare.module.scss';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import {
  fetchActualCategoryCharacteristics,
  fetchActualProductsProperties,
  setActualProductsCompartison,
} from '../../redux/slices/comparisonSlice';
import CompareItem from './CompareItem/CompareItem';
import PropertysProducts from '../../components/PropertysProducts/PropertysProducts';
import { useTranslation } from 'react-i18next';

const Compare = () => {
  const dispatch = useDispatch();

  const { language } = useSelector((state) => state.language);

  const {
    compartisonProducts,
    categories,
    resultOfFilter,
    actualCategoryCharacteristics,
    propertyProducts,
    propertyProductsStatus,
  } = useSelector((state) => state.compartison);

  const [actualCategory, setActualCategory] = React.useState(categories[0]);

  // отслеживаем изменение языка и первичную отгрузку данных
  React.useEffect(() => {
    if (categories.length) {
      dispatch(setActualProductsCompartison(categories[0].category_id));
      dispatch(fetchActualCategoryCharacteristics(categories[0].category_url));
    }
    window.scrollTo(0, 0);
  }, [language]);

  // при добавлении новой категории
  React.useEffect(() => {
    if (categories.length > 0) {
      handleChangeActualCategory(categories[0]);
    }
    dispatch(fetchActualProductsProperties(resultOfFilter));
  }, [categories.length]);

  // поиск продуктов которые покупают вместе с выбраными айтемами
  React.useEffect(() => {
    dispatch(fetchActualProductsProperties(resultOfFilter));
  }, [resultOfFilter, language]);

  // функция которая меняет х-ки актуальной категории и ищет продукты из этой категории
  const handleChangeActualCategory = ({ category_id, category_url }) => {
    setActualCategory({ category_id });
    dispatch(setActualProductsCompartison(category_id));
    dispatch(fetchActualCategoryCharacteristics(category_url));
    dispatch(fetchActualProductsProperties(resultOfFilter));
  };

  const { t, i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <p className={styles.title_container}>
        <div className={styles.indikator}></div>
        <span className={styles.title}>{t('compare.comparing')}</span>{' '}
        {compartisonProducts.length} {t('compare.products')}
      </p>
      <div className={styles.categories_line}>
        {categories.length > 0 &&
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
                <span>{t('compare.clear')}</span>
              </p>
              <p>
                <AiOutlineCheckCircle />
                <span>{t('compare.add')}</span>
              </p>
            </div>
            <div>
              {actualCategoryCharacteristics &&
                actualCategoryCharacteristics.map((el, i) => (
                  <p className={i % 2 === 0 ? styles.secound : ''} key={i}>
                    {el.characteristic}
                  </p>
                ))}

              <p className={styles.secound}>{t('header.warranty')}</p>
            </div>
          </div>
        ) : (
          <h2>{t('compare.no_products_to_compare')}</h2>
        )}
        {resultOfFilter.length > 0 && (
          <div className={styles.compare_items_container}>
            {resultOfFilter.map((el) => (
              <CompareItem el={el} key={el.product_id} />
            ))}
          </div>
        )}
      </div>
      <PropertysProducts
        products={propertyProducts}
        title={t('sliders_titles.buy_also')}
        status={propertyProductsStatus}
        type={'products'}
      />
    </div>
  );
};

export default Compare;
