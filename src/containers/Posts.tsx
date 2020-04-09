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
    root: {
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

const Posts: React.FC<Props> = props => {
  const classes = useStyles();
  const [postslist, setPostslist] = useGlobal("postslist");
  const [currentuser, setCurrentuser] = useGlobal("currentuser");
  const { state, dispatch } = useContext(store);



  async function getNextPosts() {
    let tmp_posts = new Array();
    let start_date = postslist.startDate;
    let end_date = postslist.endDate;
    const snapShot = await firestore.collection('posts')
      .where('created_at', '<', end_date)
      .orderBy('created_at', 'desc')
      .limit(10)
      .get()
    snapShot.forEach(doc => {
      let post = {
        content: doc.data().content,
        created_at: doc.data().created_at.toDate(),
        channelId: doc.data().channelId,
        thumbnailUrl: doc.data().thumbnailUrl,
        title: doc.data().title,
        post_id: doc.data().post_id,
        channelTitle: doc.data().channelTitle
      }
      tmp_posts.push(post);
    })
    console.log(tmp_posts)
    if (tmp_posts.length != 0) {
      end_date = tmp_posts.slice(-1)[0].created_at;
      setPostslist({ posts: (postslist.posts || []).concat(tmp_posts), endDate: end_date, isLoading: false, startDate: postslist.startDate });
    } else {
      dispatch({ type: 'SET_NOTIFICATION', variant: 'error', message: 'データがありません' });
    }
  }

  return (
    <Scrollbars>
      <ul className={classes.ul}>
        {postslist.posts.map(post => (
          <Link to={"/posts/" + post.post_id} className={classes.link} color="inherit">
            <li className={classes.li}>
              <div className={classes.libody}>
                <img src={post.thumbnailUrl} className={classes.liimg} />
                <div className={classes.liinfo} >
                  <div className={classes.title} >
                    <Typography component="p" className={classes.licontent}>
                      {(post.title.length <= 32) ? post.title : post.title.substr(0, 32) + "..."}
                    </Typography>
                  </div>
                  <Typography component="p" className={classes.channelTitle}>
                    {(post.channelTitle.length <= 16) ? post.channelTitle : post.channelTitle.substr(0, 16) + "..."}
                  </Typography>
                </div>
                <Typography component="p" className={classes.licontent}>
                  {(post.content.length <= 30) ? post.content : post.content.substr(0, 30) + "..."}
                </Typography>
                <small className={classes.lidate}>{moment(post.created_at).fromNow()}</small>
              </div>
            </li >
          </Link>
        ))}
      </ul >
      <div className={classes.button_wrapper}>
        <button onClick={() => { getNextPosts(); }} className={classes.submitbutton}>
          もっと見る
        </button>
      </div>
    </Scrollbars>

  );
}



export default Posts;