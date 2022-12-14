import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DiscountItem from '../DiscountItem/DiscountItem';
import Slider from 'react-slick';
import NewsItem from '../NewsItem/NewsItem';
import ProductItemSkeleton from '../Skeleton/ProductItemSkeleton';
import NewsItemsSkeleton from '../Skeleton/NewsItemSkeleton';
import styles from './Discount.module.scss';
import TitleComponent from '../TitleComponent/TitleComponent';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const Items = ({ items, status, type, title }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <AiOutlineRight />,
    prevArrow: <AiOutlineLeft />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (type === 'news')
    return (
      <div className={styles.container}>
        <TitleComponent title={title} />
        <div className={styles.itemsContainer}>
          <Slider {...settings} style={{ width: '100%', padding: '0' }}>
            {status === 'loading'
              ? [1, 2, 3, 4].map((el) => <NewsItemsSkeleton key={el} />)
              : items.map((el) => <NewsItem {...el} key={el} />)}
          </Slider>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      <TitleComponent title={title} />
      <div className={styles.itemsContainer}>
        <Slider {...settings} style={{ width: '100%', padding: '0' }}>
          {status === 'loading'
            ? [1, 2, 3, 4].map((el) => <ProductItemSkeleton key={el} />)
            : items.map((el) => <DiscountItem {...el} key={el} />)}
        </Slider>
      </div>
    </div>
  );
};

export default Items;
