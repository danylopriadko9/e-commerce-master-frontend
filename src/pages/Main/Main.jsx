import ItemsSlider from '../../components/ItemsSlider';
import InfoBlock from '../../components/InfoBlock/InfoBlock';
import Slider from '../../components/Slider/Slider';

const Main = () => {
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
