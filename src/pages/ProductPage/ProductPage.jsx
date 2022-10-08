import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchActualProduct,
  fetchPhotos,
  fetchProductCharacteristics,
  fetchReationProducts,
} from '../../redux/slices/productPageSlice';
import styles from './ProductPage.module.scss';
import { BsFillUmbrellaFill } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaMoneyBillWave } from 'react-icons/fa';
import { useState } from 'react';
import ItemsInfo from '../../components/ItemsInfoBlock/ItemsInfo';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import Items from '../../components/ItemsSlider/Items';
import { useLocation } from 'react-router-dom';
import DiscountItem from '../../components/DiscountItem/DiscountItem';

const ProductPage = ({ url }) => {
  const location = useLocation();

  const {
    actualProduct,
    photos,
    characteristics,
    reationProducts,
    reationStatus,
  } = useSelector((state) => state.actualProduct);
  const [actualPhoto, setActualPhoto] = useState(0);

  const dispatch = useDispatch();
  const descriptionBlock = React.useRef(null);
  const product = actualProduct[0];

  const handlePhotoChange = (id) => {
    setActualPhoto(id);
  };

  React.useEffect(() => {
    if (actualProduct.url !== url) {
      dispatch(fetchActualProduct(url.replace('tovar_', '')));
    }
  }, [location.pathname]);

  React.useEffect(() => {
    if (product) {
      dispatch(fetchPhotos(product.product_id));
      dispatch(fetchProductCharacteristics(product.product_id));
      dispatch(fetchReationProducts(product.product_id));
      descriptionBlock.current.innerHTML = product.description;
    }
    window.scrollTo(0, 0);
  }, [product]);

  console.log(characteristics);
  console.log(reationProducts);

  const shareUrl = window.location.href;
  console.log(product);
  console.log(reationProducts.length);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.informationContainer}>
          <div className={styles.imageBlock}>
            <div className={styles.image_container}>
              {product && (
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
            <div className={styles.share_container}>
              <div className={styles.title}>
                <p>Делитесь с друзьями:</p>
              </div>
              <div className={styles.icons_container}>
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon size={30} />
                </FacebookShareButton>

                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon size={30} />
                </TwitterShareButton>

                <ViberShareButton url={shareUrl}>
                  <ViberIcon size={30} />
                </ViberShareButton>

                <TelegramShareButton url={shareUrl}>
                  <TelegramIcon size={30} />
                </TelegramShareButton>

                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon size={30} />
                </WhatsappShareButton>
              </div>
            </div>
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
      {reationProducts.length > 0 &&
        (reationProducts.length > 4 ? (
          <div className={styles.slider_container}>
            <h2>
              <div className={styles.indikator}></div>С этим товаром часто
              покупают
            </h2>
            <Items items={reationProducts} status={reationStatus} />
          </div>
        ) : (
          <div className={styles.property_item_container}>
            <h2>
              <div className={styles.indikator}></div>С этим товаром часто
              покупают
            </h2>
            <div className={styles.list_of_items}>
              {reationProducts.map((el) => (
                <div className={styles.item_container}>
                  <DiscountItem {...el} />
                </div>
              ))}
            </div>
          </div>
        ))}

      <InfoBlock />
    </>
  );
};

export default ProductPage;
