import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanActualPhotos,
  fetchPhotos,
} from '../../redux/slices/productPageSlice';
import styles from './PhotoBlock.module.scss';

const PhotoBlock = ({ id }) => {
  const dispatch = useDispatch();
  const [actualPhoto, setActualPhoto] = React.useState(0);
  const handlePhotoChange = (id) => setActualPhoto(id);

  useEffect(() => {
    dispatch(cleanActualPhotos());
    dispatch(fetchPhotos(id));
  }, []);

  const { photos } = useSelector((state) => state.actualProduct);

  if (!id) return <h1>Loading...</h1>;

  return (
    <div className={styles.imageBlock}>
      <div className={styles.image_container}>
        {id && photos.length && (
          <img
            src={`http://localhost:3001/static/product/${id}/${photos[actualPhoto]}`}
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
            {id && (
              <img
                src={`http://localhost:3001/static/product/${id}/${photos[i]}`}
                alt=''
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoBlock;
