import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Compare from './Compare/Compare';
import Main from './Main/Main';
import PagesComposing from './PagesComposing';

const MainPage = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/compare' element={<Compare />} />
        <Route path='/:url' element={<PagesComposing />} />
      </Routes>
    </>
  );
};

export default MainPage;
