import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { router } from './routes';

import 'react-vant/lib/index.css';
import './index.css';

import './config/react-vant.config';

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById('root')
);
