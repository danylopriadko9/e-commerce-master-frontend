import './App.scss';
import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Login from './pages/Registration&Login/Login';
import Register from './pages/Registration&Login/Register';
import PagesComposing from './pages/PagesComposing';
import Cart from './components/cart/Cart';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Compare from './pages/Compare/Compare';
import SearchPage from './pages/SearchPage/SearchPage';
import Categories from './pages/Categories/Categories';
import { useDispatch } from 'react-redux';
import { fetchCurrentCurrency } from './redux/slices/cartSlice';
import UpdateProduct from './pages/UpdateProduct/UpdateProduct';

const Layout = () => {
  return (
    <>
      <Cart />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/compare',
        element: <Compare />,
      },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/:url',
        element: <PagesComposing />,
      },
      {
        path: '/:url/search/:searchValue',
        element: <SearchPage />,
      },
      {
        path: '/search/:searchValue',
        element: <SearchPage />,
      },
      {
        path: '/update/product/:id',
        element: <UpdateProduct />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchCurrentCurrency());
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
