import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Ofer.module.scss';

const Ofer = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const [qty, setQty] = React.useState(0);

  React.useEffect(() => {
    setQty(() => {
      return cartItems.reduce((acc, val) => {
        return (acc += val.qty);
      }, 0);
    });
  }, []);

  return (
    <>
      <div className={styles.totalBlock}>
        <div className={styles.totalInformationContainer}>
          <h3>ИТОГО: </h3>
          <p className={styles.totalPrice}>
            {qty}{' '}
            {qty === '1' && qty !== '1'
              ? 'товар'
              : qty >= 5 && qty <= 20
              ? 'товаров'
              : 'товара'}{' '}
            на сумму: <span>{Math.ceil(totalPrice)} UAH</span>
          </p>
          <p className={styles.deliveryPrice}>
            Стоимость доставки: <span>1054 UAH</span>
          </p>
          <p className={styles.priceWithDelivery}>
            К оплате <span>105664 грн</span>
          </p>
        </div>
        <div className={styles.buttonBlock}>
          <button>Заказ подтверждаю</button>
          <Link>
            Подтверждая заказ, я принимаю <br />
            условия пользовательского <br />
            соглашения
          </Link>
        </div>
      </div>

      <div className={styles.clientInfo}>
        <div className={styles.title}>
          <h2>
            Контакты
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
            Выбор способов доставки и оплаты
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
                <label for='contactChoice1'>Самовывоз из нашего склада</label>
              </div>
            </div>

            <div className={styles.pochta}>
              <input
                type='radio'
                id='contactChoice2'
                name='contact'
                value='phone'
              />
              <label for='contactChoice2'>Самовывоз из Новой Почты</label>
            </div>
          </div>
          <input type='radio' id='contactChoice3' name='contact' value='mail' />
          <input
            type='text'
            for='contactChoice3'
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
            Оплата
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
              <label for='contactChoice1'>Наличными</label>
            </div>
            <div>
              <input
                type='radio'
                id='contactChoice1'
                name='contact'
                value='email'
              />
              <label for='contactChoice1'>Visa/MasterCard</label>
            </div>
            <div>
              <input
                type='radio'
                id='contactChoice1'
                name='contact'
                value='email'
              />
              <label for='contactChoice1'>Приват24</label>
            </div>
            <div>
              <input
                type='radio'
                id='contactChoice1'
                name='contact'
                value='email'
              />
              <label for='contactChoice1'>Безналичными</label>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.confirmation}>
        <button>Подтверждаю</button>
        <Link>
          Подтверждая заказ, я принимаю условия пользовательского соглашения
        </Link>
      </div>
    </>
  );
};

export default Ofer;
