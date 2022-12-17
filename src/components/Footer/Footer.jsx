import React from 'react';
import styles from './Footer.module.scss';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.footerContainer}>
      <div className={styles.container}>
        <div className={styles.phoneButton}>
          <BsFillTelephoneFill />
        </div>
        <div className={styles.footerContentContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.left}>
              <div className={styles.logoContainer}>
                <div className={styles.logoRedLine}></div>
                <img src={logo} alt='' />
              </div>
              <div className={styles.footerLinks}>
                <div className={styles.firstLinks}>
                  <Link to='/about-us'>{t('header.about_us')}</Link>
                  <Link to='/contacts'>{t('header.contacts')}</Link>
                  <Link to='/news'>{t('header.news')}</Link>
                  <Link to='/support'>{t('header.support')}</Link>
                  <Link to='/portfolio'>{t('header.portfolio')}</Link>
                  <Link to='/brands'>{t('header.brands')}</Link>
                  <Link to='/cooperation'>{t('header.cooperation')}</Link>
                </div>
                <div className={styles.secoundLinks}>
                  <Link to='/about-us'>{t('header.about_us')}</Link>
                  <Link to='/services'>{t('footer.services')}</Link>
                  <Link to='/news'>{t('header.brands')}</Link>
                  <Link to='/support'>{t('header.cooperation')}</Link>
                </div>
                <div className={styles.thirdLinks}>
                  <Link to='/about-us'>{t('header.payment')}</Link>
                  <Link to='/contacts'>{t('header.delivery')}</Link>
                  <Link to='/news'>{t('header.warranty')}</Link>
                </div>
                <div className={styles.payments}>
                  <Link to='/payment'>
                    <img src='https://visit-alandalus.com/wp-content/uploads/2019/12/visa-mastercard-paypal-1.png' />
                  </Link>
                </div>
              </div>
            </div>
            <p>{t('footer.company')}</p>
            <p>{t('footer.adres')}</p>
          </div>
          <div className={styles.right}>
            <div className={styles.firstNumberContainer}>
              <span className={styles.firstNumber}>496 20 08</span>
            </div>
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
        </div>
        <p className={styles.bottomLine}>
          © Copyright © 1993 - 2018 master-ua.com
        </p>
      </div>
    </div>
  );
};

export default Footer;
