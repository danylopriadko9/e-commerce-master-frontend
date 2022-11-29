import React from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Cart from '../components/cart/Cart';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { fetchCurrentCurrency } from '../redux/slices/cartSlice';
import Compare from './Compare/Compare';
import Main from './Main/Main';
import PagesComposing from './PagesComposing';
import Login from './Registration&Login/Login';
import Register from './Registration&Login/Register';
import SearchPage from './SearchPage/SearchPage';

const MainPage = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCurrentCurrency());
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/compare' element={<Compare />} />
        <Route path='/:url' element={<PagesComposing />} />
        <Route path='/:url/search/:searchValue' element={<SearchPage />} />
        <Route path='/search/:searchValue' element={<SearchPage />} />
      </Routes>
    </>
  );
};

export default MainPage;
