import ItemsSlider from '../../components/ItemsSlider';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import Slider from '../../components/Slider/Slider';
import { useEffect } from 'react';
import {
  cleanActualPhotos,
  cleanActualProduct,
} from '../../redux/slices/productPageSlice';
import { useDispatch } from 'react-redux';
import PropertysProducts from '../../components/PropertysProducts/PropertysProducts';

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cleanActualProduct());
    dispatch(cleanActualPhotos());
  }, []);
  return (
    <>
      <div className='mainContentContainer'>
        <Slider />
        <ItemsSlider title={'Акции'} />
        <ItemsSlider title={'Новинки'} />
        <PropertysProducts title={'Просмотренные'} />
        <ItemsSlider title={'Новости'} />
      </div>
      <InfoBlock />
    </>
  );
};

export default Main;
