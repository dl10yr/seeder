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
    <div className={classes.container}>

    </div>


  )
};


export default PostsList;