import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App/App';

ReactDOM.render(
  <Router basename="/Blog-platform">
    <App />
  </Router>,
  document.getElementById('root')
);
