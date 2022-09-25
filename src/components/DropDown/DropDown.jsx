import React, { useState } from 'react';
import { categoryData, categoryItems } from '../Header/dropdownData';
import styles from './DropDown.module.scss';
import { BiCategoryAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const DropDown = () => {
  const [isShown, setIsShown] = useState(null);

  const dropDownItemsHover = (id) => {
    setIsShown(id);
  };

  const dropDownItemsLeave = () => {
    setIsShown(null);
  };
  return (
    <>
      <div className={styles.dropdownContainer}>
        <BiCategoryAlt />
        <span>КАТАЛОГ</span>
        <div className={styles.dropdown}>
          {categoryData.map((el, id) => (
            <Link
              key={id}
              to={el.url}
              onMouseEnter={() => dropDownItemsHover(id)}
              onMouseLeave={dropDownItemsLeave}
            >
              <div className={styles.indikator}></div>
              {el.title}
            </Link>
          ))}
        </div>
        {isShown !== null && (
          <div
            onMouseLeave={dropDownItemsLeave}
            onMouseEnter={() => dropDownItemsHover(isShown)}
            className={styles.categoryItems}
          >
            <h3>
              {categoryData[isShown].title}
              <div className={styles.itemsIndikator}></div>
            </h3>

            <div className={styles.itemsContainer}>
              {categoryItems[isShown].map((el) => (
                <Link key={el} className={styles.item}>
                  {el}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DropDown;
