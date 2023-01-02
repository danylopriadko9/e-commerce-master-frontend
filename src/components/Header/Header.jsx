import styles from './Header.module.scss';
import logo from '../../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookSquare } from 'react-icons/fa';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { RiAccountCircleLine } from 'react-icons/ri';
import DropDown from '../DropDown/DropDown';
import NumberPopup from '../NumberPopup/NumberPopup';
import { useDispatch, useSelector } from 'react-redux';
import { handelShowStatus } from '../../redux/slices/cartSlice';
import React from 'react';
import { setSearchValue } from '../../redux/slices/searchSlice';
import { AuthContext } from '../../context/authContext';
import { useTranslation } from 'react-i18next';
import { HamburgerMenu } from '../hamburgerMenu';
import { FiShoppingCart } from 'react-icons/fi';

const Header = () => {
  const [cartQty, setCartQty] = React.useState(0);
  const [inputStatus, setInputStatus] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(0);

  React.useEffect(() => {
    setWindowWidth(window.outerWidth);
  }, [window.outerWidth]);

  const dispatch = useDispatch();
  const searchInput = React.useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser, logout } = React.useContext(AuthContext);

  const { totalPrice, cartItems } = useSelector((state) => state.cart);

  const handleCartOpen = () => {
    dispatch(handelShowStatus());
  };

  React.useEffect(() => {
    console.log(inputStatus);
  }, [inputStatus]);

  const handleSearch = (e) => {
    if (!e.current.value.trim().length) {
      const groupLink = location.pathname.split('/')[1];
      navigate(`${groupLink}`.replace('search', ''));
      return;
    }
    if (e.current.value.length) {
      if (location.pathname.includes('/group')) {
        const groupLink = location.pathname.split('/')[1];
        navigate(`${groupLink}/search/${e.current.value}`);
      } else {
        navigate(`/search/${e.current.value}`);
      }
    }
    dispatch(setSearchValue(e.current.value));
    e.current.value = '';
  };

  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    const qty = cartItems.reduce((acc, el) => acc + el.qty, 0);
    setCartQty(qty);
  }, [cartItems]);

  return (
    <div className={styles.header}>
      <Link className={styles.logoContainer} to='/'>
        <img className={styles.logoImage} src={logo} alt='logo' />
      </Link>

      {!inputStatus && (
        <Link className={styles.logoMobileContainer} to='/'>
          <img className={styles.logoImage} src={logo} alt='logo' />
        </Link>
      )}

      <div className={styles.center}>
        <div className={styles.navbar}>
          <Link to='/about-us'>{t('header.about_us')}</Link>
          <Link to='/contacts'>{t('header.contacts')}</Link>
          <Link to='/news'>{t('header.news')}</Link>
          <Link to='/support'>{t('header.support')}</Link>
          <Link to='/portfolio'>{t('header.portfolio')}</Link>
          <Link to='/brands'>{t('header.brands')}</Link>
          <Link to='/cooperation'>{t('header.cooperation')}</Link>
        </div>
        <div className={styles.inputConteiner}>
          <div>
            <input
              ref={searchInput}
              type='text'
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch(searchInput);
              }}
            />
            <button onClick={() => handleSearch(searchInput)}>
              {t('header.search')}
            </button>
          </div>
        </div>
        {inputStatus && (
          <div className={styles.inputConteinerMobile}>
            <div>
              <input
                ref={searchInput}
                type='text'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch(searchInput);
                }}
              />
              <button onClick={() => handleSearch(searchInput)}>
                {t('header.search')}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.nav}>
          <div className={styles.links}>
            <Link to='/payment'>{t('header.payment')}</Link>
            <Link to='/delivery'>{t('header.delivery')}</Link>
            <Link to='/warranty'>{t('header.warranty')}</Link>
          </div>
          <div className={styles.phoneNumber}>
            <NumberPopup />
            <Link to='https://www.facebook.com/'>
              <FaFacebookSquare
                style={{ color: '#0058CF', fontSize: '20px' }}
              />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.navMobile}>
        <div
          onClick={() => setInputStatus((prev) => !prev)}
          className={`${styles.cart} ${styles.nav_search}`}
        >
          <AiOutlineSearch />
        </div>
        <div onClick={handleCartOpen} className={styles.cart}>
          <div className={styles.items_qty}>{cartQty}</div>
          <FiShoppingCart />
        </div>
        <HamburgerMenu />
      </div>
      <div className={styles.footer}>
        <div className={styles.catalogMenu}>
          <DropDown />
        </div>
        <div className={styles.cartAndLogin}>
          <div
            className={`${styles.card} ${styles.cartAndLoginItems}`}
            onClick={handleCartOpen}
          >
            <AiOutlineShoppingCart className={styles.icon} />
            <div className={styles.barrier}></div>
            <span>{totalPrice.toFixed()} UAH</span>
          </div>
          <div className={`${styles.login} ${styles.cartAndLoginItems}`}>
            <RiAccountCircleLine className={styles.icon} />
            {currentUser ? (
              <>
                <Link onClick={logout}>
                  <span>Logout</span>
                </Link>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <span>{t('header.login')}</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
