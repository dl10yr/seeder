import Posts from '../components/Posts';

import React, { useEffect, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { useGlobal } from "reactn";
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';
import useResizeObserver from "use-resize-observer";
import firebase from 'firebase';
import { firestore } from '../plugins/firebase';
import { Link, withRouter } from 'react-router-dom';
import PostsList from '../components/PostsList';
import { store } from '../store';
import moment from 'moment';
import 'moment/locale/ja';
import New from './New';

import { useForm, Controller } from "react-hook-form";
import axios from 'axios'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
    },
    new: {
      display: 'inline-block',
      width: '30%',
      verticalAlign: 'top',

    },
    posts: {
      height: '600px',
      width: '50%',
      verticalAlign: 'top',

    }
  })
);

interface Props {

};

const Top: React.FC<Props> = props => {
  const classes = useStyles();
  const [postslist, setPostslist] = useGlobal("postslist");
  const [currentuser, setCurrentuser] = useGlobal("currentuser");
  const { state, dispatch } = useContext(store);

  return (
    <div className={classes.container}>
      <Scrollbars style={{ height: 500 }}>
        <div className={classes.posts}>
          <Posts />
        </div>
        <div className={classes.new}>
          <New />
        </div>
      </Scrollbars>


    </div>


  );
}



export default Top;