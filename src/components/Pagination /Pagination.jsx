import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  degreasePageNumber,
  increasePageNumber,
  setPageNumber,
} from '../../redux';
import styles from './Pagination.module.scss';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { BiDotsHorizontal } from 'react-icons/bi';

const Pagination = ({ numberOfPages }) => {
  const dispatch = useDispatch();
  const { actualPage } = useSelector((state) => state.category);

  const handleIncreasePageNumber = () => {
    if (actualPage < numberOfPages) {
      dispatch(increasePageNumber());
      window.scrollTo(0, 0);
    }
  };

  const handleDegreasePageNumber = () => {
    if (actualPage > 1) {
      dispatch(degreasePageNumber());
      window.scrollTo(0, 0);
    }
  };

  const handleSetPageNumber = (i) => {
    dispatch(setPageNumber(i));
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.pagination_container}>
      <div className={styles.arrows} onClick={handleDegreasePageNumber}>
        <AiOutlineLeft />
      </div>
      {actualPage >= 5 && (
        <>
          <div
            onClick={() => handleSetPageNumber(1)}
            className={
              1 === actualPage
                ? `${styles.pagination_block} ${styles.active}`
                : `${styles.pagination_block}`
            }
            key={0}
          >
            1
          </div>
          <div className={`${styles.pagination_block} ${styles.dots}`}>
            <BiDotsHorizontal />
          </div>
        </>
      )}
      {new Array(numberOfPages)
        .fill(1)
        .map((a, i) => i + 1)
        .map((value) => {
          if (value > actualPage - 4 && value < actualPage + 4) {
            return (
              <div
                onClick={() => handleSetPageNumber(value)}
                className={
                  value === actualPage
                    ? `${styles.pagination_block} ${styles.active}`
                    : `${styles.pagination_block}`
                }
                key={value}
              >
                {value}
              </div>
            );
          }
        })}
      {actualPage <= numberOfPages - 4 && (
        <>
          <div className={`${styles.pagination_block} ${styles.dots}`}>
            <BiDotsHorizontal />
          </div>
          <div
            onClick={() => handleSetPageNumber(numberOfPages)}
            className={
              numberOfPages === actualPage
                ? `${styles.pagination_block} ${styles.active}`
                : `${styles.pagination_block}`
            }
            key={numberOfPages + 1}
          >
            {numberOfPages}
          </div>
        </>
      )}
      <div className={styles.arrows} onClick={handleIncreasePageNumber}>
        <AiOutlineRight />
      </div>
    </div>
  );
};

export default Pagination;
