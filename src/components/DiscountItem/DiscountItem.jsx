import { Link } from 'react-router-dom';
import styles from './DiscountItem.module.scss';
import { FaInfo } from 'react-icons/fa';
import { BsFillCartFill } from 'react-icons/bs';
import { BiCheckDouble } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { addItemToCart, handelShowStatus } from '../../redux/slices/cartSlice';
import { addToWachedProducts } from '../../redux/slices/productsSlice';
import { addCompartisonProduct } from '../../redux/slices/comparisonSlice';
import axios from 'axios';
import React from 'react';

const DiscountItem = (item) => {
  const {
    category_name,
    product_name,
    url,
    base_price,
    discount_percent,
    product_id,
    iso,
  } = item;
  const dispatch = useDispatch();

  const [image, setImage] = React.useState(null);

  const handleAddItemToCart = (item) => {
    dispatch(
      addItemToCart({
        ...item,
        qty: 1,
      })
    );

    dispatch(handelShowStatus());
  };

  const handleWatchedProducts = (item) => {
    dispatch(addToWachedProducts(item));
  };

  const handleAddToComprasion = (item) => {
    dispatch(addCompartisonProduct(item));
  };

  const fetchProductPhoto = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/product/photo/${product_id}`
    );
    setImage(data);
  };

  React.useEffect(() => {
    fetchProductPhoto();
  }, []);

  return (
    <Link
      className={styles.productContainer}
      to={`/tovar_${url}`}
      onClick={() => handleWatchedProducts(item)}
    >
      <div className={styles.overlow}>
        <Link className={styles.overlowButton} to={`/tovar_${url}`}>
          <FaInfo />
        </Link>
        <Link
          className={styles.overlowButton}
          onClick={() => handleAddItemToCart(item)}
        >
          <BsFillCartFill />
        </Link>
        <Link
          className={styles.overlowButton}
          onClick={() => handleAddToComprasion(item)}
          to='/compare'
        >
          <BiCheckDouble />
        </Link>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.imageContainer}>
          {image ? (
            <img src={image} alt='' />
          ) : (
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw0zKknEf_ExsMDMYCkGnkF4bvK-dRrBJb9FdYBJOO0vy5H15IsJSpMBSlVDz7bt6BKCk&usqp=CAU'
              alt=''
            />
          )}
        </div>
        <span className={styles.category}>{category_name}</span>
        <div className={styles.infoContainer}>
          <div className={styles.left}>
            <div className={styles.itemCategory}>
              <span className={styles.model}>{product_name}</span>
            </div>
            <div className={styles.priceBlock}>
              <span className={styles.price}>
                {discount_percent
                  ? (
                      base_price -
                      (base_price * discount_percent.slice(0, -3)) / 100
                    ).toFixed(2)
                  : base_price}
                {` ${iso}`}
              </span>
              <span className={styles.price}>
                {discount_percent && (
                  <>
                    <span className={styles.oldPrice}>
                      {`${base_price} ${iso}`}
                    </span>
                    <span className={styles.discount}>
                      -{discount_percent.slice(0, -3)}%
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>
          <div className={styles.right}></div>
        </div>
      </div>
    </Link>
  );
};

export default DiscountItem;
