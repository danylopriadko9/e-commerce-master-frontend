import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthContextProvider } from './context/authContext';
import Loading from './components/Loading';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </Provider>
  </AuthContextProvider>
);
