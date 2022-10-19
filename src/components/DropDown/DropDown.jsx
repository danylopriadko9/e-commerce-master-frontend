import { useEffect } from 'react';
import styles from './DropDown.module.scss';
import { BiCategoryAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  actualSubcategoriesPageClean,
  fetchCategories,
  searchActualCategory,
} from '../../redux/index';

const DropDown = () => {
  const dispatch = useDispatch();
  const { categories, actualSubcategories, actualCategory } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, []);

  const categoryMouseEnter = (id) => {
    dispatch(searchActualCategory(id));
  };

  return (
    <>
      <div className={styles.dropdownContainer}>
        <BiCategoryAlt />
        <span>КАТАЛОГ</span>
        <div className={styles.dropdownContent}>
          <div className={styles.dropdown}>
            {categories
              .filter((el) => el.parent_id === 0)
              .map((el) => (
                <Link
                  to={`group_${el.url}`}
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
              {actualCategory}
              <div className={styles.itemsIndikator}></div>
            </h3>
            {actualSubcategories.map((el) => (
              <div className={styles.itemsContainer} key={el.url}>
                <Link
                  className={styles.item}
                  onClick={() => dispatch(actualSubcategoriesPageClean())}
                  to={`group_${el.url}`}
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
