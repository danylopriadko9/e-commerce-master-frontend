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
import {
  fetchNewProducts,
  fetchDiscountProducts,
} from '../../redux/slices/productsSlice';
import { fetchNews } from '../../redux/slices/newsSlice';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanActualProduct());
    dispatch(cleanActualPhotos());
    if (discountProductsStatus !== 'success') dispatch(fetchDiscountProducts());
    if (newProductsStatus !== 'success') dispatch(fetchNewProducts());
    if (newProductsStatus !== 'success') dispatch(fetchNews());
  }, []);

  const {
    newProducts,
    newProductsStatus,
    discountProducts,
    discountProductsStatus,
  } = useSelector((state) => state.products);

  const { news, newsStatus } = useSelector((state) => state.news);
  const { watchedProducts } = useSelector((state) => state.products);

  const { t, i18n } = useTranslation();

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
          title={t('sliders_titles.discounts')}
        />
        <Items
          items={newProducts}
          status={newProductsStatus}
          type={'products'}
          title={t('sliders_titles.new_products')}
        />
        <PropertysProducts
          products={watchedProducts}
          title={t('sliders_titles.watched')}
        />
        <Items
          items={news}
          status={newsStatus}
          type={'news'}
          title={t('sliders_titles.news')}
        />
      </div>
      <InfoBlock />
    </>
  );
};

export default Main;
