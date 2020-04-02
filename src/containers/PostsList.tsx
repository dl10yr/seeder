import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useGlobal } from "reactn";
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';
import ContentsCard from '../components/ContentsCard';

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
    },
    libody: {
      padding: '5px',
      minWidth: '288px',
    },
    liitem: {
      display: "inline-block",
      verticalAlign: 'top',
      maxWidth: '75%',
    },
    ul: {
      listStyle: 'none',
      paddingLeft: '0px',
      margin: '10px',
    },
    liimg: {
      borderRadius: '50%',
      width: "60px",
      display: "inline-block"
    },
    licontent: {
      width: '100%',
    }
  })
);

interface Props {
  title: string;
  submitPost: (event: React.FormEvent<HTMLFormElement>) => void
};

const PostsList: React.FC<Props> = props => {
  const classes = useStyles();
  const [posts, setPosts] = useGlobal("posts");

  return (
    <Scrollbars>
      <ul className={classes.ul}>
        {posts.map(post => (
          <Link to={"/posts/" + post.post_id} className={classes.link}>
            <li className={classes.li}>
              <div className={classes.libody}>
                <div className={classes.liimg}>
                  <img src={post.thumnailUrl} width="48" height="48" />
                </div>
                <div className={classes.liitem}>
                  <div className={classes.licontent}>
                    <h3>{post.content}</h3>
                  </div>
                  <a href="#">
                    <small>{post.title}</small>
                  </a>
                  <small>{post.channelTitle}</small>
                </div>
              </div>
            </li >
          </Link>
        ))}

        <li className={classes.li}>
          <div className={classes.libody}>
            <div className={classes.liimg}>
              <img src="#" width="48" height="48" />
            </div>
            <div className={classes.liitem}>
              <div className={classes.licontent}>
                <h3>bfffbbbbb</h3>
              </div>
              <a href="#">
                <small>bbb</small>
              </a>
              <small>bbb</small>
            </div>
          </div>
        </li >
      </ul >
    </Scrollbars>

  );
}



export default PostsList;