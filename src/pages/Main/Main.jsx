import ItemsSlider from '../../components/ItemsSlider';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import Slider from '../../components/Slider/Slider';
import { useEffect } from 'react';
import {
  cleanActualPhotos,
  cleanActualProduct,
} from '../../redux/slices/productPageSlice';
import { useDispatch } from 'react-redux';

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
        <ItemsSlider title={'Новости'} />
      </div>
      <InfoBlock />
    </>
  );
};

export default Main;
