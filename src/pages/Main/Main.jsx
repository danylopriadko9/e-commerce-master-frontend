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

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanActualProduct());
    dispatch(cleanActualPhotos());
    dispatch(fetchDiscountProducts());
    dispatch(fetchNewProducts());
    dispatch(fetchNews());
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
