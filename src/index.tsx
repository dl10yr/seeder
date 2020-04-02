import React, { setGlobal } from "reactn";
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
import firebase from 'firebase';
import { firestore } from './plugins/firebase';

// const middlewares = []
// middlewares.push(thunk)
const history = createBrowserHistory();

/*const store = createStore(
   applyMiddleware(thunk) 
) */
setGlobal({ posts: [] });

async function getPosts() {
  let tmp_posts = new Array();
  const snapShot = await firestore.collection('posts')
    .orderBy('created_at', 'desc')
    .limit(10)
    .get()
  snapShot.forEach(doc => {
    let post = {
      content: doc.data().content,
      created_at: doc.data().created_at,
      channelId: doc.data().channelId,
      thumnailUrl: doc.data().thumnailUrl,
      title: doc.data().title,
      post_id: doc.data().post_id,
      channelTitle: doc.data().channelTitle
    }
    tmp_posts.push(post);
  })
  setGlobal({ posts: tmp_posts });
};

getPosts();


ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

