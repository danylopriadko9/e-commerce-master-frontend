import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanActualPhotos,
  cleanActualProduct,
  fetchActualProduct,
  fetchPhotos,
  fetchProductCharacteristics,
} from '../../redux/slices/productPageSlice';
import styles from './ProductPage.module.scss';
import { BsFillUmbrellaFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaMoneyBillWave } from 'react-icons/fa';
import { useState } from 'react';
import ItemsInfo from '../../components/ItemsInfoBlock/ItemsInfo';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import PropertysProducts from '../../components/PropertysProducts/PropertysProducts';
import ShareBlock from '../../components/ShareBlock/ShareBlock';

const ProductPage = ({ url }) => {
  const dispatch = useDispatch();
  const [actualPhoto, setActualPhoto] = useState(0);
  const handlePhotoChange = (id) => setActualPhoto(id);

  React.useEffect(() => {
    dispatch(cleanActualProduct());
    dispatch(cleanActualPhotos());
    dispatch(fetchActualProduct(url.replace('tovar_', '')));
    window.scrollTo(0, 0);
  }, [url]);

  const { actualProduct, photos, characteristics } = useSelector(
    (state) => state.actualProduct
  );

  const descriptionBlock = React.useRef(null);
  const product = actualProduct[0];

  React.useEffect(() => {
    if (product) {
      dispatch(cleanActualPhotos());
      dispatch(fetchProductCharacteristics(product.product_id));
      descriptionBlock.current.innerHTML = product.description;
      dispatch(fetchPhotos(product.product_id));
    }
  }, [product]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.informationContainer}>
          <div className={styles.imageBlock}>
            <div className={styles.image_container}>
              {product && photos.length && (
                <img
                  src={`http://localhost:3001/static/product/${product.product_id}/${photos[actualPhoto]}`}
                  alt=''
                />
              )}
            </div>
            <div className={styles.other_photos}>
              {photos.map((img, i) => (
                <div
                  className={
                    actualPhoto === i
                      ? `${styles.mini_image_container} ${styles.active}`
                      : styles.mini_image_container
                  }
                  key={i}
                  onMouseOver={() => handlePhotoChange(i)}
                >
                  <div className={styles.overlay}></div>
                  {product && (
                    <img
                      src={`http://localhost:3001/static/product/${product.product_id}/${photos[i]}`}
                      alt=''
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
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

      {product && <PropertysProducts id={product.product_id} />}
      <InfoBlock />
    </>
  );
};

export default ProductPage;
