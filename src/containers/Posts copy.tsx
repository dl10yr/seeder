import React, { useEffect, useState } from 'react';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center'
    },
    paragraph: {
      fontFamily: 'serif',
    },
    li: {
      background: '#eee',
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
      width: `calc(100% - 120px)`,
    },
    title: {

    },
    channelTitle: {

    }
  })
);

interface Props {
  title: string;
  submitPost: (event: React.FormEvent<HTMLFormElement>) => void
};

const Posts: React.FC<Props> = props => {
  const classes = useStyles();
  const [postslist, setPostslist] = useGlobal("postslist");
  const [currentuser, setCurrentuser] = useGlobal("currentuser");

  async function getPosts() {
    let tmp_posts = new Array();
    let start_date = new Date();
    let end_date = new Date();
    const snapShot = await firestore.collection('posts')
      .orderBy('created_at', 'desc')
      .limit(10)
      .get()
    snapShot.forEach(doc => {
      let post = {
        content: doc.data().content,
        created_at: doc.data().created_at.doDate(),
        channelId: doc.data().channelId,
        thumbnailUrl: doc.data().thumbnailUrl,
        title: doc.data().title,
        post_id: doc.data().post_id,
        channelTitle: doc.data().channelTitle
      }
      tmp_posts.push(post);
    })
    start_date = tmp_posts[0].created_at;
    end_date = tmp_posts[9].created_at;
    setPostslist({ posts: tmp_posts, startDate: start_date, endDate: end_date, isLoading: false });
  };

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
    end_date = tmp_posts[9].created_at;
    setPostslist({ posts: (postslist.posts || []).concat(tmp_posts), endDate: end_date, isLoading: false, startDate: postslist.startDate });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Scrollbars>

      <PostsList
        height={400}
        next={() => { getNextPosts(); }}
        hasMore={true}
        isLoading={postslist.isLoading}
      />
    </Scrollbars>

  );
}



export default Posts;