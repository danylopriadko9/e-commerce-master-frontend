import React from 'react';
import Slider from '../../components/Slider/Slider';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <div className={styles.container}>
      <Slider />
    </div>
  );
};

export default Main;
