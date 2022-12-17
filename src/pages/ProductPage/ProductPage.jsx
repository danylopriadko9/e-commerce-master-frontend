import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanActualPhotos,
  cleanActualProduct,
  fetchActualProduct,
  fetchProductCharacteristics,
  fetchReationProducts,
} from '../../redux/slices/productPageSlice';
import styles from './ProductPage.module.scss';
import { BsFillUmbrellaFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaMoneyBillWave } from 'react-icons/fa';
import ItemsInfo from '../../components/ItemsInfoBlock/ItemsInfo';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import PropertysProducts from '../../components/PropertysProducts/PropertysProducts';
import ShareBlock from '../../components/ShareBlock/ShareBlock';
import PhotoBlock from '../../components/PhotoBlock/PhotoBlock';
import { Link, useLocation } from 'react-router-dom';
import HistoryMap from '../../components/HistoryMap/HistoryMap';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../context/authContext';
import { BiSave } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

const ProductPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = React.useContext(AuthContext);

  React.useEffect(() => {
    dispatch(cleanActualProduct());
    dispatch(cleanActualPhotos());
    dispatch(fetchActualProduct(location.pathname.replace('/tovar_', '')));
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { actualProduct, characteristics } = useSelector(
    (state) => state.actualProduct
  );

  const descriptionBlock = React.useRef(null);
  const product = actualProduct[0];

  React.useEffect(() => {
    if (product && product.product_id) {
      dispatch(fetchProductCharacteristics(product.product_id));
      dispatch(fetchReationProducts(product.product_id));
      if (product.description)
        descriptionBlock.current.innerHTML = product.description;
      else descriptionBlock.current.innerHTML = `<h4>Отсутствует</h4>`;
    }
  }, [product]);

  const { reationProducts, reationStatus } = useSelector(
    (state) => state.actualProduct
  );

  const { t, i18n } = useTranslation();

  return (
    <>
      {actualProduct.length > 0 && (
        <Helmet>
          <meta name='title' content={actualProduct[0].meta_title} />
          <meta charSet='utf-8' />
          <meta name='keywords' content={actualProduct[0].meta_keywords} />
          <meta
            name='description'
            content={actualProduct[0].meta_description}
          />
        </Helmet>
      )}
      <div className={styles.container}>
        <HistoryMap />
        <div className={styles.informationContainer}>
          {product && <PhotoBlock id={product.product_id} />}
          <div className={styles.informationBlock}>
            <div className={styles.information_container}>
              {product && <ItemsInfo product={product} />}
            </div>

            <div className={styles.general_information}>
              <p>
                <TbTruckDelivery />
                <span>{t('product_page.delivery')}</span>
              </p>
              <p>
                <FaMoneyBillWave />
                <span>{t('product_page.pay')}</span>
              </p>
              <p>
                <BsFillUmbrellaFill />
                <span>{t('product_page.pay')}</span>
              </p>
            </div>
            <ShareBlock />
            {currentUser?.role === 'admin' && (
              <Link
                className={styles.update_button}
                to={`/admin/product/${product?.product_id}`}
              >
                <BiSave />
                Update
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={styles.characteristicsAndInformation}>
        <div className={styles.text_container}>
          <div className={styles.characteristics}>
            <h2>
              <div className={styles.indikator}></div>
              {t('product_page.characteristics')}
            </h2>
            {characteristics.length > 0 ? (
              characteristics.map((el) => (
                <div key={el.characteristic}>
                  <p>
                    <span>{el.characteristic}</span> — <span>{el.value}</span>
                  </p>
                </div>
              ))
            ) : (
              <h3>{t('product_page.empty')}</h3>
            )}
          </div>
          <div className={styles.description}>
            <h2>
              <div className={styles.indikator}></div>
              {t('product_page.desc')}
            </h2>
            <span ref={descriptionBlock}></span>
          </div>
        </div>
      </div>

      {product && (
        <PropertysProducts
          id={product.product_id}
          title={t('sliders_titles.buy_also')}
          products={reationProducts}
          status={reationStatus}
        />
      )}
      <InfoBlock />
    </>
  );
};

export default ProductPage;
