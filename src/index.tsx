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
setGlobal({ currentuser: {} });


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
      thumbnailUrl: doc.data().thumbnailUrl,
      title: doc.data().title,
      post_id: doc.data().post_id,
      channelTitle: doc.data().channelTitle
    }
    tmp_posts.push(post);
  })
  setGlobal({ posts: tmp_posts });
};

async function login() {
  await firebase.auth().signInAnonymously().catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  await firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log(user);
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      let tmp_user = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAnonymus: user.isAnonymous,
      }
      setGlobal({ currentuser: tmp_user });
    } else {
      // User is signed out.
      // ...
    }
    // ...
  });

}


getPosts();
login();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

