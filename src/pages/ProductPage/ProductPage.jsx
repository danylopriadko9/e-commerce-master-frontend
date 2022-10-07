import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchActualProduct,
  fetchPhotos,
} from '../../redux/slices/productPageSlice';
import styles from './ProductPage.module.scss';
import { BsFillUmbrellaFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaMoneyBillWave } from 'react-icons/fa';
import { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import ItemsInfo from '../../components/ItemsInfoBlock/ItemsInfo';
import InfoBlock from '../../components/InfoBlock/InfoBlock';

const ProductPage = ({ url }) => {
  const dispatch = useDispatch();
  const { actualProduct, photos } = useSelector((state) => state.actualProduct);
  const product = actualProduct[0];

  const [actualPhoto, setActualPhoto] = useState(0);
  const handlePhotoChange = (id) => {
    setActualPhoto(id);
  };

  const descriptionBlock = React.useRef(null);

  React.useEffect(() => {
    if (actualProduct.url !== url) {
      dispatch(fetchActualProduct(url.replace('tovar_', '')));
    }
  }, []);

  React.useEffect(() => {
    if (product) {
      dispatch(fetchPhotos(product.product_id));
    }
  }, [product]);

  if (photos.length > 1) console.log(photos.length);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.informationContainer}>
          <div className={styles.imageBlock}>
            <div className={styles.image_container}>
              {product && (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: 'Wristwatch by Ted Baker London',
                      isFluidWidth: true,
                      src: `http://localhost:3001/static/product/${product.product_id}/${photos[actualPhoto]}`,
                    },
                    largeImage: {
                      src: `http://localhost:3001/static/product/${product.product_id}/${photos[actualPhoto]}`,
                      width: 1000,
                      height: 1000,
                    },
                  }}
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
                  <img
                    src={`http://localhost:3001/static/product/${product.product_id}/${photos[i]}`}
                    alt=''
                  />
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
          </div>
        </div>
      </div>
      <InfoBlock />
    </>
  );
};

export default ProductPage;
