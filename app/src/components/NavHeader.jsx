import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import config from '../../../config';

const NavHeader = ({isAuthenticated, onLogoutClick, linkTo}) => {

  return (
    <AppBar
    title = {<span>{config.app.name}</span>}
    showMenuIconButton = {false}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        { !isAuthenticated &&
        <MenuItem primaryText="Sign in"
          onTouchTap = { () => linkTo('/signin') }/>
        }
        { !isAuthenticated &&
        <MenuItem primaryText="Sign up"
          onTouchTap = { () => linkTo('/signup') }/>
        }
        { isAuthenticated &&
        <MenuItem primaryText="Change Password"
          onTouchTap = { () => linkTo('/change-password') }/>
        }
        { isAuthenticated &&
        <MenuItem primaryText="Log out"
          onTouchTap = { () => onLogoutClick() }/>
        }
      </IconMenu>
    }>
    </AppBar>
  );
};


export default NavHeader;
