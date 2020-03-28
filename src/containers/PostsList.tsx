import React from 'react';
import { makeStyles, createStyles, Theme, useTheme } from '@material-ui/core/styles';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';

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
  title?: string;
}

const PostsList: React.FC<Props> = props => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <ul className={classes.ul}>
      <li className={classes.li}>
        <div className={classes.libody}>
          <div className={classes.liimg}>
            <img src="#" width="48" height="48" />
          </div>
          <div className={classes.liitem}>
            <div className={classes.licontent}>
              <h3>aaaaaa</h3>
            </div>
            <a href="#">
              <small>aaa</small>
            </a>
            <small>aaa</small>
          </div>
        </div>
      </li >
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

  )
};


export default PostsList;