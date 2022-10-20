import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Compare from './Compare/Compare';
import Main from './Main/Main';
import PagesComposing from './PagesComposing';
import SearchPage from './SearchPage/SearchPage';

const MainPage = () => {
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
