import Posts from './Posts';

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

import { useForm, Controller } from "react-hook-form";
import axios from 'axios'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      textAlign: 'center'
    },
    li: {
      background: '#eee',
      border: 'solid 0.5px whitesmoke',
      '&:hover': {
        background: "#c2c2c2",
      },
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
    libody: {
      padding: theme.spacing(1),
      minWidth: '288px',
    },
    liitem: {
      display: "inline-block",
      verticalAlign: 'top',
    },
    ul: {
      listStyle: 'none',
      paddingLeft: '0px',
      margin: '10px',
      maxWidth: '500px'
    },
    liimg: {
      display: "inline-block",
      margin: theme.spacing(1),
      width: "80px",
    },
    licontent: {
      width: '100%',
      fontWeight: 'bold',
      margin: `0 ${theme.spacing(1)}`,
      wordWrap: 'break-word',
    },
    liinfo: {
      display: 'inline-block',
      verticalAlign: 'Top',
      width: `calc(100% - 100px)`,
    },
    title: {
      display: "inline-block",

    },
    channelTitle: {
      textAlign: 'right'
    },
    submitbutton: {
      margin: '10px',
      padding: '10px',
      width: '80%',
      height: '8%',
      textAlign: 'center',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: 'large',
      color: 'whitesmoke',
      background: 'black',
      borderRadius: '5px',
      borderWidth: '0',
    },
    button_wrapper: {
      textAlign: 'center',
      marginTop: "20px",
      maxWidth: '500px'
    },
    lidate: {
      textAlign: 'right',
      display: 'block',
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
      <Posts />
      <p>greqgw</p>
    </div>


  );
}



export default Top;