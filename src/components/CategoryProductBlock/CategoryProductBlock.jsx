import React from 'react';
import { Link } from 'react-router-dom';
import ItemsInfo from '../ItemsInfoBlock/ItemsInfo';
import styles from './CategoryProductBlock.module.scss';
import { apiurl } from '../../axios';
import axios from 'axios';

const CategoryProductBlock = ({ item }) => {
  const [image, setImage] = React.useState(null);

  const fetchProductPhoto = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/product/photo/${item.product_id}`
    );
    setImage(data);
  };

  React.useEffect(() => {
    if (!image) {
      fetchProductPhoto();
    }
  }, []);
  return (
    <div className={styles.container}>
      <Link className={styles.image_container} to={`/tovar_${item.url}`}>
        {image ? (
          <img src={`/static/${image}`} alt='' />
        ) : (
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw0zKknEf_ExsMDMYCkGnkF4bvK-dRrBJb9FdYBJOO0vy5H15IsJSpMBSlVDz7bt6BKCk&usqp=CAU'
            alt=''
          />
        )}
      </Link>
      <ItemsInfo product={item} />
    </div>
  );
};

export default CategoryProductBlock;
