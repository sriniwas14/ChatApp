import React from 'react'
import { Menu, MenuItem, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import withAuth from '../../withAuth';

function TopAppBar(props) {
    let classes = props.classes
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (e) => {
      console.log("A")
      switch(e.target.innerText){
        case "Profile": 
          break;
        case "Log Out":
          props.setLoginDetails({ loggedIn: false, userDetails: {} })
          localStorage.removeItem("token")
          break;
      }
      setAnchorEl(null);
    };

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.grow}>
            <Typography variant="h6" noWrap>
              ChatApp
            </Typography>
          </div>
          { /** User Menu  **/ }
          <Button className={classes.appBarButton} color="primary" onClick={handleMenu}>
            <AccountCircle />
            <span style={{ marginLeft: 10 }}>{props.userDetails.first_name}</span>
          </Button>
          <Menu
                id="menu-appbar"
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
    )
}

export default withAuth(TopAppBar);