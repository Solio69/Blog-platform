import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import App from './components/App/App';

ReactDOM.render(
  <Router basename="/Blog-platform">
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
