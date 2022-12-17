import React from 'react';
import styles from './CompareLine.module.scss';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const CompareLine = () => {
  const { compartisonProducts } = useSelector((state) => state.compartison);

  const { t, i18n } = useTranslation();

  return (
    <>
      <p className={styles.compareQty}>
        <AiOutlineCheckCircle />
        <span>
          <span>{compartisonProducts.length}</span>
          {compartisonProducts.length.toString()[
            compartisonProducts.length - 1
          ] === '1' &&
          compartisonProducts.length.toString()[
            compartisonProducts.length - 2
          ] !== '1'
            ? t('ofer.product')
            : compartisonProducts.length >= 5 &&
              compartisonProducts.length <= 20
            ? t('ofer.products')
            : t('ofer.product2')}
        </span>
        <Link to='/compare'>{t('compare.compare')}</Link>
      </p>
    </>
  );
};

export default CompareLine;
