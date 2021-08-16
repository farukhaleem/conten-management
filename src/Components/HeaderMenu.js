import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { Redirect } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems } from './../listItems';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone';
import ChangePasswordList from './ChangePasswordList';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    borderRight: 0,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  copyRights: {
    position: 'absolute',
    bottom: '-75px',
    left: 0,
    right: 0,
    margin: 'auto',
    padding: '5px 0'
  },
  userName: {
    display: 'block',
    textTransform: 'capitalize'
  },
  sideNav: {
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    background: '#fff'
  },
  wallet: {
    display: 'flex',
    justifyContent: 'space-between',
    width:'100%'}
}));

export default function HeaderMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const [open, setOpen] = useState(Boolean(localStorage.getItem('drawerOpen')));
  const handleDrawerOpen = () => {
    setOpen(true);
    localStorage.setItem('drawerOpen', 1)
  };

  const handleDrawerClose = () => {
    setOpen(false);    
    localStorage.removeItem('drawerOpen')
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!localStorage.getItem('role')) {
    return (<Redirect to='/login' />);
  }

  
  return (
    <div className={classes.sideNav}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
        
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <div>
            <b className="wallet">£ {parseFloat(localStorage.getItem('pm')).toFixed(2)}</b>
            <Button color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <p className={classes.userName}>{localStorage.getItem('userName')}</p>
              <ArrowDropDownTwoToneIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <div onClick={handleClose} className="nav-link">
                <ChangePasswordList />
              </div>  
              <Link to='/logout' className="nav-link">
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
      <Link to='/' className="logoBox"> 
        <img src={localStorage.getItem('domain_url')+'/assets/images/logo.png'} alt="logo" className="logo-img"/>
      </Link>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className="navList"><MainListItems /></List>
      </Drawer>
    </div>
  )
}

