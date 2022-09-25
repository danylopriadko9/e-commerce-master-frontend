import styles from './Header.module.scss';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaFacebookSquare } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { RiAccountCircleLine } from 'react-icons/ri';
import DropDown from '../DropDown/DropDown';
import NumberPopup from '../NumberPopup/NumberPopup';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logoContainer}>
        <Link to='/'>
          <img className={styles.logoImage} src={logo} alt='logo' />
        </Link>
      </div>
      <div className={styles.center}>
        <div className={styles.navbar}>
          <Link to='/about-us'>О нас</Link>
          <Link to='/contacts'>Контакты</Link>
          <Link to='/news'>Новости</Link>
          <Link to='/support'>Поддержка</Link>
          <Link to='/portfolio'>Портфолио</Link>
          <Link to='/brands'>Бренды</Link>
          <Link to='/cooperation'>Сотрудничество</Link>
        </div>
        <div className={styles.inputConteiner}>
          <input type='text' />
          <button>Найти</button>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.links}>
          <Link to='/payment'>Оплата</Link>
          <Link to='/delivery'>Доставка</Link>
          <Link to='/warranty'>Гарантия</Link>
        </div>
        <div className={styles.phoneNumber}>
          <NumberPopup />
          <Link to='https://www.facebook.com/'>
            <FaFacebookSquare style={{ color: '#0058CF', fontSize: '20px' }} />
          </Link>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.catalogMenu}>
          <DropDown />
        </div>
        <div className={styles.cartAndLogin}>
          <div className={`${styles.card} ${styles.cartAndLoginItems}`}>
            <AiOutlineShoppingCart className={styles.icon} />
            <div className={styles.barrier}></div>
            <span>33 150 грн</span>
          </div>
          <div className={`${styles.login} ${styles.cartAndLoginItems}`}>
            <RiAccountCircleLine className={styles.icon} />
            <span>Вход</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
