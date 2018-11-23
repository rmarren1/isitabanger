import './static/main.css';
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.react';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();