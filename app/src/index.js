import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.react';

ReactDOM.render(
  <Search />,
  document.getElementById('app')
);

module.hot.accept();