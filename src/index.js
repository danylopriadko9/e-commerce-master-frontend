import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthContextProvider>
);
