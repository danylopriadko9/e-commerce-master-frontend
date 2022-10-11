import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanActualPhotos,
  cleanActualProduct,
  fetchActualProduct,
  fetchProductCharacteristics,
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

const ProductPage = ({ url }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(cleanActualProduct());
    dispatch(cleanActualPhotos());
    dispatch(fetchActualProduct(url.replace('tovar_', '')));
    window.scrollTo(0, 0);
  }, [url]);

  const { actualProduct, characteristics } = useSelector(
    (state) => state.actualProduct
  );

  const descriptionBlock = React.useRef(null);
  const product = actualProduct[0];

  React.useEffect(() => {
    if (product) {
      dispatch(fetchProductCharacteristics(product.product_id));
      descriptionBlock.current.innerHTML = product.description;
    }
  }, [product]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.informationContainer}>
          {product && <PhotoBlock id={product.product_id} />}
          <div className={styles.informationBlock}>
            <div className={styles.information_container}>
              {product && <ItemsInfo product={product} />}
            </div>

            <div className={styles.general_information}>
              <p>
                <TbTruckDelivery />
                <span>Доставка по всей Украине</span>
              </p>
              <p>
                <FaMoneyBillWave />
                <span>Оплата любым способом</span>
              </p>
              <p>
                <BsFillUmbrellaFill />
                <span>100% гарантия и сервис</span>
              </p>
            </div>
            <ShareBlock />
          </div>
        </div>
      </div>

      <div className={styles.characteristicsAndInformation}>
        <div className={styles.text_container}>
          <div className={styles.characteristics}>
            <h2>
              <div className={styles.indikator}></div>
              Технические <br />
              характаристики
            </h2>
            {characteristics &&
              characteristics.map((el) => (
                <div key={el.characteristic}>
                  <p>
                    <span>{el.characteristic}</span> — <span>{el.value}</span>
                  </p>
                </div>
              ))}
          </div>
          <div className={styles.description}>
            <h2>
              <div className={styles.indikator}></div>
              Описание
            </h2>
            <span ref={descriptionBlock}></span>
          </div>
        </div>
      </div>

      {product && (
        <PropertysProducts
          id={product.product_id}
          title={'С этим товаром часто покупают'}
        />
      )}
      <InfoBlock />
    </>
  );
};

export default ProductPage;
