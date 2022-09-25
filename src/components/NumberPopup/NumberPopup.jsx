import React, { useState } from 'react';
import styles from './NumberPopup.module.scss';

const NumberPopup = () => {
  const [numberHover, setNumberHover] = useState(false);

  const onClickNumber = () => {
    setNumberHover(!numberHover);
  };

  return (
    <>
      <span className={styles.number} onClick={onClickNumber}>
        496 20 08 <div className={styles.triangle}></div>
        {numberHover && (
          <div className={styles.numberPopupContainer}>
            <p>+38(044) 496-20-09</p>
            <p>
              +38(044) 407-17-67 <span>факс</span>
            </p>
            <p>
              +38(067) 445-37-23 <span>Антон</span>{' '}
            </p>
            <p>
              +38(067) 404-50-80 <span>Аркадий</span>{' '}
            </p>
            <p>
              +38(067) 445-37-24 <span>Павел</span>{' '}
            </p>
            <p>
              +38(097) 593-14-37{' '}
              <span style={{ color: 'blue' }}>Служба сервиса</span>
            </p>
          </div>
        )}
      </span>
    </>
  );
};

export default NumberPopup;
