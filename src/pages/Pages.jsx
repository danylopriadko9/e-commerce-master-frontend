import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main/Main';
import PagesComposing from './PagesComposing';

const MainPage = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/:url' element={<PagesComposing />} />
      </Routes>
    </>
  );
};

export default MainPage;
