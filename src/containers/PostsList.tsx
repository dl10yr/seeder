import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useGlobal } from "reactn";
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';

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
    },
    liinfo: {
      display: 'inline-block',
      verticalAlign: 'Top'
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
  const [currentuser, setCurrentuser] = useGlobal("currentuser");
  const { ref, width, height } = useResizeObserver();

  return (
    <Scrollbars>
      <ul className={classes.ul}>
        {posts.map(post => (
          <Link to={"/posts/" + post.post_id} className={classes.link}>
            <li className={classes.li} ref={ref}>
              <div className={classes.libody}>
                <img src={post.thumbnailUrl} className={classes.liimg} />
                <div className={classes.liinfo} style={{ width: width - 120, }}>
                  <a href="#">
                    <small>{post.title}</small>
                  </a>
                  <small>{post.channelTitle}</small>
                </div>
                <div className={classes.licontent}>
                  <h3>{(post.content.length <= 20) ? post.content : post.content.substr(0, 20) + "..."}</h3>
                </div>
              </div>
            </li >
          </Link>
        ))}
      </ul >
    </Scrollbars>

  );
}



export default PostsList;