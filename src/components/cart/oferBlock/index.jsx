import axios from 'axios';
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
  const [deliveryCost, setDeliveryCost] = React.useState(0);
  const [deliveryValiant, setDeliveryvariant] = React.useState(0);
  const [feeMethod, setFeeMethod] = React.useState(0);
  const [contactInfo, setContactInfo] = React.useState({
    name: '',
    city: '',
    phone: '',
    email: '',
    deliveryAdres: '',
  });

  const handleChangeContactInformation = (e) => {
    setContactInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  React.useEffect(() => {
    setQty(() => {
      return cartItems.reduce((acc, val) => {
        return (acc += val.qty);
      }, 0);
    });
  }, [cartItems]);

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

  const handleSubmitOfer = async () => {
    if (
      !contactInfo.name.length &&
      !contactInfo.city.length &&
      !contactInfo.phone.length &&
      !contactInfo.email.length
    ) {
      alert(
        'Некоректные данные либо информация отсутствует. Попробуйте еще раз!'
      );
      return;
    }

    if (deliveryValiant === 3 && !contactInfo.deliveryAdres.length) {
      alert('Введите адрес доставки!');
      return;
    }

    try {
      const { data } = await axios.post(`/ofer`, {
        contactInfo,
        feeMethod,
        deliveryValiant,
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
            {t('ofer.delivery_cost')}: <span>{deliveryCost} UAH</span>
          </p>
          <p className={styles.priceWithDelivery}>
            {t('ofer.to_pay')}{' '}
            <span>{Math.ceil(totalPrice + deliveryCost)} UAH</span>
          </p>
        </div>
        <div className={styles.buttonBlock}>
          <button onClick={handleSubmitOfer}>{t('ofer.confirm_ofer')}</button>
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
            <input
              type='text'
              placeholder='Имя и фамилия'
              onChange={handleChangeContactInformation}
              name='name'
              value={contactInfo.name}
            />
            <input
              type='text'
              placeholder='Город'
              name='city'
              onChange={handleChangeContactInformation}
              value={contactInfo.city}
            />
            <input
              type='text'
              placeholder='Мобильный телефон'
              name='phone'
              onChange={handleChangeContactInformation}
              value={contactInfo.phone}
            />
          </div>
          <div className={styles.right}>
            <input
              type='text'
              placeholder='Email'
              name='email'
              onChange={handleChangeContactInformation}
              value={contactInfo.email}
            />
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
                  onClick={() => setDeliveryvariant(1)}
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
                onClick={() => setDeliveryvariant(2)}
              />
              <label htmlFor='contactChoice2'>{t('ofer.novaja_pochta')}</label>
            </div>
          </div>
          <input
            type='radio'
            id='contactChoice3'
            name='contact'
            value='mail'
            onClick={() => setDeliveryvariant(3)}
          />
          <input
            type='text'
            htmlFor='contactChoice3'
            placeholder='Адрес доставки'
            disabled={deliveryValiant === 3 ? false : true}
            className={styles.adresDelivery}
            name='deliveryAdres'
            onChange={handleChangeContactInformation}
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
                onClick={() => setFeeMethod(1)}
              />
              <label htmlFor='contactChoice1'>{t('ofer.cash')}</label>
            </div>
            <div>
              <input
                type='radio'
                id='contactChoice1'
                name='contact'
                value='email'
                onClick={() => setFeeMethod(2)}
              />
              <label htmlFor='contactChoice1'>{t('ofer.pay_cart')}</label>
            </div>
            <div>
              <input
                type='radio'
                id='contactChoice1'
                name='contact'
                value='email'
                onClick={() => setFeeMethod(3)}
              />
              <label htmlFor='contactChoice1'>{t('ofer.privat24')}</label>
            </div>
            <div>
              <input
                type='radio'
                id='contactChoice1'
                name='contact'
                value='email'
                onClick={() => setFeeMethod(4)}
              />
              <label htmlFor='contactChoice1'>{t('ofer.non_cash')}</label>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.confirmation}>
        <button onClick={handleSubmitOfer}>{t('ofer.confirm')}</button>
        <Link>{t('ofer.confirm_user')}</Link>
      </div>
    </>
  );
};

export default Ofer;
