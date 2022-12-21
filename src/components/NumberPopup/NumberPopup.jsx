import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../../redux/slices/languageSlice';
import styles from './NumberPopup.module.scss';

const NumberPopup = () => {
  //const [numberHover, setNumberHover] = useState(false);
  const dispatch = useDispatch();

  const onClickNumber = () => {
    //setNumberHover(!numberHover);
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (lan) => {
    i18n.changeLanguage(lan);
    const language = localStorage.getItem('i18nextLng');
    dispatch(setLanguage(language));
  };

  return (
    <>
      <span className={styles.number} onClick={onClickNumber}>
        <div className={styles.phone_number}>496 20 08</div>
        <div className={styles.language_buttons}>
          <span onClick={() => changeLanguage('ru')}>Русский </span>/
          <span onClick={() => changeLanguage('ua')}> Українська</span>
        </div>
        {/* {numberHover && (
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
        )} */}
      </span>
    </>
  );
};

export default NumberPopup;
