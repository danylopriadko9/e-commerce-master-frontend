import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  degreasePageNumber,
  increasePageNumber,
  setPageNumber,
} from '../../redux';
import styles from './Pagination.module.scss';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

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
    dispatch(setPageNumber(i + 1));
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.pagination_container}>
      <div className={styles.arrows} onClick={handleDegreasePageNumber}>
        <AiOutlineLeft />
      </div>
      {[...new Array(numberOfPages)].map((_, i) => (
        <div
          onClick={() => handleSetPageNumber(i)}
          className={
            i + 1 === actualPage
              ? `${styles.pagination_block} ${styles.active}`
              : `${styles.pagination_block}`
          }
          key={i}
        >
          {i + 1}
        </div>
      ))}
      <div className={styles.arrows} onClick={handleIncreasePageNumber}>
        <AiOutlineRight />
      </div>
    </div>
  );
};

export default Pagination;
