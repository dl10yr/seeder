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

type Post = {
  content: string,
  title: string,
  created_at: Date,
  channelId: string,
  post_id: string,
  channelTitle: string,
  thumbnailUrl: string,
}

interface Props {
  height: number,
  isLoading: boolean,
  hasMore: boolean,
  next: any
};

const PostsList: React.FC<Props> = props => {
  const { height, isLoading, hasMore, next } = props;
  const classes = useStyles();
  const [postslist, setPostslist] = useGlobal("postslist");
  const [currentuser, setCurrentuser] = useGlobal("currentuser");

  const renderList = () => {

    return (
      <ul className={classes.ul}>
        {postslist.posts.map(post => (
          <Link to={"/posts/" + post.post_id} className={classes.link} color="inherit">
            <li className={classes.li}>
              <div className={classes.libody}>
                <img src={post.thumbnailUrl} className={classes.liimg} />
                <div className={classes.liinfo} >
                  <div className={classes.title} >
                    <small>{(post.title.length <= 32) ? post.title : post.title.substr(0, 32) + "..."}</small>
                  </div>
                  <div className={classes.channelTitle}>
                    <small>{(post.channelTitle.length <= 16) ? post.channelTitle : post.channelTitle.substr(0, 16) + "..."}</small>
                  </div>
                </div>
                <Typography component="p" className={classes.licontent}>
                  {(post.content.length <= 20) ? post.content : post.content.substr(0, 20) + "..."}
                </Typography>
              </div>
            </li >
          </Link>
        ))}
      </ul >
    )
  }

  return (

    <InfiniteScroll
      height={height}
      dataLength={10}
      next={next}
      hasMore={hasMore}
      loader={<p>LOADING...</p>}
      scrollThreshold={1}
    >
      {renderList()}
    </InfiniteScroll>

  );
}



export default PostsList;