import React, { useState, ReactNode } from 'react';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import SendIcon from '@material-ui/icons/Send';
import ViewListIcon from '@material-ui/icons/ViewList';
import SearchIcon from '@material-ui/icons/Search';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withRouter, Link } from 'react-router-dom';

import ResponsiveDrawerListItem from '../components/ResponsiveDrawerListItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import withStyles, { WithStyles, StyleRules } from '@material-ui/core/styles/withStyles';


const drawerWidth = 240;
const headerNavigationHeight = 56;
const bottomNavigationHeight = 56;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: '100vh',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
    },
    appBar: {
      position: 'absolute',
      marginLeft: drawerWidth,
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
      backgroundColor: theme.palette.secondary.light,
    },
    toolBar: {
      justifyContent: 'space-between',
      minHeight: bottomNavigationHeight,
    },
    navIconHide: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
      color: theme.palette.text.primary
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      height: '100vh',
      [theme.breakpoints.up('md')]: {
        position: 'relative',
      },
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
      paddingTop: `calc(10px + ${headerNavigationHeight}px)`,
      paddingBottom: `calc(10px + ${bottomNavigationHeight}px)`,
      paddingLeft: 0,
      paddingRight: 0,
      [theme.breakpoints.up('md')]: {
        paddingBottom: 10,
      },
    },

    headerLogo: {
      display: 'flex',
      height: 40,
      width: 180,
    },
    iconLogo: {
      display: 'flex',
      height: 40,
      width: 40,
      borderRadius: '50%',
    },

    searchbar: {
      // flexGrow: 1,
    },
    flex: {
      flexGrow: 1,
    },
    a: {
      color: 'white',
    }
  })
);

interface Props {
  title?: string;
  children: ReactNode;
}

const Responsivedrawer: React.FC<Props> = props => {

  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);

  const closeDrawerNav = () => {
    setMobileOpen(false);
  }

  const renderBarswitchCondition = () => {

  }

  const renderDeletewithCondition = () => {

  }

  const renderLogout = () => {

  }

  const renderPrivacy = () => {

  }

  const openDrawerNav = () => {
    setMobileOpen(true);
  }


  const drawer = (
    <div>
      <List>
        <ResponsiveDrawerListItem
          to="/postslist"
          onClick={closeDrawerNav}
          icon={<ViewListIcon />}
          text="テーマ一覧"
        />
      </List>
      {renderBarswitchCondition()}

      <List>
        <ResponsiveDrawerListItem
          to="/info"
          onClick={closeDrawerNav}
          icon={<InfoIcon />}
          text="seederとは"
        />
      </List>
      <List>
        <ResponsiveDrawerListItem
          to="/term"
          onClick={closeDrawerNav}
          icon={<AssignmentIcon />}
          text="利用規約・プライバシーポリシー"
        />
      </List>
      <Divider />
      {renderDeletewithCondition()}
      {renderLogout()}
      {renderPrivacy()}

    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolBar} variant="dense">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => openDrawerNav()}
            className={classes.navIconHide}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/">
            <img src="#" width="150px" alt="title_logo" className={classes.headerLogo} />
          </Link>
          <a className={classes.a} href={process.env.REACT_APP_API127_URL + "/api/v1/auth/twitter?auth_origin_url=" + process.env.REACT_APP_BASE_URL + "/home"} >
            <Icon>add_circle</Icon>
          </a>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={closeDrawerNav}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        {props.children}
      </main>
    </div>
  );
};


export default withStyles(styles)(Responsivedrawer);