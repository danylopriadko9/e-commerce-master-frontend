import React from 'react';
import styles from './TitleComponent.module.scss';

const TitleComponent = ({ title }) => {
  return (
    <>
      <h1 className={styles.title}>
        <div className={styles.indicator}></div>
        {title}
      </h1>
    </>
  );
};

export default TitleComponent;
