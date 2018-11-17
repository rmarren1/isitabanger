import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import SearchContainer from './components/SearchContainer.react';

ReactDOM.render(
  <SearchContainer />,
  document.getElementById('app')
);

module.hot.accept();