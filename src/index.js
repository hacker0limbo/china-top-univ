import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './pages/App';
import { Provider } from 'react-redux';
import { store } from './store';

import 'react-vant/lib/index.css';
import './index.css';

import './config/react-vant.config';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
