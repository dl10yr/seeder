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

import { store } from '../store';
import moment from 'moment';
import 'moment/locale/ja';
import New from './New';
import { AutoSizer } from 'react-virtualized';

import { useForm, Controller } from "react-hook-form";
import axios from 'axios'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100%",
      width: '100%'
    },
    new: {
      display: 'inline-block',
      width: '35%',
      height: "100%",
      verticalAlign: 'top',

    },
    posts: {
      height: "100%",
      width: '60%',
      verticalAlign: 'top',
      display: 'inline-block',
    },
    tabs: {
      borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: theme.palette.text.primary
    },
    tab: {
      color: theme.palette.text.primary,
      '&$selected': {
        color: '#2dd57a;',
      },
      '&:hover': {
        color: '#2dd57a;',
        opacity: 1,
      }
    },
    selected: {},
  })
);

interface Props {

};

const Top: React.FC<Props> = props => {
  const classes = useStyles();
  const [postslist, setPostslist] = useGlobal("postslist");
  const [currentuser, setCurrentuser] = useGlobal("currentuser");
  const { state, dispatch } = useContext(store);


  function handleChange() {

  }

  return (
    <div className={classes.container}>
      <AutoSizer>
        {({ width, height }) => {
          console.log(height)
          console.log(width)
          return (
            <Scrollbars style={{ width: width, height: height }}>
              <div className={classes.posts}>
                <Posts />
              </div>
              <div className={classes.new}>
                <New />
              </div>
            </Scrollbars>
          );
        }}
      </AutoSizer>

    </div>


  );
}



export default Top;