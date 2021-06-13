import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { signOut } from '../service/eventEmitters';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    backIcon: {
      alignItems: 'left',
    },
    profileIcon: {
      alignSelf: 'right',
    },
  })
);

export default function MenuAppBar(): React.ReactElement {
  const classes = useStyles();
  const { socket, user } = useSelector((state: RootState) => state);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const url = window.location.href;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    sessionStorage.removeItem('userId');
    // should dispatch disconnect action?
    signOut(socket, user);
    history.push('/sign-in');
  };

  return (
    <div>
      <AppBar position='static'>
        <Toolbar className={classes.root}>
          {url.includes('/my-lists') ? (
            <Typography>My lists</Typography>
          ) : (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={() => history.push('/my-lists')}
            >
              <ArrowBackIcon />
              <Typography>My lists</Typography>
            </IconButton>
          )}
          <div>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem>{user.userName}</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
