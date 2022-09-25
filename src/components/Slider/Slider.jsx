import React, { useEffect, useRef, useState } from 'react';
import styles from './Slider.module.scss';
import { data } from './sliderData';

const Slider = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const delay = 5000;

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === data.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className={styles.container}>
      <div className={styles.counterOfSliders}>
        {index + 1} / {data.length}
      </div>
      <div className={styles.sliderContainer}>
        {data.map((el, i) => (
          <div
            className={styles.slide}
            style={{ transform: `translateX(${index * -960}px)` }}
            key={i}
          >
            <div className={styles.imageContainer}>
              <img src={el.image} alt='' />
              <div className={styles.description}>
                <span>{el.description}</span>
                <button>{el.buttonText}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
