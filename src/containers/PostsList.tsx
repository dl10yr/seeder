import React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Scrollbars } from 'react-custom-scrollbars';

const styles = (theme: Theme): StyleRules => createStyles({
  root: {
    textAlign: 'center'
  },
  paragraph: {
    fontFamily: 'serif',
  },
  libody: {

  },
  liitem: {

  }
});

interface Props extends WithStyles<typeof styles> {
  title?: string;
}

const PostsList: React.FC<Props> = ({ classes, title }: Props) => {

  return (
    <div className={classes.root}>
      <ul>
        <li>
          <div className={classes.libody}>
            <div className={classes.liitem}>
            </div>
          </div>
          1
        </li>
        <li>
          2
        </li>
        <li>
          3
        </li>
      </ul>
    </div>

  )
};


export default withStyles(styles)(PostsList);