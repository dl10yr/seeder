import React from 'react';
import logo from './logo.svg';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';


import Info from './containers/Info';
import Top from './containers/Top';

import Login from './containers/Login';
import PostsList from './containers/PostsList';
import New from './containers/New';
import ResponsiveDrawer from './containers/ResponsiveDrawer';



function App() {
  return (
    <Router>


      <div className="App">
        <ResponsiveDrawer>
          <Switch>
            <Route exact path="/" component={Top} />
            <Route path="/login" component={Login} />
            <Route path="/info" component={Info} />
            <Route path="/postslist" component={PostsList} />
            <Route exact path="/new" component={New} />

          </Switch>
        </ResponsiveDrawer>

      </div >
    </Router >
  );
}

export default App;
