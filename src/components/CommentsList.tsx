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
import moment from 'moment';



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

    },
    lidate: {
      textAlign: 'right',
      display: 'block',
    }
  })
);

type Comment = {
  content: string,
  created_at: Date,
  user_id: string,
  post_id: string,
  comment_id: string,
}

type Post = {
  content: string,
  title: string,
  created_at: Date,
  channelId: string,
  post_id: string,
  channelTitle: string,
  thumbnailUrl: string,
  comments: Comment[],
}

type Commentslist = {
  comments: Comment[],
  isLoading: boolean,
  startDate: Date,
  endDate: Date
}

interface Props {
  commentslist: Commentslist,
}

const CommentsList: React.FC<Props> = props => {
  const classes = useStyles();
  const commentslist = props.commentslist;
  const [currentuser, setCurrentuser] = useGlobal("currentuser");



  return (
    <ul className={classes.ul}>
      {commentslist.comments.map(comment => (
        <li className={classes.li}>
          <div className={classes.libody}>
            <Typography component="p" className={classes.licontent}>
              {comment.content}
            </Typography>
            <small className={classes.lidate}>{moment(comment.created_at).fromNow()}</small>
          </div>
        </li >
      ))}
    </ul >
  );
}



export default CommentsList;