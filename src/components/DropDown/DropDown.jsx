import React from 'react';
import styles from './DropDown.module.scss';
import { BiCategoryAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategories,
  searchActualCategory,
  actualSubcategoriesPageClean,
} from '../../redux/slices/categorySlice';

const DropDown = () => {
  const dispatch = useDispatch();
  const { categories, actualSubcategories, actualCategory } = useSelector(
    (state) => state.category
  );

  const { language } = useSelector((state) => state.language);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [language]);

  const categoryMouseEnter = (id) => {
    dispatch(searchActualCategory(id));
  };

  return (
    <>
      <div className={styles.dropdownContainer}>
        <Link className={styles.categoryButton} to='/categories'>
          <BiCategoryAlt />
          <span>КАТАЛОГ</span>
        </Link>
        <div className={styles.dropdownContent}>
          <div className={styles.dropdown}>
            {categories &&
              categories
                .filter((el) => el.parent_id === 0)
                .map((el) => (
                  <Link
                    to={`/group_${el.url}`}
                    onMouseEnter={() => categoryMouseEnter(el.id)}
                    key={el.url}
                  >
                    <div className={styles.indikator}></div>
                    {el.name}
                  </Link>
                ))}
          </div>

          <div className={styles.categoryItems}>
            <h3>
              {actualCategory?.name}
              <div className={styles.itemsIndikator}></div>
            </h3>
            {actualSubcategories.map((el) => (
              <div className={styles.itemsContainer} key={el.url}>
                <Link
                  className={styles.item}
                  onClick={() => dispatch(actualSubcategoriesPageClean())}
                  to={`/group_${el.url}`}
                >
                  {el.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DropDown;
