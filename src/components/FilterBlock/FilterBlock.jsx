import React from 'react';
import styles from './FilterBlock.module.scss';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSubcategoriesFilterParams,
  setActualProducts,
} from '../../redux/slices/categorySlice';
import CompareLine from '../CompareLine/CompareLine';
import {
  changeBrands,
  changeParams,
  cleanParams,
  fetchCategoryParams,
} from '../../redux/slices/filtrationSlice';
import axios from 'axios';
import { BsCheckLg } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const FilterBlock = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [price, setPrice] = React.useState({
    min: null,
    max: null,
  });

  const groupurl = location.pathname.split('/')[1].replace('group_', '');

  React.useEffect(() => {
    dispatch(cleanParams());
    dispatch(getSubcategoriesFilterParams(groupurl));
    dispatch(fetchCategoryParams(groupurl));
  }, []);

  const { filterStatus, filterParams, params } = useSelector(
    (state) => state.category
  );

  const { categoryParams, categoryValues, submitParams } = useSelector(
    (state) => state.filter
  );

  const handleChangeParams = (characteristic_id, value_id) => {
    console.log(characteristic_id, value_id);
    dispatch(changeParams({ characteristic_id, value_id }));
  };

  const handleChangeBrands = (manufacturer_id, checked) => {
    dispatch(changeBrands({ manufacturer_id, checked }));
  };

  const handlePriceChange = (e) => {
    setPrice((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(price);
  };

  const handleSubmitFiltration = async () => {
    try {
      const language = localStorage.getItem('i18nextLng');
      const result = {
        min: price.min,
        max: price.max,
        params: submitParams.params,
        brands: submitParams.brands,
      };

      const { data } = await axios.post(
        `/category/test/${groupurl}?lan=${language}`,
        result
      );
      dispatch(setActualProducts({ data: data }));
    } catch (error) {
      console.log(error);
    }
  };

  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.brends_choise}>
          <p className={styles.subtitle}>{t('filtration.brand')}:</p>
          <div>
            {filterStatus === 'success' &&
              filterParams.map((el) => (
                <div
                  className={styles.manufacturer_block}
                  key={el.manufacturer_id}
                >
                  <input
                    type='checkbox'
                    name='manufacturer'
                    value={el.manufacturer_id}
                    onChange={(e) =>
                      handleChangeBrands(el.manufacturer_id, e.target.checked)
                    }
                  />
                  <label htmlFor='manufacturer'>{el.name}</label>
                </div>
              ))}
          </div>
          <div className={styles.price}>
            <p className={styles.subtitle}>{t('filtration.price')}:</p>
            <p>
              {t('filtration.from')}
              <input
                value={price.min ? price.min : ''}
                name='min'
                onChange={handlePriceChange}
                type='number'
              />
              UAH
            </p>
            <p>
              {t('filtration.to')}
              <input
                value={price.max ? price.max : ''}
                name='max'
                onChange={handlePriceChange}
                type='number'
              />
              UAH
            </p>
          </div>
        </div>
        <div className={styles.characteristics}>
          <div className={styles.characteristict_container}>
            {categoryParams &&
              categoryParams.length > 0 &&
              categoryParams.map((el) => (
                <div
                  key={el.property_id}
                  name='properties'
                  className={styles.characteristicBlock}
                >
                  <p>{el.characteristic}</p>
                  <select
                    name={el.property_id}
                    id={el.property_id}
                    onChange={(e) =>
                      handleChangeParams(e.target.name, e.target.value)
                    }
                  >
                    <option value={0}>Все</option>
                    {categoryValues[el.property_id] &&
                      categoryValues[el.property_id].map((e, i) => (
                        <option key={e.value_id} value={e.value_id}>
                          {e.value}
                        </option>
                      ))}
                  </select>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.submit_block}>
        <button onClick={handleSubmitFiltration}>
          <BsCheckLg />
        </button>
      </div>
      <CompareLine />
    </>
  );
};

export default FilterBlock;
