import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import { theme } from './materialui/theme'
import { Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';

// const middlewares = []
// middlewares.push(thunk)
const history = createBrowserHistory();

/*const store = createStore(
   applyMiddleware(thunk) 
) */

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

