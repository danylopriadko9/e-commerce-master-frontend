import React from 'react';
import styles from './FilterBlock.module.scss';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubcategoriesFilterParams } from '../../redux';
import CompareLine from '../CompareLine/CompareLine';
import {
  fetchCategoryParams,
  postFiltrationParams,
} from '../../redux/slices/filtrationSlice';
import axios from '../../axios';

const FilterBlock = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const selectContainer = React.useRef(null);
  const minPrice = React.useRef(null);
  const maxPrice = React.useRef(null);
  const checkboxCotainer = React.useRef(null);

  const groupurl = location.pathname.split('/')[1].replace('group_', '');

  React.useEffect(() => {
    dispatch(getSubcategoriesFilterParams(groupurl));
    dispatch(fetchCategoryParams(groupurl));
  }, []);

  const { filterStatus, filterParams } = useSelector((state) => state.category);

  const { categoryParams, categoryValues } = useSelector(
    (state) => state.filter
  );

  const postFiltersParams = async () => {
    const result = {
      brands: [],
    };

    for (let i = 0; i < selectContainer.current.children.length; i++) {
      if (selectContainer.current.children[i].children.select.value.length) {
        result[selectContainer.current.children[i].children.select.id] =
          selectContainer.current.children[i].children.select.value;
      }
    }

    result.min_price = minPrice.current.value;
    result.max_price = maxPrice.current.value;

    for (let i = 0; i < checkboxCotainer.current.children.length; i++) {
      if (checkboxCotainer.current.children[i].children[0].checked) {
        result.brands.push(
          checkboxCotainer.current.children[i].children[0].value
        );
      }
    }

    const { data } = await axios.post(`/filter/post/${groupurl}`, result);
    console.log(data);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.brends_choise}>
          <p className={styles.subtitle}>Бренд:</p>
          <div ref={checkboxCotainer}>
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
                  />
                  <label for='manufacturer'>{el.name}</label>
                </div>
              ))}
          </div>
          <div className={styles.price}>
            <p className={styles.subtitle}>Цена:</p>
            <p>
              От
              <input ref={minPrice} type='number' />
              грн
            </p>
            <p>
              До
              <input ref={maxPrice} type='number' />
              грн
            </p>
          </div>
        </div>
        <div className={styles.characteristics}>
          <div
            ref={selectContainer}
            className={styles.characteristict_container}
          >
            {categoryParams &&
              categoryParams.length > 0 &&
              categoryParams.map((el) => (
                <div
                  key={el.property_id}
                  name='properties'
                  className={styles.characteristicBlock}
                >
                  <p>{el.characteristic}</p>
                  <select name='select' id={el.property_id}>
                    <option value=''>Все</option>
                    {categoryValues[el.property_id].map((e, i) => (
                      <option key={i} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
          </div>
        </div>
        <button onClick={postFiltersParams}>Submit</button>
      </div>
      <CompareLine />
    </>
  );
};

export default FilterBlock;
