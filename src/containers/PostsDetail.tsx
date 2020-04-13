import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useGlobal } from "reactn";
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';

import firebase from 'firebase';
import { firestore } from '../plugins/firebase';
import Comments from '../components/Comments';
import YouTube from 'react-youtube';
import { AutoSizer } from 'react-virtualized';
import PostsDetailCard from '../components/PostsDetailCard';
import Posts from '../components/Posts';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      margin: 10,
    },
    container: {
      width: '100%',
      height: '100%'
    },
    postsdetailcard: {
      display: 'inline-block',
      width: '100%',
      height: "60%",
      [theme.breakpoints.up('md')]: {
        height: "100%",
        width: '60%',
      },
      verticalAlign: 'top',

    },
    posts: {
      height: "40%",
      width: '100%',
      verticalAlign: 'top',
      display: 'block',
      [theme.breakpoints.up('md')]: {
        display: 'inline-block',
        width: '40%',
        height: '100%'
      },
    },
  })
);

interface Props {
  title: string;
  submitPost: (event: React.FormEvent<HTMLFormElement>) => void
  match: { params: { id: string } };
};

const PostsDetail: React.FC<Props> = props => {
  const classes = useStyles();
  type Post = {
    content: string,
    title: string,
    created_at: Date,
    channelId: string,
    channelTitle: string,
    thumbnailUrl: string,
    video_id: string,
  }
  type Comment = {
    content: string,
    created_at: Date,
    user_id: string,
    post_id: string,
    comment_id: string,
  }
  type Posts = {
    posts: Post[],
    tmp_posts: Post[],
    fetch_posts: Post[],
  }

  type Commentslist = {
    comments: Comment[],
    isLoading: boolean,
    startDate: Date,
    endDate: Date
  }

  // const [posts, setPosts] = useState<Post[]>([]);
  const [postslist, setPostslist] = useGlobal("postslist");
  const [currentuser, setCurrentuser] = useGlobal("currentuser");

  return (
    <div className={classes.container}>
      <AutoSizer>
        {({ width, height }) => {
          console.log(height)
          console.log(width)
          return (
            <Scrollbars style={{ width: width, height: height }}>
              <div className={classes.postsdetailcard}>
                <PostsDetailCard post_id={props.match.params.id} />
              </div>
              <div className={classes.posts}>
                <Posts />
              </div>

            </Scrollbars>
          );
        }}
      </AutoSizer>
    </div>
  );
}



export default PostsDetail;