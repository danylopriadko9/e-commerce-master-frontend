import InfoBlock from '../../components/InfoBlock/InfoBlock';
import Slider from '../../components/Slider/Slider';
import { useEffect } from 'react';
import {
  cleanActualPhotos,
  cleanActualProduct,
} from '../../redux/slices/productPageSlice';
import { useDispatch, useSelector } from 'react-redux';
import PropertysProducts from '../../components/PropertysProducts/PropertysProducts';
import Items from '../../components/ItemsSlider/Items';
import { fetchNewProducts } from '../../redux/slices/newProductsSlice';
import { fetchDiscountProducts } from '../../redux/slices/discountProductsSlice';
import { fetchNews } from '../../redux/slices/newsSlice';
import { Helmet } from 'react-helmet';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanActualProduct());
    dispatch(cleanActualPhotos());
    if (discountProductsStatus !== 'success') dispatch(fetchDiscountProducts());
    if (newProductsStatus !== 'success') dispatch(fetchNewProducts());
    if (newProductsStatus !== 'success') dispatch(fetchNews());
  }, []);

  const { newProducts, newProductsStatus } = useSelector(
    (state) => state.newProducts
  );
  const { discountProducts, discountProductsStatus } = useSelector(
    (state) => state.discount
  );
  const { news, newsStatus } = useSelector((state) => state.news);

  const { watchedProducts } = useSelector((state) => state.watchedProducts);
  return (
    <>
      <Helmet>
        <meta
          name='title'
          content='Оборудование для ресторанов, кафе, столовой с 1993 года'
        />
        <meta charSet='utf-8' />
        <meta
          name='keywords'
          content='оборудование для общественного питания, оборудование общепита, профессиональное кухонное оборудование, оборудование для кафе и ресторанов'
        />
        <meta
          name='description'
          content='Комплексное оснащение профессиональным оборудованием для кухни ресторана, кафе, столовой, кулинарного цеха - прямые поставки, большой опыт в реализации проектов, консультации профессионалов.'
        ></meta>
        <title>Оборудование для ресторанов, кафе, столовой с 1993 года</title>
      </Helmet>
      <div className='mainContentContainer'>
        <Slider />
        <Items
          items={discountProducts}
          status={discountProductsStatus}
          type={'products'}
          title={'Акции'}
        />
        <Items
          items={newProducts}
          status={newProductsStatus}
          type={'products'}
          title={'Новинки'}
        />
        <PropertysProducts products={watchedProducts} title={'Просмотренные'} />
        <Items
          items={news}
          status={newsStatus}
          type={'news'}
          title={'Новости'}
        />
      </div>
      <InfoBlock />
    </>
  );
};

export default Main;
