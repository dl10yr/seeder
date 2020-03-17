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
  }
});

interface Props extends WithStyles<typeof styles> {
  title?: string;
}

const Top: React.FC<Props> = ({ classes, title }: Props) => {
  return (
    <div className={classes.root}>
    </div>

  )
};


export default withStyles(styles)(Top);