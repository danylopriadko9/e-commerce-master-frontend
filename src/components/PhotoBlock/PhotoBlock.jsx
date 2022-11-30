import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanActualPhotos,
  fetchPhotos,
} from '../../redux/slices/productPageSlice';
import styles from './PhotoBlock.module.scss';
import noimg from '../../assets/noimg.jpeg';
import { apiurl } from '../../axios';

const PhotoBlock = ({ id }) => {
  const dispatch = useDispatch();
  const [actualPhoto, setActualPhoto] = React.useState(0);
  const handlePhotoChange = (id) => setActualPhoto(id);

  useEffect(() => {
    dispatch(cleanActualPhotos());
    dispatch(fetchPhotos(id));
  }, []);

  const { photos, status } = useSelector((state) => state.actualProduct);

  return (
    <div className={styles.imageBlock}>
      <div className={styles.image_container}>
        {id && status === 'success' && photos.length > 0 ? (
          <img
            src={`${apiurl}/static/product/${id}/${photos[actualPhoto]}`}
            alt=''
          />
        ) : (
          <img src={noimg} alt='' />
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
            {id && (
              <img src={`${apiurl}/static/product/${id}/${photos[i]}`} alt='' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoBlock;
