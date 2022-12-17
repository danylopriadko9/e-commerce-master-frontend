import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Ofer.module.scss';

const Ofer = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const [qty, setQty] = React.useState(0);
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    setQty(() => {
      return cartItems.reduce((acc, val) => {
        return (acc += val.qty);
      }, 0);
    });
  }, []);

  React.useEffect(() => {
    setProduct(() => {
      return qty === '1' && qty !== '1'
        ? t('ofer.product')
        : qty >= 5 && qty <= 20
        ? t('ofer.products')
        : t('ofer.product2');
    });
  }, [qty]);

  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={styles.totalBlock}>
        <div className={styles.totalInformationContainer}>
          <h3>{t('ofer.result')}: </h3>
          <p className={styles.totalPrice}>
            {qty} {product} {t('ofer.sum')}:{' '}
            <span>{Math.ceil(totalPrice)} UAH</span>
          </p>
          <p className={styles.deliveryPrice}>
            {t('ofer.delivery_cost')}: <span>1054 UAH</span>
          </p>
          <p className={styles.priceWithDelivery}>
            {t('ofer.to_pay')} <span>105664 грн</span>
          </p>
        </div>
        <div className={styles.buttonBlock}>
          <button>{t('ofer.confirm_ofer')}</button>
          <Link className={styles.confirm_user_rules}>
            {t('ofer.confirm_user')}
          </Link>
        </div>
      </div>

      <div className={styles.clientInfo}>
        <div className={styles.title}>
          <h2>
            {t('ofer.contacts')}
            <div className={styles.indikator}></div>
          </h2>
        </div>
        <div className={styles.formBlock}>
          <div className={styles.left}>
            <input type='text' placeholder='Имя и фамилия' />
            <input type='text' placeholder='Город' />
            <input type='text' placeholder='Мобильный телефон' />
          </div>
          <div className={styles.right}>
            <input type='text' placeholder='Email' />
          </div>
        </div>
      </div>
      <div className={styles.clientInfo}>
        <div className={styles.title}>
          <h2>
            {t('ofer.chose_delivery_method')}
            <div className={styles.indikator}></div>
          </h2>
        </div>
        <div className={styles.radioDeviveryContainer}>
          <div className={styles.radioTopContainer}>
            <div className={styles.left}>
              <div>
                <input
                  type='radio'
                  id='contactChoice1'
                  name='contact'
                  value='email'
                />
                <label htmlFor='contactChoice1'>{t('ofer.pickup')}</label>
              </div>
            </div>

            <div className={styles.pochta}>
              <input
                type='radio'
                id='contactChoice2'
                name='contact'
                value='phone'
              />
              <label htmlFor='contactChoice2'>{t('ofer.novaja_pochta')}</label>
            </div>
          </div>
          <input type='radio' id='contactChoice3' name='contact' value='mail' />
          <input
            type='text'
            htmlFor='contactChoice3'
            placeholder='Адрес доставки'
            disabled
            className={styles.adresDelivery}
          />
        </div>
      </div>
      <div className={styles.clientInfo}>
        <hr />
        <div className={styles.title}>
          <h2>
            {t('ofer.pay')}
            <div className={styles.indikator}></div>
          </h2>
        </div>
        <form>
          <div className={styles.feeContainer}>
            <div>
              <input
                type='radio'
                id='contactChoice1'
                name='contact'
                value='email'
              />
              <label htmlFor='contactChoice1'>{t('ofer.cash')}</label>
            </div>
            <div>
              <input
                type='radio'
                id='contactChoice1'
                name='contact'
                value='email'
              />
              <label htmlFor='contactChoice1'>{t('ofer.pay_cart')}</label>
            </div>
            <div>
              <input
                type='radio'
                id='contactChoice1'
                name='contact'
                value='email'
              />
              <label htmlFor='contactChoice1'>{t('ofer.privat24')}</label>
            </div>
            <div>
              <input
                type='radio'
                id='contactChoice1'
                name='contact'
                value='email'
              />
              <label htmlFor='contactChoice1'>{t('ofer.non_cash')}</label>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.confirmation}>
        <button>{t('ofer.confirm')}</button>
        <Link>{t('ofer.confirm_user')}</Link>
      </div>
    </>
  );
};

export default Ofer;
