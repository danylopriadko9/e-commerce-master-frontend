import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main/Main';

const MainPage = () => {
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
    </div>
  );
};

export default MainPage;
